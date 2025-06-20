import { useForm } from "react-hook-form";
import { type Dispatch, type SetStateAction } from "react";
import React from "react";
import type { IProductResponse } from "../../../../../domain/usecases/product/IProductResponse";
import { addProduct } from "../../../../../infra/http/api-calls/products/addProduct";
import type { IAddProductRequest } from "../../../../../domain/usecases/product/IAddProductRequest";
import TextInputField from "../../../components/base/form-elements/text-input-field";
import AdminBaseButton from "../../../components/base/admin-base-button";
import AdminTextArea from "../../../components/base/form-elements/admin-text-area";
import AdminSelectCategory from "../../../components/base/admin-select-category";

export interface IAddProductFormProps {
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  setProductsData: Dispatch<SetStateAction<IProductResponse[]>>;
}

const AddProductForm = ({
  setIsModalVisible,
  setProductsData,
}: IAddProductFormProps): React.JSX.Element => {
  const { handleSubmit, control } = useForm<IAddProductRequest>({
    mode: "onChange",
  });

  async function createProductFn(data: IAddProductRequest) {
    try {
      const newProduct = await addProduct(data);
      setProductsData((prev) => [...prev, newProduct.data]);
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div onClick={() => setIsModalVisible(false)} />

      <form
        onSubmit={handleSubmit((formData) => {
          createProductFn(formData);
        })}
      >
        <div>
          <TextInputField
            name="title"
            type="text"
            label="Name"
            testId="nameField"
            control={control}
            rules={{ required: "Name is required" }}
          />
        </div>

        <div>
          <AdminTextArea
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            label="Description"
          />
        </div>

        <div>
          <TextInputField
            name="price"
            type="number"
            label="Price"
            testId="priceField"
            control={control}
            rules={{ required: "Price is required", min: 0 }}
          />
        </div>

        <div>
          <TextInputField
            name="image"
            type="text"
            label="Image URL"
            testId="imageUrlField"
            control={control}
            rules={{ required: "Image URL is required" }}
          />
        </div>

        <div>
          <AdminSelectCategory
            control={control}
            name="category"
            rules={{ required: "Category is required" }}
          />
        </div>

        <div>
          <AdminBaseButton type="submit" content="Add Product" />
        </div>
      </form>
    </>
  );
};

export default AddProductForm;
