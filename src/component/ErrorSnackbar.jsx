import { Snackbar, Alert } from '@mui/material';

export default function ErrorSnackbar({ open, setOpen, message }) {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
      <Alert severity="error" onClose={() => setOpen(false)} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
