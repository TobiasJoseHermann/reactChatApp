import React from "react"
import { useTheme } from "@mui/material/styles"
import { Card, Box, Typography } from "@mui/material"
import { DoneAll } from "@mui/icons-material"
import { useAuth } from "../contexts/AuthContext"

export default function Message({ message }) {
  const { currentUser } = useAuth()
  const isFromUser = message.from === currentUser.email
  const messageDate = new Date(message.createdAt).toLocaleString()

  const theme = useTheme()
  let color = ""
  if (isFromUser) {
    color = theme.palette.mode === "dark" ? "#005c4b" : "#d9fdd3"
  }

  return (
    <Card
      sx={{
        backgroundColor: color,
        maxWidth: 500,
        alignSelf: isFromUser ? "flex-end" : "flex-start",
        borderRadius: 6,
        p: 1,
        pl: 2,
        pr: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!isFromUser && (
        <Typography sx={{ fontSize: 14 }}>{message.from}</Typography>
      )}
      <Typography variant="p" component="p" sx={{ mb: 0, fontSize: 16 }}>
        {message.text}
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isFromUser ? "flex-end" : "flex-start",
        }}
      >
        <Typography variant="p" component="p" sx={{ mb: 0, fontSize: 14 }}>
          {messageDate}
        </Typography>
      </div>
    </Card>
  )
}
