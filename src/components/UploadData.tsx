import { useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Snackbar,
} from "@mui/material";
import type { ActionsProps } from "../interface/interface";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import type { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function UploadData({ rowData }: ActionsProps) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [alertState, setAlertState] = React.useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleOpen = () => {
    setOpen(true);
    console.log(rowData);
  };

  const handleClose = () => {
    setOpen(false);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    setSelectedFile(null);
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError("El archivo excede el límite de 10MB");
        event.target.value = "";
        return;
      }
      setSelectedFile(file);
    }
  };

  return (
    <>
      <IconButton aria-label="delete" onClick={handleOpen} color="error">
        <DescriptionIcon />
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
        <DialogTitle>Subir factura</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2}}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                color={fileError ? "error" : "primary"}
                sx={{ fontWeight: "bold" }}
              >
                {selectedFile
                  ? "Cambiar Archivo"
                  : "Seleccionar Archivo (Máx 10MB)"}
              </Button>
            </label>
          </Box>
          <Box sx={{ mt: 2 }}>
            {selectedFile && (
              <Alert severity="success">
                Archivo seleccionado: **{selectedFile.name}** (
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </Alert>
            )}
            {fileError && <Alert severity="error">{fileError}</Alert>}
          </Box>
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
        autoHideDuration={3000}
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
    </>
  );
}

export default UploadData;
