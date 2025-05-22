import React, { useState, useMemo } from "react";

interface Column<T> {
  label: string;
  key: keyof T;
  width?: string;
}

type SortDirection = "asc" | "desc";

interface DataTableProps<T> {
  title?: string;
  columns: Column<T>[];
  data: T[];
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
}

function DataTable<T extends Record<string, any>>({
  title,
  columns,
  data,
  rowsPerPageOptions = [10, 25, 50, 100],
  defaultRowsPerPage = 10,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: SortDirection;
  }>({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (
        typeof aValue === "string" &&
        typeof bValue === "string" &&
        !isNaN(Date.parse(aValue)) &&
        !isNaN(Date.parse(bValue))
      ) {
        const aTime = new Date(aValue).getTime();
        const bTime = new Date(bValue).getTime();
        return sortConfig.direction === "asc" ? aTime - bTime : bTime - aTime;
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / rowsPerPage));
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const formatValue = (key: keyof T, value: any) => {
    if (
      typeof value === "string" &&
      !isNaN(Date.parse(value)) &&
      key.toString().toLowerCase().includes("data")
    ) {
      return new Date(value).toLocaleDateString("pt-BR");
    }
    return value;
  };

  const sortTable = (key: keyof T) => {
    setSortConfig((currentSort) => ({
      key,
      direction:
        currentSort.key === key && currentSort.direction === "asc"
          ? "desc"
          : "asc",
    }));
    setCurrentPage(1);
  };

  // Estilos como no seu código original
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as const,
      margin: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      backgroundColor: "white",
      width: "calc(100% - 40px)",
      minHeight: "fit-content",
    },
    title: {
      padding: "16px 20px",
      fontSize: "1.2rem",
      fontWeight: 600,
      backgroundColor: "#f8f9fa",
      borderBottom: "1px solid #dee2e6",
    },
    tableWrapper: {
      overflowX: "auto" as const,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse" as const,
      tableLayout: "fixed" as const,
    },
    header: {
      backgroundColor: "#4a90e2",
      color: "white",
      cursor: "pointer",
      userSelect: "none" as const,
    },
    headerCell: {
      padding: "12px 15px",
      border: "1px solid #ddd",
      textAlign: "left" as const,
      whiteSpace: "nowrap" as const,
      overflow: "hidden",
      textOverflow: "ellipsis" as const,
    },
    evenRow: {
      backgroundColor: "#f6f8fa",
    },
    oddRow: {
      backgroundColor: "white",
    },
    cell: {
      padding: "12px 15px",
      border: "1px solid #ddd",
      textAlign: "left" as const,
      whiteSpace: "nowrap" as const,
      overflow: "hidden",
      textOverflow: "ellipsis" as const,
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 20px",
      backgroundColor: "#f8f9fa",
      borderTop: "1px solid #dee2e6",
      flexWrap: "wrap" as const,
      gap: "10px",
    },
    paginationButton: {
      padding: "6px 12px",
      border: "1px solid #4a90e2",
      backgroundColor: "white",
      color: "#4a90e2",
      borderRadius: "4px",
      cursor: "pointer",
    },
    disabledButton: {
      opacity: 0.5,
      cursor: "default",
    },
  };

  return (
    <div style={styles.container}>
      {title && <div style={styles.title}>{title}</div>}

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead style={styles.header}>
            <tr>
              {columns.map(({ label, key, width }) => (
                <th
                  key={String(key)}
                  onClick={() => sortTable(key)}
                  style={{ ...styles.headerCell, width }}
                >
                  {label}
                  {sortConfig.key === key && (
                    <span style={{ marginLeft: "6px", fontSize: "12px" }}>
                      {sortConfig.direction === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{ padding: "20px", textAlign: "center" }}
                >
                  Nenhum dado disponível
                </td>
              </tr>
            ) : (
              paginatedData.map((row, i) => (
                <tr
                  key={i} // ideal: um id único se existir em row
                  style={i % 2 === 0 ? styles.evenRow : styles.oddRow}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e2e8f0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      i % 2 === 0 ? "#f6f8fa" : "white";
                  }}
                >
                  {columns.map(({ key }) => (
                    <td key={String(key)} style={styles.cell}>
                      {formatValue(key, row[key])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={styles.footer}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "14px" }}>Itens por página:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            style={{
              padding: "6px 12px",
              border: "1px solid #4a90e2",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            style={{
              ...styles.paginationButton,
              ...(currentPage === 1 && styles.disabledButton),
            }}
          >
            {"<<"}
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            style={{
              ...styles.paginationButton,
              ...(currentPage === 1 && styles.disabledButton),
            }}
          >
            {"<"}
          </button>
          <span style={{ fontSize: "14px" }}>
            Página {sortedData.length === 0 ? 0 : currentPage} de{" "}
            {sortedData.length === 0 ? 0 : totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages || sortedData.length === 0}
            style={{
              ...styles.paginationButton,
              ...(currentPage === totalPages || sortedData.length === 0
                ? styles.disabledButton
                : {}),
            }}
          >
            {">"}
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages || sortedData.length === 0}
            style={{
              ...styles.paginationButton,
              ...(currentPage === totalPages || sortedData.length === 0
                ? styles.disabledButton
                : {}),
            }}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;