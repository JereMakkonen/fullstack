import {  Snackbar, Alert } from "@mui/material";

interface Props {
  message: string | null 
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const Notification = ({message, setMessage}: Props) => (
  <Snackbar
    open={message !== null}
    autoHideDuration={5000}
    onClose={() => setMessage(null)}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  >
    <Alert severity="error" onClose={() => setMessage(null)}>
      {message}
    </Alert>
  </Snackbar>
);

export default Notification;

