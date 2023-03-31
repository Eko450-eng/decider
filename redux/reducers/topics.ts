import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ITopics {
  topic: string
  subscribed: boolean
}

export const topics = createSlice({
  name: "topicsReducer",
  initialState: {
    topics: [""]
  },
  reducers: {
    changeSubscritpion: (state, actions: PayloadAction<ITopics>) => {
      if (actions.payload.subscribed) {
        state.topics.push(actions.payload.topic)
        state.topics = state.topics.filter(v => {
          return v !== ""
        })
      } else {
        state.topics = state.topics.filter((v) => {
          return v !== actions.payload.topic
        })
      }
    }
  }
})

export const { changeSubscritpion } = topics.actions
export default topics.reducer
