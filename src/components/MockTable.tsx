import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import useFetchingData from "../libs/hooks/useFetchingData";

interface Column {
  id: keyof Data;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "Id", label: "Index" },
  { id: "userName", label: "User Name", minWidth: 170 },
  { id: "gender", label: "Gender" },
  { id: "address", label: "Address", minWidth: 170 },
  { id: "productName", label: "Product Name", minWidth: 170 },
  { id: "quantity", label: "Quantity", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 100 },
];

const MockTable = () => {
  const { data } = useFetchingData();
  const [page, setPage] = useState<number>(0);
  const [dataPerPage, setDataPerPage] = useState<number>(100);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDataPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className="p-3 w-[1080px]" elevation={10}>
      <TableContainer sx={{ maxHeight: "60vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.slice(page * dataPerPage, page * dataPerPage + dataPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.Id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={dataPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default MockTable;
