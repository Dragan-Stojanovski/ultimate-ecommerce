import { useEffect, useState } from "react";
import type { IUserResponse } from "../../../../domain/usecases/users/IUserResponse";
import { getAllUsers } from "../../../../infra/http/api-calls/users/getAllUsers";
import AdminCustomersTable from "./admin-customers-table";
import AdminCustomersFilter from "./admin-customers-filter";

const AdminCustomersPage = (): React.JSX.Element => {
  const [customersData, setCustomersData] = useState<IUserResponse[] | []>([]);

  async function getAllCustomersFn(username = "") {
    const result = await getAllUsers({ username });
    setCustomersData(result.data.users);
    console.log("customersData",customersData)
  }

  useEffect(() => {
    getAllCustomersFn();
  }, []);

  const handleSearch = (username: string) => {
    getAllCustomersFn(username);
  };

  return (
    <>
      <h1>AdminCustomersPage</h1>
      <AdminCustomersFilter onSearch={handleSearch} />
      <AdminCustomersTable data={customersData} />
    </>
  );
};

export default AdminCustomersPage;
