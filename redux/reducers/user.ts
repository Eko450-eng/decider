import { Profile } from '@prisma/client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import jwt from 'jsonwebtoken'

export const user = createSlice({
  name: "userReducer",
  initialState: {
    email: "",
    id: 0,
    username: "",
    role: 0,
  },
  reducers: {
    login: (state, actions: PayloadAction<Profile>) => {
      state.id = actions.payload.id!
      state.username = actions.payload.username!
      state.email = actions.payload.email!
      state.role = actions.payload.role!
    },
    loginWithToken: (state, actions: PayloadAction<string>) => {
      const { loggedIn, email, id, username, role } = jwt.decode(actions.payload) as any
      state.id = id
      state.username = username
      state.email = email
      state.role = role
    },
    logout: (state) => {
      state.email = ""
      state.id = 0
      state.username = ""
      state.role = 0
    }
  }
})

export const { login, loginWithToken, logout } = user.actions
export type UserState = {
  email: string,
  id: number,
  username: string,
  role: number,
}
export default user.reducer
