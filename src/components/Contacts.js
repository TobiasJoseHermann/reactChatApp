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
  Avatar,
  Backdrop,
  CircularProgress,
  ButtonGroup,
} from "@mui/material"
import { useQuery } from "react-query"
import userDefaultAvatar from "../images/userDefaultAvatar.png"

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
    const res = await getDoc(doc(db, "users", currentUser.email))
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
    return <Alert severity="error">{error.message}</Alert>
  }

  const filteredContacts = contacts.filter(contact => {
    if (searchInput === "") {
      return contact
    } else if (contact.name.toLowerCase().includes(searchInput.toLowerCase())) {
      return contact
    }
    return false
  })
  const contactsElements = filteredContacts.map(contact => {
    return (
      <div key={contact.email}>
        <ListItem
          alignItems="flex-start"
          secondaryAction={
            <Checkbox
              edge="end"
              onChange={handleToggle(contact.email)}
              checked={checked.indexOf(contact.email) !== -1}
            />
          }
        >
          <ListItemButton onClick={() => setChecked([contact.email])}>
            <ListItemAvatar>
              <Avatar src={contact.avatar} alt={contact.name}>
                <Avatar src={userDefaultAvatar} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={contact.name} secondary={contact.email} />
          </ListItemButton>
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    )
  })

  return (
    <>
      <ButtonGroup variant="contained" sx={{ m: 1, alignSelf: "center" }}>
        <Button onClick={handleClickOpen}>Add Contact</Button>
        <Button onClick={() => setOpenConversationDialog(true)}>
          Add Conversation
        </Button>
      </ButtonGroup>
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
