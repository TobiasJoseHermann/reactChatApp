import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react"
import Home from "./routes/Home"
import Login from "./routes/Login"
import PrivateRoute from "./components/PrivateRoute"
import SingUp from "./routes/SingUp"
import NavBar from "./components/NavBar"
import NotFoundPage from "./routes/NotFoundPage"
import Footer from "./components/Footer"
import { AuthProvider } from "./contexts/AuthContext"
import About from "./routes/About"
// eslint-disable-next-line no-unused-vars
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import ResetPassword from "./routes/ResetPassword"
import { ReactQueryDevtools } from "react-query/devtools"
import { useStoreState } from "easy-peasy"

const queryClient = new QueryClient()

export default function App() {
  const isDarkMode = useStoreState(state => state.isDarkMode)

  const darkTheme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  })

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <NavBar />
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reactChatApp"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route path="/signUp" element={<SingUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  )
}
