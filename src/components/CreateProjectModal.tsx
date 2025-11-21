import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Alert,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slide,
  Snackbar,
  type SelectChangeEvent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { TransitionProps } from "@mui/material/transitions";
import PersonIcon from "@mui/icons-material/Person";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { InfoProyectoCompleta, PersonData } from "../interface/interface";
import { getAllPerson, isApiError } from "../utils/apiPerson";
import { createProyecto } from "../utils/apiProject";

dayjs.extend(customParseFormat);
type DateStateType = Dayjs | null;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateProject() {
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = React.useState({
    cedula: 0,
    fullname: "",
    idProject: "",
    nombre_proyecto: "",
    presupuesto: 0,
  });
  const [dateInitial, setDateInitial] = React.useState<DateStateType | null>(null); 
  const [dateFinal, setDateFinal] = React.useState<DateStateType | null>(null);
  const [responsable, setResponsable] = React.useState<number | string>("");
  const [personList, setPersonList] = React.useState<PersonData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [alertState, setAlertState] = React.useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const getAllResponsable = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPerson();
      setPersonList(data);
    } catch (error) {
      if (isApiError(error)) {
        setError(error.message);
      } else {
        setError("Error desconocido al cargar los responsables.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClickOpen = () => {
    getAllResponsable();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormState({
      cedula: 0,
      fullname: "",
      idProject: "",
      nombre_proyecto: "",
      presupuesto: 0,
    });
    setResponsable("");
    setDateInitial(null);
    setDateFinal(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeSelect = (event: SelectChangeEvent<number | string>) => {
    setResponsable(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formattedInitialDate = dateInitial
      ? dateInitial.format("DD/MM/YYYY")
      : "";
    const formattedFinalDate = dateFinal ? dateFinal.format("DD/MM/YYYY") : "";
    const finalData: InfoProyectoCompleta = {
      id_persona: responsable.toString(),
      nombre_proyecto: formState.nombre_proyecto,
      presupuesto: formState.presupuesto,
      fecha_inicio: formattedInitialDate,
      fecha_fin: formattedFinalDate,
    };
    try {
      await createProyecto(finalData);
      setAlertState({
        open: true,
        message: `El proyecto: ${finalData.nombre_proyecto} fue creado con éxito`, 
        severity: "success",
      });
      handleClose();
    } catch (error) {
      console.error("Fallo al crear el proyecto:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error desconocido al crear proyecto";
      setAlertState({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  const handleAlertClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertState({ ...alertState, open: false });
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        color="error"
        sx={{ mb: 4, mr: 3, fontWeight: "bold" }}
        onClick={handleClickOpen}
      >
        Crear proyecto
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>Crear proyecto</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel id="select-label">Responsable</InputLabel>
              <Select
                labelId="select-label"
                id="simple-select"
                value={responsable ?? ""}
                label="Responsable"
                onChange={handleChangeSelect}
                input={
                  <OutlinedInput
                    id="simple-select"
                    label="Responsable"
                    startAdornment={
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    }
                  />
                }
              >
                <MenuItem value="">
                  <em>Ninguno seleccionado</em>
                </MenuItem>
                {loading ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} sx={{ mr: 1 }} /> Cargando...
                  </MenuItem>
                ) : error ? (
                  <MenuItem disabled>Error al cargar: {error}</MenuItem>
                ) : (
                  personList.map((person) => (
                    <MenuItem key={person.cedula} value={person.cedula}>
                      {person.nombre}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="nombre_proyecto"
              name="nombre_proyecto"
              label="Título del proyecto"
              type="text"
              fullWidth
              variant="outlined"
              sx={{ mt: 3 }}
              autoComplete="off"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeRepairServiceIcon />
                    </InputAdornment>
                  ),
                },
              }}
              value={formState.nombre_proyecto}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="presupuesto"
              name="presupuesto"
              label="Presupuesto en $"
              type="text"
              fullWidth
              variant="outlined"
              sx={{ mt: 3 }}
              autoComplete="off"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  ),
                },
              }}
              value={formState.presupuesto}
              onChange={handleChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker", "DatePicker"]}
                sx={{
                  mt: 2,
                  display: "flex",
                  "& > div": {
                    flexGrow: 1,
                    minWidth: 0,
                  },
                }}
              >
                <DatePicker
                  label="Fecha de inicio"
                  format="DD/MM/YYYY"
                  value={dateInitial}
                  onChange={(newValue) => setDateInitial(newValue)}
                />
                <DatePicker
                  label="Fecha final"
                  format="DD/MM/YYYY"
                  value={dateFinal}
                  onChange={(newValue) => setDateFinal(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </form>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", m: 2 }}>
          <Button
            onClick={handleClose}
            color="error"
            variant="contained"
            sx={{ fontWeight: "bold" }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form="subscription-form"
            variant="contained"
            sx={{ fontWeight: "bold" }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={alertState.open}
        autoHideDuration={1500}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertState.severity}
          sx={{ width: "100%" }}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
