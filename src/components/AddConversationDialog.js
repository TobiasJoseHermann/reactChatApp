import {
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material"
import { addDoc, collection } from "firebase/firestore"
import { useRef } from "react"
import { db } from "../firebase"

export default function AddConversationDialog({
  open,
  selectedContacts,
  setOpenConversationDialog,
}) {
  const nameRef = useRef("")

  async function handleSubmit() {
    addConversation()
    setOpenConversationDialog(false)
  }
  async function addConversation() {
    await addDoc(collection(db, "conversations"), {
      name: nameRef.current.value,
      participants: selectedContacts,
      messages: [],
    })
  }

  const selectedContactsElements = selectedContacts.map(contact => (
    <Typography key={contact}>{contact}</Typography>
  ))

  return (
    <Dialog onClose={() => setOpenConversationDialog(false)} open={open}>
      <DialogTitle>Add Conversation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the name of the conversation
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Conversation Name"
          type="email"
          fullWidth
          variant="standard"
          inputRef={nameRef}
        />
        <Typography variant="h6">
          Contacts that will be in the conversation:
        </Typography>
        {selectedContactsElements}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenConversationDialog(false)}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Contact</Button>
      </DialogActions>
    </Dialog>
  )
}
