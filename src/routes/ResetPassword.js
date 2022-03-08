import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { Box } from '@mui/system'
import { TextField } from '@mui/material'
import { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Typography } from '@mui/material'

export default function Login(){
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for more instructions')
    } catch {
      setError('Failed to reset password')
    }

    setLoading(false)
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
    <Typography variant="h2">Password Reset</Typography>
    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      <TextField
        sx={{ mt: 2 }}
        id="email"
        type="email"
        label="email"
        inputRef={emailRef}
      />
      <Button 
        sx={{ mt: 2 }}
        type="submit" 
        disabled={loading} 
        color="primary"
      >
        Reset password
      </Button>
    </Box>
  )
}