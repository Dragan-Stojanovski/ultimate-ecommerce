import { useEffect, useState } from "react";
import AddProductForm from "./add-product-form";
import ProductsTable from "./products-table";
import type { IProductResponse } from "../../../../domain/usecases/product/IProductResponse";
import { getProducts } from "../../../../infra/http/api-calls/products/getProducts";
import AdminBaseModalWindow from "../../components/base/admin-base-modal-window";
import AdminBaseButton from "../../components/base/admin-base-button";
import styles from "./AdminProductsPage.module.css";
import ProductsFilter from "./products-filter";
import SetMetaInfo from "../../../../infra/utility/setMetaInfo";

const AdminProductsPage = (): React.JSX.Element => {
  const [productsData, setProductsData] = useState<IProductResponse[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  async function getProductsDataFn(title = "", category = "") {
    const result = await getProducts(title, category);
    setProductsData(result.data);
  }

  useEffect(() => {
    getProductsDataFn();
  }, []);

  const handleFilterSubmit = (data: { title: string; category: string }) => {
    getProductsDataFn(data.title, data.category);
  };
  return (
    <>
      <SetMetaInfo
        title={"Admin Products"}
        description={"Admin Products Meta"}
      />
      <ProductsFilter onFilterSubmit={handleFilterSubmit} />

      <div className={styles.products_header}>
        <h1>Products</h1>
        <div className={styles.products_controls}>
          <AdminBaseButton
            type="button"
            content="Add Product"
            onClick={() => setIsModalVisible(true)}
          />
        </div>
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
