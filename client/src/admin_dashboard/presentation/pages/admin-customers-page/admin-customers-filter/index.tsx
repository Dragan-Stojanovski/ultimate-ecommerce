import React, { useState } from "react";
import TextInputField from "../../../components/base/form-elements/text-input-field";
import AdminBaseButton from "../../../components/base/admin-base-button";

interface IAdminCustomersFilterProps {
  onSearch: (username: string) => void;
}

const AdminCustomersFilter = ({
  onSearch,
}: IAdminCustomersFilterProps): React.JSX.Element => {
  const [searchUsername, setSearchUsername] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchUsername.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInputField
        type="text"
        placeholder="Search by username"
        value={searchUsername}
        onChange={(e) => setSearchUsername(e.target.value)}
      />
      <AdminBaseButton type="submit" content="Search" />
    </form>
  );
};

export default AdminCustomersFilter;
