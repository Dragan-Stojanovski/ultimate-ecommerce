import type { Dispatch, SetStateAction } from "react";
import type { IProductResponse } from "../../../../../domain/usecases/product/IProductResponse";
import { deleteProduct } from "../../../../../infra/http/api-calls/products/deleteProduct";
import type { IAdminBaseTableColumn } from "../../../components/base/admin-base-table";
import AdminBaseTable from "../../../components/base/admin-base-table";
import { Link } from "react-router-dom";

interface IProductsTableProps {
  data: IProductResponse[];
  setProductsData: Dispatch<SetStateAction<IProductResponse[]>>;
}

const ProductsTable = ({
  data,
  setProductsData,
}: IProductsTableProps): React.JSX.Element => {
  async function handleDelete(id: string) {
    try {
      await deleteProduct(id);
      setProductsData((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  }

  const columns: IAdminBaseTableColumn<IProductResponse>[] = [
    {
      header: "Title",
      render: (_, row) => {
        return <Link to={`${row._id}`}>{row.title}</Link>;
      },
    },
    { header: "Description", accessor: "description" },
    { header: "Price", accessor: "price" },
    { header: "Category", accessor: "category" },
    {
      header: "Image",
      render: (_, row) => {
        return (
          <img
            src={row.image}
            alt={row.title}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        );
      },
    },
    { header: "Operation", render: "delete" },
  ];

  return (
    <AdminBaseTable columns={columns} data={data} onDelete={handleDelete} />
  );
};

export default ProductsTable;
