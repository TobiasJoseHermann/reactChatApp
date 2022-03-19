import { useRef, useState, useEffect } from "react"
import {
  IconButton,
  Box,
  Stack,
  AppBar,
  Toolbar,
  InputBase,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { alpha, styled } from "@mui/material/styles"
import { db } from "../firebase"
import { doc, updateDoc, arrayUnion } from "firebase/firestore"
import Message from "../components/Message"

const drawerWidth = 360

export default function Conversation({
  conversationID,
  currentUser,
  conversations,
  contacts,
}) {
  const [messages, setMessages] = useState([])
  const textRef = useRef("")

  useEffect(() => {
    for (let i = 0; i < conversations.length; i++) {
      if (conversations[i].id === conversationID) {
        const messages = conversations[i].messages.map(message => {
          return {
            ...message,
            name: conversations[i].participants.find(
              participant => participant.email === message.from
            ).name,
          }
        })
        setMessages(messages)
        break
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationID, contacts])

  async function handleSumbit() {
    const message = {
      createdAt: new Date().getTime(),
      from: currentUser.email,
      text: textRef.current.value,
    }

    await updateDoc(doc(db, "conversations", conversationID), {
      messages: arrayUnion(message),
    })

    setMessages(prevMessages => [...prevMessages, message])
    textRef.current.value = ""
  }

  const messagesElements = messages.map(message => (
    <Message message={message} key={message.createdAt} />
  ))

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 0, mt: 7 }}
    >
      {/* <Box sx={{ p: 3 }}> */}
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ m: 2 }}
      >
        {/* <Toolbar /> */}
        {messagesElements}
      </Stack>
      {/* </Box> */}
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          top: "auto",
          bottom: 0,
          p: 1,
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <BootstrapInput
            multiline
            sx={{ flexGrow: 1, mr: 2 }}
            placeholder="Enter message here"
            inputRef={textRef}
          />
          <IconButton color="inherit" onClick={handleSumbit}>
            <SendIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))
