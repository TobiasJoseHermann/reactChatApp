import { useState } from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import CssBaseline from "@mui/material/CssBaseline"
import Toolbar from "@mui/material/Toolbar"
import Divider from "@mui/material/Divider"
import Contacts from "../components/Contacts"
import {
  Link,
  Avatar,
  AppBar,
  Typography,
  Tab,
  CircularProgress,
  Backdrop,
  Tabs,
  Switch,
  Alert,
  Button,
} from "@mui/material"
import { useAuth } from "../contexts/AuthContext"
import { useStoreState, useStoreActions } from "easy-peasy"
import Conversation from "../components/Conversation"
import Conversations from "../components/Conversations"
import { useNavigate } from "react-router-dom"
import { useQuery } from "react-query"
import { getDocs, query, collection, where } from "firebase/firestore"
import { db } from "../firebase"

const drawerWidth = 360

export default function Home() {
  const { currentUser, logout } = useAuth()
  const [selectedTab, setSelectedTab] = useState(0)
  const [conversationID, setConversationID] = useState("")
  const [selectedContact, setSelectedContact] = useState()
  const isDarkMode = useStoreState(state => state.isDarkMode)
  const toggleTheme = useStoreActions(actions => actions.toggleTheme)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  function handleTabChange(e, value) {
    setSelectedTab(value)
  }

  async function handleLogout() {
    setError("")

    try {
      await logout()
      navigate("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  const {
    data: conversations,
    error: fetchError,
    isLoading,
  } = useQuery("fetchConversations", async function fetchConversations() {
    const q = query(
      collection(db, "conversations"),
      where("participants", "array-contains", currentUser.email)
    )
    const res = await getDocs(q)
    const data = res.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    })
    console.log("fetch conversations")
    return data
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

  if (fetchError) {
    return (
      <Box>
        <Alert severity="error">{fetchError.message}</Alert>
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          mb: 4,
        }}
      >
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }} />
          <Typography sx={{ ml: 1 }}>
            Switch to {isDarkMode ? "light" : "dark"} theme:
          </Typography>
          <Switch onChange={toggleTheme} color="default" />
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
          <Link
            onClick={() => navigate("/about")}
            sx={{ cursor: "pointer", ml: 1 }}
            color="inherit"
          >
            About
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Avatar
            sx={{ ml: 1 }}
            alt={currentUser.email}
            src="/static/images/avatar/1.jpg"
          />
          <Typography sx={{ ml: 2 }}>{currentUser.email}</Typography>
        </Toolbar>
        <Divider />
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="Conversations" />
          <Tab label="Contacts" />
        </Tabs>
        {selectedTab === 0 ? (
          <Conversations
            conversationID={conversationID}
            setConversationID={setConversationID}
            conversations={conversations}
          />
        ) : (
          <Contacts
            selectedContact={selectedContact}
            changeSelectedContact={setSelectedContact}
          />
        )}
      </Drawer>
      <Conversation
        conversationID={conversationID}
        conversations={conversations}
        currentUser={currentUser}
      />
    </Box>
  )
}
