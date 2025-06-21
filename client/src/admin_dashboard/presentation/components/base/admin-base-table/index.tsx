import styles from "./AdminBaseTable.module.css";
import AdminBaseButton from "../admin-base-button";

export interface IAdminBaseTableColumn<T> {
  header: string;
  accessor?: keyof T;
  render?: ((value: any, row: T) => React.ReactNode) | "delete";
}

interface IAdminBaseTableProps<T> {
  columns: IAdminBaseTableColumn<T>[];
  data: T[];
  onDelete?: (id: string) => void;
}

function AdminBaseTable<T extends { id: string }>({
  columns,
  data,
  onDelete,
}: IAdminBaseTableProps<T>): React.JSX.Element {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>No data to display</td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row._id}>
                {columns.map((col, colIdx) => (
                  <td key={colIdx}>
                    {col.render === "delete" ? (
                      <AdminBaseButton
                        type="button"
                        content="Delete"
                        isDestructive
                        onClick={() => onDelete?.(row._id)}
                      />
                    ) : col.render ? (
                      col.render(row[col.accessor as keyof T], row)
                    ) : (
                      String(row[col.accessor as keyof T] ?? "")
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBaseTable;
