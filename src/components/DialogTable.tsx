import {
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { IScanResponse, Issue } from "../types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

interface TProps {
  open: boolean;
  loading: boolean;
  handleClose: () => void;
  errorMessage?: string;
  payload?: IScanResponse | null;
}
const columns: readonly Column[] = [
  { id: "file", label: "File", minWidth: 170 },
  { id: "details", label: "Details", minWidth: 100 },
  { id: "column", label: "Column", minWidth: 100 },
  { id: "line", label: "Line", minWidth: 100 },
];

interface Column {
  id: "file" | "details" | "column" | "line";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export default function DialogTable ({
  open,
  handleClose,
  payload,
  loading,
  errorMessage,
}: TProps) {
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{ "& .MuiDialog-paper": { width: "60%", maxWidth: "none" } }}
    >
      <DialogTitle style={{ textAlign: "center" }}>
        Issues result
      </DialogTitle>
      {loading ?
        (<Box style={{ padding: "30px", alignSelf: "center" }}>
          <CircularProgress />
        </Box>) :
        errorMessage ?
          (<Box display="flex">
            <ErrorIcon fontSize="large" sx={{ color: "red" }} />
            <Typography variant="h4">{errorMessage}</Typography>
          </Box>) :
          payload?.issues && payload.issues.length == 0 ?
            (<Box display="flex" justifyContent="center" p={5}>
              <CheckCircleIcon fontSize="large" sx={{ color: "green" }} />
              <Typography variant="h4">No issues found</Typography>
            </Box>) :
            (<TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payload && payload.issues && payload.issues.length > 0 && payload.issues.map((issue: Issue, index: number) => {
                    return (
                      <TableRow key={index}>
                        {columns.map((column: Column) => (
                          <TableCell>
                            {issue[column.id]}
                          </TableCell>))}
                      </TableRow>)
                  })}
                </TableBody>
              </Table>
            </TableContainer>)
      }
    </Dialog>
  );
}
