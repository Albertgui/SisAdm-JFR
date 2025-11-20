import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, InputAdornment, Slide } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { TransitionProps } from "@mui/material/transitions";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import customParseFormat from "dayjs/plugin/customParseFormat";

interface FormValues {
  id: string;
  fullname: string;
  idProject: number;
  projectName: string;
  budget: number;
  initialDate: string;
  finalDate: string;
}

dayjs.extend(customParseFormat);
type DateStateType = Dayjs | null;
const parseDate = (dateString: string): DateStateType => {
  const date = dayjs(dateString, ['D/M/YYYY', 'DD/M/YYYY', 'D/MM/YYYY', 'DD/MM/YYYY', 'D/M/YYYY']);
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

export default function Actions({ rowData }: { rowData: GridRenderCellParams["row"] }) {
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = React.useState({
    fullname: rowData.fullname,
    idProject: rowData.idProject.toString(),
    projectName: rowData.projectName,
    budget: rowData.budget.toString(),
  });
  const [dateInitial, setDateInitial] = React.useState<DateStateType>(parseDate(rowData.initialDate));
  const [dateFinal, setDateFinal] = React.useState<DateStateType>(parseDate(rowData.finalDate));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formattedInitialDate = dateInitial ? dateInitial.format("DD/MM/YYYY") : "";
    const formattedFinalDate = dateFinal ? dateFinal.format("DD/MM/YYYY") : "";
    const finalData: FormValues = {
        id: rowData.id,
        fullname: formState.fullname,
        idProject: parseInt(formState.idProject),
        projectName: formState.projectName,
        budget: parseFloat(formState.budget),
        initialDate: formattedInitialDate,
        finalDate: formattedFinalDate,
    };
    console.log(finalData);
    handleClose();
  };

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
            <TextField
              autoFocus
              margin="dense"
              id="fullname"
              name="fullname"
              label="Nombre completo"
              type="text"
              fullWidth
              variant="outlined"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                },
              }}
              value={formState.fullname}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="cedula"
              name="cedula"
              label="Cédula"
              type="text"
              fullWidth
              variant="outlined"
              sx={{ mt: 3 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                },
              }}
              value={formState.idProject}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="titleProject"
              name="titleProject"
              label="Título del proyecto"
              type="text"
              fullWidth
              variant="outlined"
              sx={{ mt: 3 }}
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
        <DialogActions sx={{ justifyContent: 'space-between', m: 2 }}>
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
    </React.Fragment>
  );
}
