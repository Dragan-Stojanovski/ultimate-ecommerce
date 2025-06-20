import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavBar from "./presentation/components/admin-nav-bar";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = (): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <AdminNavBar />
      <div className={styles.pages_wrapper}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
