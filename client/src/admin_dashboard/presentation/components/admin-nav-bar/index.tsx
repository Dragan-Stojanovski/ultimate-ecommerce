import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./AdminNavBar.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const AdminNavBar = (): React.JSX.Element => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container} ${!isVisible ? styles.hidden : ""}`}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink
              to="nav-categories"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.activeLink : ""}`
              }
            >
              Nav Categories
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="products"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.activeLink : ""}`
              }
            >
              Products
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="customers"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.activeLink : ""}`
              }
            >
              Customers
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="orders"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.activeLink : ""}`
              }
            >
              Orders
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="promotions"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.activeLink : ""}`
              }
            >
              Promotions
            </NavLink>
          </li>

          <li className={styles.navItem}>
            <NavLink
              to="analytics"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.activeLink : ""}`
              }
            >
              Analytics
            </NavLink>
          </li>
        </ul>
      </div>

      <button
        className={styles.toggleBtn}
        onClick={() => setIsVisible((prev) => !prev)}
        aria-label="Toggle Sidebar"
      >
        {isVisible ? <FiChevronLeft /> : <FiChevronRight />}
      </button>
    </div>
  );
};

export default AdminNavBar;
