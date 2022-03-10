import {
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  Dialog,
  DialogTitle,
  TextField,
} from "@mui/material"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { useRef } from "react"
import { db } from "../firebase"

export default function AddContactDialog({
  refetch,
  open,
  handleClose,
  currentUserEmail,
}) {
  const emailRef = useRef("")

  async function handleSubmit() {
    console.log(emailRef.current.value)
    await updateDoc(doc(db, "users", currentUserEmail), {
      contacts: arrayUnion(emailRef.current.value),
    })
    refetch()
    handleClose()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add Contact</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a contact, please enter his email address
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          inputRef={emailRef}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Contact</Button>
      </DialogActions>
    </Dialog>
  )
}
