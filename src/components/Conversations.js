import React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import { useAuth } from "../contexts/AuthContext"
import { TextField, Typography, ListItemButton } from "@mui/material"
import userDefaultAvatar from "../images/userDefaultAvatar.png"
import { useStoreActions } from "easy-peasy"

// TODO: add delete contact and conversation

export default function Conversations({
  conversationID,
  setConversationID,
  conversations,
}) {
  const { currentUser } = useAuth()
  const [searchInput, setSearchInput] = React.useState("")

  const filteredConversations = conversations.filter(conversation => {
    if (searchInput === "") {
      return conversation
    } else if (
      conversation.name.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      return conversation
    }
    return false
  })
  const conversationsElements = filteredConversations.map(conversation => {
    let participantsString = "Participants: "
    const participants = conversation.participants
    for (let i = 0; i < participants.length; i++) {
      const participant = participants[i]

      if (i > 2) {
        participantsString += "..."
        break
      }

      participantsString = participantsString.concat(participant, ", ")
    }

    return (
      <div key={conversation.id}>
        <ListItem alignItems="flex-start">
          <ListItemButton
            onClick={() => setConversationID(conversation.id)}
            selected={conversationID === conversation.id}
          >
            <ListItemAvatar>
              <Avatar src={conversation.avatar} alt={conversation.name}>
                <Avatar src={userDefaultAvatar} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                conversation.name
                  ? conversation.name
                  : conversation.participants[0]
              }
              secondary={<Typography>{participantsString}</Typography>}
            />
          </ListItemButton>
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    )
  })

  return (
    <>
      <TextField
        placeholder="search conversations..."
        sx={{ mt: 1, mr: 1, ml: 1 }}
        onChange={e => setSearchInput(e.target.value)}
      />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {conversationsElements}
      </List>
    </>
  )
}
