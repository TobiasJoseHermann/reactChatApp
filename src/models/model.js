import { action, thunk } from "easy-peasy"
import { db } from "../firebase"
import { query, collection, where, getDocs } from "firebase/firestore"

const { currentUser } = "test"

const model = {
  conversations: [],
  isDarkMode: false,

  // Thunks
  fetchConversations: thunk(async actions => {
    console.log("yaya")
    const q = query(
      collection(db, "conversations"),
      where("participants", "array-contains", currentUser.email)
    )
    const res = await getDocs(q)
    const data = res.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    })
    actions.setConversations(data)
  }),

  // Actions
  setConversations: action((state, conversations) => {
    state.conversations = conversations
  }),

  toggleTheme: action(state => {
    state.isDarkMode = !state.isDarkMode
  }),
}

export default model
