import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Slide } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { TransitionProps } from "@mui/material/transitions";
import type { GridRenderCellParams } from "@mui/x-data-grid";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface FormValues {
  id: string;
  fullname: string;
  idProject: number;
  projectName: string;
  budget: number;
  initialDate: string;
  finalDate: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormDialog({ rowData }: { rowData: GridRenderCellParams['row'] }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    console.log(rowData)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;
    console.log(email);
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
        <DialogTitle>Información</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="fullname"
              name="fullname"
              label="Nombre completo"
              type="text"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
