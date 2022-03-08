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
import { ListItemButton, Checkbox } from "@mui/material"

// TODO: add search bar

export default function Contacts() {
  const [contacts, setContacts] = React.useState([])
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
  const [added, setAdded] = React.useState(false)
  const [openConversationDialog, setOpenConversationDialog] =
    React.useState(false)

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose(wasAdded) {
    wasAdded && setAdded(prevAdded => !prevAdded)
    setOpen(false)
  }

  React.useEffect(() => {
    async function fetchContacts() {
      const res = await getDoc(doc(db, "users", currentUser.email))
      const data = res.data().contacts
      setContacts(data)
      console.log("fetch")
    }

    fetchContacts()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [added])

  const contactsElements = contacts.map(contact => {
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
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {contactsElements}
      </List>
      <AddContactDialog
        open={open}
        onClose={handleClose}
        handleClose={handleClose}
        currentUserEmail={currentUser.email}
      />
      <AddConversationDialog
        open={openConversationDialog}
        setOpenConversationDialog={setOpenConversationDialog}
        selectedContacts={[...checked, currentUser.email]}
      />
    </>
  )
}
