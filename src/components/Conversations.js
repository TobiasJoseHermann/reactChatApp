import React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import { TextField, Typography, ListItemButton } from "@mui/material"
import userDefaultAvatar from "../images/userDefaultAvatar.png"

// TODO: add delete contact and leave conversation

export default function Conversations({
  conversationID,
  setConversationID,
  conversations,
}) {
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
      const participant = participants[i].name

      if (i > 2) {
        participantsString += "..."
        break
      }

      participantsString = participantsString.concat(participant, ", ")
    }
    participantsString = participantsString.substring(
      0,
      participantsString.length - 2
    )

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
        sx={{ mt: 2, mr: 1, ml: 1 }}
        onChange={e => setSearchInput(e.target.value)}
      />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {conversationsElements}
      </List>
    </>
  )
}
