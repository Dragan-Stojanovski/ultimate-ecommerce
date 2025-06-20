import { useEffect, useState } from "react";
import type { INavCategory } from "../../../../../domain/usecases/nav-categories/INavCategory";
import { getCategories } from "../../../../../infra/http/api-calls/nav-categories/getCategories";
import type {
  Control,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";
import AdminSelectController from "../admin-select-controller";

interface IAdminSelectCategoryProps<FormValues extends FieldValues> {
  control: Control<FormValues>;
  name: Path<FormValues>;
  rules?: RegisterOptions;
}

const AdminSelectCategory = <FormValues extends FieldValues>({
  control,
  name,
  rules,
}: IAdminSelectCategoryProps<FormValues>): React.JSX.Element => {
  const [categoriesData, setCategoriesData] = useState<INavCategory[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await getCategories();
      setCategoriesData(result.data);
    };
    fetch();
  }, []);

  const categoryOptions = categoriesData.map((cat) => ({
    label: cat.label,
    value: cat.label,
  }));

  return (
    <AdminSelectController
      control={control}
      name={name}
      label="Category"
      rules={rules}
      options={categoryOptions}
      placeholder="Select Category"
    />
  );
};

export default AdminSelectCategory;
