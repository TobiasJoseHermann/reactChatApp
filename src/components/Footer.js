import React from "react"
import { Link, Container } from "@mui/material"
import { useNavigate, useLocation } from "react-router"

export default function Footer() {
  const navigate = useNavigate()

  const location = useLocation()
  if (
    location.pathname === "/" ||
    location.pathname === "/about" ||
    location.pathname === "/reactChatApp" ||
    location.pathname === "/reactChatApp/"
  )
    return null

  return (
    <Container sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
      <Link onClick={() => navigate("/about")} sx={{ cursor: "pointer" }}>
        About
      </Link>
    </Container>
  )
}
