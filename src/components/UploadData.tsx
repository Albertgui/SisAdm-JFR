import { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { type GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function UploadData({ rowData }: { rowData: GridRenderCellParams['row'] }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleOpen} color="error">
        <FileUploadIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Detalles de la fila
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ID: {rowData.id}
            <br />
            Nombre: {rowData.firstName}
            <br />
            Apellido: {rowData.lastName}
          </Typography>
          <Button onClick={handleClose}>Cerrar</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default UploadData;