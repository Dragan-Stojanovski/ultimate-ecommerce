import { useEffect, useState } from "react";
import AddProductForm from "./add-product-form";
import ProductsTable from "./products-table";
import type { IProductResponse } from "../../../../domain/usecases/product/IProductResponse";
import { getProducts } from "../../../../infra/http/api-calls/products/getProducts";
import AdminBaseModalWindow from "../../components/base/admin-base-modal-window";
import AdminBaseButton from "../../components/base/admin-base-button";
import styles from './AdminProductsPage.module.css';

const AdminProductsPage = (): React.JSX.Element => {
  const [productsData, setProductsData] = useState<IProductResponse[] | []>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  async function getProductsDataFn() {
    const result = await getProducts();
    setProductsData(result.data);
  }

  useEffect(() => {
    getProductsDataFn();
  }, []);

  return (
    <>
     <div className={styles.products_header}>
      <h1>Products Page</h1>
      <AdminBaseButton
        type="button"
        content="Add Product"
        onClick={() => setIsModalVisible(true)}
      />
      </div>
      <AdminBaseModalWindow
        title="Add Product"
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <AddProductForm
          setProductsData={setProductsData}
          setIsModalVisible={setIsModalVisible}
        />
      </AdminBaseModalWindow>
      <ProductsTable setProductsData={setProductsData} data={productsData} />
    </>
  );
};

export default AdminProductsPage;
