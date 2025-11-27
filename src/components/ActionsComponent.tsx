import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slide,
  Snackbar,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
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
import type {
  PersonData,
  PersonProps,
  ProyectoDetalle,
} from "../interface/interface";
import { getAllPerson, isApiError } from "../utils/apiPerson";
import { editProyecto } from "../utils/apiProject";

dayjs.extend(customParseFormat);
type DateStateType = Dayjs | null;
const parseDate = (dateString: string): DateStateType => {
  const date = dayjs(dateString, [
    "D/M/YYYY",
    "DD/M/YYYY",
    "D/MM/YYYY",
    "DD/MM/YYYY",
    "D/M/YYYY",
  ]);
  return date.isValid() ? date : null;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Actions({ rowData, refreshTable }: PersonProps) {
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = React.useState({
    cedula: rowData.cedula,
    fullname: rowData.fullname,
    idProject: rowData.idProject,
    projectName: rowData.projectName,
    budget: rowData.budget,
  });
  const [dateInitial, setDateInitial] = React.useState<DateStateType>(parseDate(rowData.initialDate));
  const [dateFinal, setDateFinal] = React.useState<DateStateType>(parseDate(rowData.finalDate));
  const [responsable, setResponsable] = React.useState<number | string>(rowData.cedula ?? "");
  const [personList, setPersonList] = React.useState<PersonData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [alertState, setAlertState] = React.useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const isResponsableValid = responsable !== "" && responsable !== null && responsable !== undefined;
  const isProjectNameValid = formState.projectName && formState.projectName.trim().length > 0;
  const isBudgetValid = /^\d+(\.\d+)?$/.test(String(formState.budget));
  const isDatesValid = dateInitial !== null && dateInitial.isValid() && dateFinal !== null && dateFinal.isValid();
  const isFormValid = isResponsableValid && isProjectNameValid && isBudgetValid && isDatesValid;

  const handleClickOpen = () => {
    setOpen(true);
    getAllResponsable();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeSelect = (event: SelectChangeEvent<number | string>) => {
    setResponsable(event.target.value);
  };

  const getAllResponsable = async () => {
    const data = await getAllPerson();
    setPersonList(data);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formattedInitialDate = dateInitial
      ? dateInitial.format("DD/MM/YYYY")
      : "";
    const formattedFinalDate = dateFinal ? dateFinal.format("DD/MM/YYYY") : "";
    const finalData: ProyectoDetalle = {
      cedula: responsable.toString(),
      nombre_proyecto: formState.projectName,
      presupuesto: formState.budget,
      fecha_inicio: formattedInitialDate,
      fecha_fin: formattedFinalDate,
      id: rowData.id,
      id_proyecto: formState.idProject,
    };
    try {
      await editProyecto(finalData);
      setAlertState({
        open: true,
        message: `El proyecto: ${finalData.nombre_proyecto} fue editado con éxito`,
        severity: "success",
      });
      refreshTable();
      handleClose();
    } catch (error) {
      console.error("Fallo al editar el proyecto:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error desconocido al editar proyecto";
      setAlertState({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  React.useEffect(() => {
    try {
      if (personList && personList.length > 0) {
        const currentResponsableValue = String(responsable ?? "");
        const responsableExists = personList.some(
          (p) => String(p.cedula) === currentResponsableValue
        );
        if (!responsableExists && currentResponsableValue !== "") {
          setResponsable(personList[0].cedula);
        }
      }
    } catch (error) {
      if (isApiError(error)) {
        setError(error.message);
      } else {
        setError("Error desconocido al cargar los responsables.");
      }
    } finally {
      setLoading(false);
    }
  }, [personList, responsable]);

  const handleAlertClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertState({ ...alertState, open: false });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
        }}
      >
        <CircularProgress size="2rem" color="error" />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Cargando responsables...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <React.Fragment>
      <IconButton aria-label="delete" onClick={handleClickOpen} color="error">
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>Editar información</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            {personList && personList.length > 0 ? (
              <FormControl fullWidth sx={{ mt: 3 }} error={!isResponsableValid}>
                <InputLabel id="select-label">Responsable</InputLabel>
                <Select
                  labelId="select-label"
                  id="simple-select"
                  label="Responsable"
                  value={responsable ?? ""}
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
                  {personList.map((person) => (
                    <MenuItem key={person.cedula} value={person.cedula}>
                      {person.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <CircularProgress size={24} />{" "}
              </Box>
            )}
            <TextField
              margin="dense"
              id="projectName"
              name="projectName"
              label="Título del proyecto"
              type="text"
              fullWidth
              variant="outlined"
              sx={{ mt: 3 }}
              autoComplete="off"
              error={!isProjectNameValid && formState.projectName !== ""}
              helperText={!isProjectNameValid && formState.projectName !== "" ? "El título es requerido" : ""}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeRepairServiceIcon />
                    </InputAdornment>
                  ),
                },
              }}
              value={formState.projectName}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="budget"
              name="budget"
              label="Presupuesto en $"
              type="text"
              fullWidth
              variant="outlined"
              sx={{ mt: 3 }}
              autoComplete="off"
              error={!isBudgetValid && formState.budget !== ""}
              helperText={!isBudgetValid && formState.budget !== "" ? "Ingrese un número válido" : ""}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  ),
                },
              }}
              value={formState.budget}
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
                  slotProps={{
                    textField: {
                        error: !dateInitial || !dateInitial.isValid()
                    }
                  }}
                />
                <DatePicker
                  label="Fecha final"
                  format="DD/MM/YYYY"
                  value={dateFinal}
                  onChange={(newValue) => setDateFinal(newValue)}
                  slotProps={{
                    textField: {
                        error: !dateFinal || !dateFinal.isValid()
                    }
                  }}
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
            disabled={!isFormValid}
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
