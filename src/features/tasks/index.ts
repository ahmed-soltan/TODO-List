import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './store'
const store = configureStore({
  reducer: {
    reducer:taskReducer
  },
})
export type RootState = ReturnType<typeof store.getState>

export default store