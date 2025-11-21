import Box from "@mui/material/Box";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import UploadData from "./UploadData";
import { Button, Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import Actions from "./ActionsComponent";
import type { ProyectoDetalle } from "../interface/interface";
import { getDataTable, isApiError } from "../utils/apiProject";
import CreatePerson from "./CreatePersonModal";

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
    headerAlign: "center",
    align: "center",
  },
];

export default function DataGridDemo() {
  const [columnVisibilityModel] = useState({ id: false });
  const [proyectos, setProyectos] = useState<ProyectoDetalle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProyectos = async () => {
    setLoading(true);
    try {
      const data = await getDataTable();
      setProyectos(data);
      setError(null);
    } catch (error) {
      if (isApiError(error)) {
        setError(error.message);
      } else {
        setError("Ocurrió un error desconocido.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProyectos();
  }, []);

  const getTime = (isoString: string) => {
    const date = new Date(isoString);
    const options = {
      day: "2-digit" as const,
      month: "2-digit" as const,
      year: "numeric" as const,
    };
    const formattedDate = date.toLocaleDateString("es-ES", options);
    return formattedDate;
  };

  const getGridRows = () => {
    return proyectos.map((p) => ({
      id: p.id_proyecto,
      fullname: p.nombre,
      cedula: p.cedula,
      idProject: p.id_proyecto,
      projectName: p.nombre_proyecto,
      budget: p.presupuesto,
      initialDate: getTime(p.fecha_inicio),
      finalDate: getTime(p.fecha_fin),
    }));
  };

  if (loading) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid>
          <CircularProgress size="6rem" color="error" />
        </Grid>
        <Grid sx={{ mt: 3 }}>
          <Typography variant="h4" gutterBottom color="grey">
            Cargando información
          </Typography>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return (
      <>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "80vh" }}
        >
          <Grid>
            <Typography variant="h3" gutterBottom color="grey">
              {error}
            </Typography>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <CreatePerson></CreatePerson>
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
          rows={getGridRows()}
          columns={columns.map((col) => {
            if (col.field === "actions") {
              return {
                ...col,
                renderCell: (params: GridRenderCellParams) => (
                  <Actions rowData={params.row} refreshTable={loadProyectos} />
                ),
              };
            }
            return col;
          })}
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
