import { useForm } from "react-hook-form";
import { useState, type Dispatch, type SetStateAction } from "react";
import React from "react";
import TextInputField from "../../../../components/base/form-elements/text-input-field";
import AdminBaseButton from "../../../../components/base/admin-base-button";
import { addCategory } from "../../../../../../infra/http/api-calls/nav-categories/addCategory";
import type { INavCategory } from "../../../../../../domain/usecases/nav-categories/INavCategory";

export interface ICategoriesFormProps {
  setIsModeVisible: Dispatch<SetStateAction<boolean>>;
  setCategoriesData: Dispatch<SetStateAction<INavCategory[]>>;
}

const AddCategoryForm = ({
  setIsModeVisible,
  setCategoriesData,
}: ICategoriesFormProps): React.JSX.Element => {
  const { handleSubmit, control } = useForm<INavCategory>({
    mode: "onChange",
  });

  async function createCategoryFn(data: INavCategory) {
    try {
      const newCategory = await addCategory(data);
            const normalizedCategory = {
      ...newCategory.data,
      _id: newCategory.data._id ?? newCategory.data.id, 
    };
      setCategoriesData((prev) => [...prev, normalizedCategory]);

      setIsModeVisible(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div onClick={() => setIsModeVisible(false)} />

      <form
        onSubmit={handleSubmit((formData) => {
          createCategoryFn({
            label: formData.label,
            path: formData.path,
          });
        })}
      >
        <div>
          <TextInputField
            name="label"
            type="text"
            label="Label"
            testId="labelField"
            control={control}
            rules={{
              required: "Label is required",
            }}
          />
        </div>

        <div>
          <TextInputField
            name="path"
            type="text"
            label="Path"
            testId="pathField"
            control={control}
            rules={{
              required: "Path is required",
            }}
          />
        </div>

        <div>
          <AdminBaseButton type="submit" content="Add Category" />
        </div>
      </form>
    </>
  );
};

export default AddCategoryForm;
