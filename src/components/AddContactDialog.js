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
  const nameRef = useRef("")

  async function handleSubmit() {
    await updateDoc(doc(db, "users", currentUserEmail), {
      contacts: arrayUnion({
        email: emailRef.current.value,
        name: nameRef.current.value,
      }),
    })
    refetch()
    handleClose()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add Contact</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a contact, please enter his email address and the name of the
          contact
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
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Contact name"
          type="name"
          fullWidth
          variant="standard"
          inputRef={nameRef}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Contact</Button>
      </DialogActions>
    </Dialog>
  )
}
