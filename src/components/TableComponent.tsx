import Box from "@mui/material/Box";
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import UploadData from "./UploadData";

const columns: GridColDef[] = [
  { 
    field: "id", 
    headerName: "ID", 
    width: 50, 
    headerAlign: "center",
    align: 'center',
  },
  {
    field: "name",
    headerName: "Nombre completo",
    width: 200,
    headerAlign: "center",
    align: 'center',
  },
  {
    field: "idProject",
    headerName: "Cédula",
    type: "number",
    width: 100,
    headerAlign: "center",
    align: 'center',
  },
  {
    field: "projectName",
    headerName: "Título del proyecto",
    width: 250,
    headerAlign: "center",
    align: 'center',
  },
  {
    field: "budget",
    headerName: "Presupuesto en $",
    type: "number",
    width: 130,
    headerAlign: "center",
    align: 'center',
  },
  {
    field: "initialDate",
    headerName: "Fecha de inicio",
    width: 150,
    headerAlign: "center",
    align: 'center',
  },
  {
    field: "finalDate",
    headerName: "Fecha de finalización",
    width: 150,
    headerAlign: "center",
    align: 'center',
  },
  {
    field: 'actions',
    headerName: 'Subir facturas',
    width: 120,
    renderCell: (params: GridRenderCellParams) => {
      return <UploadData rowData={params.row} />;
    },
    headerAlign: 'center',
    align: 'center',
  },
];

const rows = [
  {
    id: 1,
    name: "Carlos Piña",
    idProject: 12345678,
    projectName: "Proyecto 1",
    budget: 1000,
    initialDate: "1/09/2025",
    finalDate: "31/12/2025"
  },
  {
    id: 2,
    name: "Yonis Guillermo",
    idProject: 87654321,
    projectName: "Proyecto 2",
    budget: 3200,
    initialDate: "1/09/2025",
    finalDate: "31/12/2025"
  },
  { 
    id: 3, 
    name: "José Perez", 
    idProject: 10293847, 
    projectName: "Proyecto 3",
    budget: 300,
    initialDate: "1/09/2025",
    finalDate: "31/12/2025" 
  },
  {
    id: 4,
    name: "Miguel Rojas",
    idProject: 56473829,
    projectName: "Proyecto 4",
    budget: 680,
    initialDate: "1/09/2025",
    finalDate: "31/12/2025"
  },
  {
    id: 5,
    name: "David Mendez",
    idProject: 10101010,
    projectName: "Proyecto 5",
    budget: 290,
    initialDate: "1/09/2025",
    finalDate: "31/12/2025"
  },
];

export default function DataGridDemo() {
  return (
    <>
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
        />
      </Box>
    </>
  );
}
