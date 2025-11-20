import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import { Alert, InputAdornment, Slide, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { TransitionProps } from "@mui/material/transitions";
import type { PersonData } from "../interface/interface";
import { postInfoPerson } from "../utils/apiPerson";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
    ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const initialFormState: PersonData = {
    nombre: '',
    cedula: ''
};

export default function CreatePerson( ) {
    const [open, setOpen] = React.useState(false);
    const [formState, setFormState] = React.useState<PersonData>(initialFormState);
    const [alertState, setAlertState] = React.useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setFormState(initialFormState);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const finalData: PersonData = {
            nombre: formState.nombre.trim(),
            cedula: formState.cedula.trim(),
        };
        try {
            await postInfoPerson(finalData);
            setAlertState({
                open: true,
                message: `Persona ${finalData.nombre} creada con éxito`,
                severity: 'success',
            });
            handleClose();
        } catch (error) {
            console.error("Fallo al crear la persona:", error);
            const errorMessage = (error instanceof Error) ? error.message : 'Error desconocido al crear persona';
            setAlertState({
                open: true,
                message: errorMessage,
                severity: 'error',
            });
        }
    };

    const handleAlertClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
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
                Agregar encargados
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
                <DialogTitle>Editar información</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} id="subscription-form">
                        <TextField
                        autoFocus
                        margin="dense"
                        id="nombre"
                        name="nombre"
                        label="Nombre completo"
                        type="text"
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 3 }}
                        autoComplete="off"
                        slotProps={{
                            input: {
                                startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                                ),
                            },
                        }}
                        value={formState.nombre}
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
                            autoComplete="off"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <BadgeIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            value={formState.cedula}
                            onChange={handleChange}
                        />
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
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={handleAlertClose}
                severity={alertState.severity}
                sx={{ width: '100%' }}
            >
                {alertState.message}
            </Alert>
        </Snackbar>
        </React.Fragment>
    );
}
