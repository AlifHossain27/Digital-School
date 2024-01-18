import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
    value: ClassroomState;
}

type ClassroomState = {
    classroomID: string;
}

const initialState = {
    value: {    
        classroomID: ""
    } as ClassroomState
} as InitialState

export const classroom = createSlice({
    name: 'classroom',
    initialState,
    reducers: {
        ResetClassroom: () => {
            return initialState
        },
        SetClassroom: (state, action: PayloadAction<string>) => {
            return {
                value: {
                    classroomID: action.payload,
                }
            };
        }
    }
})

export const { SetClassroom, ResetClassroom } = classroom.actions;
export default classroom.reducer;