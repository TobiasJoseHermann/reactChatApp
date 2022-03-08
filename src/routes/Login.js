import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { Box } from '@mui/system'
import { TextField } from '@mui/material'
import { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Typography, Link } from '@mui/material'
import { useNavigate } from 'react-router'

export default function Login(){
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch {
      setError('Failed to login')
      setLoading(false)
    }
  }

  return(
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
    <Typography variant="h2">Log In</Typography>
    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <TextField
        sx={{ mt: 2 }}
        id="email"
        type="email"
        label="email"
        inputRef={emailRef}
      />
      <TextField
        sx={{ mt: 2 }}
        id="password"
        type="password"
        label="password"
        inputRef={passwordRef}
      />
      <Button 
        sx={{ mt: 2 }}
        type="submit" 
        disabled={loading} 
        color="primary"
      >
        Log In
      </Button>

      <Link sx={{ mt: 1, cursor: 'pointer' }} onClick={() => navigate('/resetPassword')}>
        Forgot password?
      </Link>
    </Box>
  )
}