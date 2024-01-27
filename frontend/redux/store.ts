import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth-slice'
import uidReducer from './features/uid-slice'
import classroomReducer from './features/classroom-slice'
import classworkReducer from './features/classwork-slice'
import examReducer from './features/exam-slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'



export const store = configureStore({
  reducer: {
    authReducer,
    uidReducer,
    classroomReducer,
    classworkReducer,
    examReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector