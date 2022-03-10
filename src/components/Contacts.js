import React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Button from "@mui/material/Button"
import AddConversationDialog from "./AddConversationDialog"
import { doc, getDoc } from "firebase/firestore"
import { useAuth } from "../contexts/AuthContext"
import { db } from "../firebase"
import AddContactDialog from "./AddContactDialog"
import {
  TextField,
  Alert,
  ListItemButton,
  Checkbox,
  Backdrop,
  CircularProgress,
} from "@mui/material"
import { useQuery } from "react-query"

export default function Contacts() {
  const [searchInput, setSearchInput] = React.useState("")
  const { currentUser } = useAuth()

  const [checked, setChecked] = React.useState([])

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const [open, setOpen] = React.useState(false)
  const [openConversationDialog, setOpenConversationDialog] =
    React.useState(false)

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  const {
    isLoading,
    error,
    refetch,
    data: contacts,
  } = useQuery("fetchContacts", async function () {
    const res = await getDoc(doc(db, "users", "a@s.com"))
    console.log("fetchContacs")
    return res.data().contacts
  })

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  const filteredContacts = contacts.filter(contact => {
    if (searchInput === "") {
      return contact
    } else if (contact.toLowerCase().includes(searchInput.toLowerCase())) {
      return contact
    }
    return false
  })
  const contactsElements = filteredContacts.map(contact => {
    return (
      <div key={contact}>
        <ListItem
          alignItems="flex-start"
          secondaryAction={
            <Checkbox
              edge="end"
              onChange={handleToggle(contact)}
              checked={checked.indexOf(contact) !== -1}
            />
          }
        >
          <ListItemButton onClick={() => setChecked([contact])}>
            <ListItemAvatar>
              {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
            </ListItemAvatar>
            <ListItemText primary={contact} />
          </ListItemButton>
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    )
  })

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ m: 1 }}>
        Add Contact
      </Button>
      <Button
        variant="outlined"
        onClick={() => setOpenConversationDialog(true)}
        sx={{ m: 1 }}
      >
        Add Conversation
      </Button>
      <TextField
        placeholder="search contacts..."
        sx={{ mt: 1, mr: 1, ml: 1 }}
        onChange={e => setSearchInput(e.target.value)}
      />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {contactsElements}
      </List>
      <AddContactDialog
        open={open}
        onClose={handleClose}
        handleClose={handleClose}
        currentUserEmail={currentUser.email}
        refetch={refetch}
      />
      <AddConversationDialog
        open={openConversationDialog}
        setOpenConversationDialog={setOpenConversationDialog}
        selectedContacts={[...checked, currentUser.email]}
      />
    </>
  )
}
