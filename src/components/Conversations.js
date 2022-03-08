import React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import { getDocs, query, collection, where } from "firebase/firestore"
import { useAuth } from "../contexts/AuthContext"
import { db } from "../firebase"
import { Typography, ListItemButton } from "@mui/material"

// TODO: add search bar

export default function Conversations({ conversationID, setConversationID }) {
  const [conversations, setConversations] = React.useState([])
  const { currentUser } = useAuth()

  React.useEffect(() => {
    async function fetchConversations() {
      const q = query(
        collection(db, "conversations"),
        where("participants", "array-contains", currentUser.email)
      )
      const res = await getDocs(q)
      const data = res.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
      console.log("fetch")
      setConversations(data)
    }

    fetchConversations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const conversationsElements = conversations.map(conversation => {
    let participantsString = ""
    const participants = conversation.participants
    participants.forEach(participant => {
      console.log(participant)
      participantsString.concat(" ", participant)
    })

    return (
      <div key={conversation.id}>
        <ListItem alignItems="flex-start">
          <ListItemButton
            onClick={() => setConversationID(conversation.id)}
            selected={conversationID === conversation.id}
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={
                conversation.name
                  ? conversation.name
                  : conversation.participants[0]
              }
              // TODO: Fix
              secondary={<Typography>{participantsString}</Typography>}
            />
          </ListItemButton>
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    )
  })

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {conversationsElements}
    </List>
  )
}
