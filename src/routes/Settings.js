import { Container, Button, Input, LinearProgress } from "@mui/material"
import { useRef, useState } from "react"
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"
import { storage } from "../firebase"
import { useAuth } from "../contexts/AuthContext"

export default function Settings() {
  const [progress, setProgress] = useState(0)
  const { currentUser } = useAuth()
  const [file, setFile] = useState()

  function handleChange(e) {
    // const file = e.target.files[0]
    // handleSubmit(file)
    setFile(e.target.files[0])
  }

  function handleSubmit() {
    console.log("yaya")
    if (!file) return
    const storageRef = ref(
      storage,
      `/users/${currentUser.email}/profilePicture.jpg`
    )

    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      snapshot => {
        const auxProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(auxProgress)
      },
      // TODO: show error on screen
      err => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL =>
          console.log(downloadURL)
        )
      }
    )
    setProgress(0)
  }

  return (
    <Container>
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleChange}
          sx={{ display: "none" }}
        />
        <Button variant="contained" component="span">
          Change profile picture
        </Button>
      </label>
      <Button variant="contained" component="span" onClick={handleSubmit}>
        Upload
      </Button>
      {file && <img src={URL.createObjectURL(file)} alt="tobi" />}
      {progress && <LinearProgress variant="determinate" value={progress} />}
    </Container>
  )
}
