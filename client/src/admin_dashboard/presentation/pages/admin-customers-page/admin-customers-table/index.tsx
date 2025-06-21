import type { IUserResponse } from "../../../../../domain/usecases/users/IUserResponse";
import AdminBaseTable, {
  type IAdminBaseTableColumn,
} from "../../../components/base/admin-base-table";

interface IAdminCustomersTableProps {
  data: IUserResponse[];
}

const AdminCustomersTable = ({
  data,
}: IAdminCustomersTableProps): React.JSX.Element => {
  const columns: IAdminBaseTableColumn<IUserResponse>[] = [
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
  ];

  return (
    <>
      <AdminBaseTable columns={columns} data={data} />
    </>
  );
};

export default AdminCustomersTable;
