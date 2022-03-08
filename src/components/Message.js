import React from "react"
import { useTheme } from "@mui/material/styles"
import { Card, Typography } from "@mui/material"
import { DoneAll } from "@mui/icons-material"
import { useAuth } from "../contexts/AuthContext"

export default function Message({ message }) {
  const { currentUser } = useAuth()
  const isFromUser = message.from === currentUser.email

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
      }}
    >
      <Typography variant="p" component="p" sx={{ mb: 0 }}>
        {message.text}
      </Typography>
      <DoneAll fontSize="small" sx={{ alignSelf: "flex-end" }} />
    </Card>
  )
}
