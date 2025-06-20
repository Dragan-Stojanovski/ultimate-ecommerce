import { useEffect, useState } from "react";
import type { INavCategory } from "../../../../domain/usecases/nav-categories/INavCategory";
import { getCategories } from "../../../../infra/http/api-calls/nav-categories/getCategories";
import CategoriesTable from "./components/categories-table";
import AddCategoryForm from "./components/add-category-form";
import AdminBaseModalWindow from "../../components/base/admin-base-modal-window";
import AdminBaseButton from "../../components/base/admin-base-button";
import styles from './AdminNavCategoriesPage.module.css';

const AdminNavCategoriesPage = (): React.JSX.Element => {
  const [categoriesData, setCategoriesData] = useState<INavCategory[] | []>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  async function getCategoriesDataFn() {
    const result = await getCategories();
    setCategoriesData(result.data);
  }

  useEffect(() => {
    getCategoriesDataFn();
  }, []);

  return (
    <>
    <div className={styles.navcategories_header}>
      <h1>Navigation Categories</h1>
      <AdminBaseButton
        type="button"
        content="Add Category"
        onClick={() => setIsModalVisible(true)}
      />
      </div>
      <CategoriesTable data={categoriesData} setCategoriesData={setCategoriesData} />
      <AdminBaseModalWindow
      title="Add Category"
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <AddCategoryForm
          setIsModeVisible={setIsModalVisible}
          setCategoriesData={setCategoriesData}
        />
      </AdminBaseModalWindow>
    </>
  );
};

export default AdminNavCategoriesPage;
