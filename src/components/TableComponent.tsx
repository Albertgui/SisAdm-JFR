import Box from "@mui/material/Box";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import UploadData from "./UploadData";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import Actions from "./ActionsComponent";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "fullname",
    headerName: "Nombre completo",
    flex: 2,
    minWidth: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "idProject",
    headerName: "Cédula",
    type: "number",
    width: 100,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "projectName",
    headerName: "Título del proyecto",
    flex: 3,
    minWidth: 200,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "budget",
    headerName: "Presupuesto en $",
    type: "number",
    flex: 1,
    minWidth: 120,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "initialDate",
    headerName: "Fecha de inicio",
    flex: 1,
    minWidth: 120,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "finalDate",
    headerName: "Fecha de finalización",
    flex: 1,
    minWidth: 120,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "bills",
    headerName: "Facturas",
    width: 85,
    renderCell: (params: GridRenderCellParams) => {
      return <UploadData rowData={params.row} />;
    },
    headerAlign: "center",
    align: "center",
  },
  {
    field: "actions",
    headerName: "Acciones",
    width: 85,
    renderCell: (params: GridRenderCellParams) => {
      return <Actions rowData={params.row} />;
    },
    headerAlign: "center",
    align: "center",
  },
];

const rows = [
  {
    id: 1,
    fullname: "Carlos Piña",
    idProject: 12345678,
    projectName: "Proyecto 1",
    budget: 1000,
    initialDate: "1/09/2025",
    finalDate: "31/12/2025",
  },
  {
    id: 2,
    fullname: "Yonis Guillermo",
    idProject: 87654321,
    projectName: "Proyecto 2",
    budget: 3200,
    initialDate: "1/09/2025",
    finalDate: "1/12/2025",
  },
  {
    id: 3,
    fullname: "José Perez",
    idProject: 10293847,
    projectName: "Proyecto 3",
    budget: 300,
    initialDate: "1/09/2025",
    finalDate: "3/2/2025",
  },
  {
    id: 4,
    fullname: "Miguel Rojas",
    idProject: 56473829,
    projectName: "Proyecto 4",
    budget: 680,
    initialDate: "1/09/2025",
    finalDate: "31/12/2025",
  },
  {
    id: 5,
    fullname: "David Mendez",
    idProject: 10101010,
    projectName: "Proyecto 5",
    budget: 290,
    initialDate: "10/3/2025",
    finalDate: "31/12/2025",
  },
];

export default function DataGridDemo() {
  const [columnVisibilityModel] = useState({ id: false });

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        color="error"
        sx={{ mb: 4, mr:3, fontWeight: "bold" }}
      >
        Agregar encargados
      </Button>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        color="error"
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        Crear nuevo proyecto
      </Button>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          columnVisibilityModel={columnVisibilityModel}
        />
      </Box>
    </>
  );
}
