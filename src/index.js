import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { createStore, StoreProvider } from "easy-peasy"
import model from "./models/model"

const store = createStore(model)

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
