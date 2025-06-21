import { useState, type Dispatch, type SetStateAction } from "react";
import type { IAdminBaseTableColumn } from "../../../../../../domain/usecases/generic/IAdminBaseTableColumn";
import type { INavCategory } from "../../../../../../domain/usecases/nav-categories/INavCategory";
import { deleteCategory } from "../../../../../../infra/http/api-calls/nav-categories/deleteCategory";
import AdminBaseTable from "../../../../components/base/admin-base-table";
import DeleteConfirmationDialog from "../../../../components/base/delete-confirmation-dialog";

interface CategoriesTableProps {
  data: INavCategory[];
  setCategoriesData: Dispatch<SetStateAction<INavCategory[]>>;
}

const CategoriesTable = ({
  data,
  setCategoriesData,
}: CategoriesTableProps): React.JSX.Element => {
  const [deletionState, setDeletionState] = useState<string | null>(null);

  async function handleDelete(id: string) {
    try {
      await deleteCategory(id);
      setCategoriesData((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );
      setDeletionState(null);
    } catch (error) {
      console.log(error);
    }
  }

  const columns: IAdminBaseTableColumn<INavCategory>[] = [
    { header: "Label", accessor: "label" },
    { header: "Path", accessor: "path" },
    { header: "Operation", render: "delete" },
  ];

  return (
    <>
      <AdminBaseTable
        columns={columns}
        data={data}
        onDelete={setDeletionState}
      />
      {deletionState && (
        <DeleteConfirmationDialog
          deletionState={deletionState}
          setDeletionState={setDeletionState}
          onConfirm={() => handleDelete(deletionState)}
        />
      )}
    </>
  );
};

export default CategoriesTable;
