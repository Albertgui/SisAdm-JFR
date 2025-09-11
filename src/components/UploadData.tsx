import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DescriptionIcon from '@mui/icons-material/Description';
import { type GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import BillsCarousel from './CarouselComponent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

function UploadData({ rowData }: { rowData: GridRenderCellParams['row'] }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleOpen} color="error">
        <DescriptionIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <BillsCarousel></BillsCarousel>
        </Box>
      </Modal>
    </div>
  );
}

export default UploadData;