import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user'
import topicsReducer from './reducers/topics'

export const store = configureStore({
  reducer: {
    user: userReducer,
    topics: topicsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
