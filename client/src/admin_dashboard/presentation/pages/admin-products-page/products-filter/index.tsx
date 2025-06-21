import { useForm } from "react-hook-form";
import TextInputField from "../../../components/base/form-elements/text-input-field";
import AdminBaseButton from "../../../components/base/admin-base-button";
import AdminSelectCategory from "../../../components/base/admin-select-category";
import styles from './ProductFilter.module.css';
interface IFormValues {
  title: string;
  category: string;
}

interface IProductsFilterProps {
  onFilterSubmit: (data: IFormValues) => void;
}

const ProductsFilter = ({
  onFilterSubmit,
}: IProductsFilterProps): React.JSX.Element => {
  const { control, handleSubmit } = useForm<IFormValues>({
    defaultValues: {
      title: "",
      category: "",
    },
  });

  const onSubmit = (data: IFormValues) => {
    onFilterSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", gap: "1rem" }}
    >
         <div className={styles.filters_wrapper}>
<div className={styles.field_box}>


      <TextInputField
        type="text"
        name="title"
        label="Search by title"
        testId="titleFilter"
        control={control}
        placeholder="Title"
      />
</div>
<div className={styles.field_box}>
      <AdminSelectCategory
        name="category"
        control={control}
        rules={{ required: false }}
      />
      </div>
      <AdminBaseButton type="submit" content={"Search"} />
      </div>
    </form>
  );
};

export default ProductsFilter;
