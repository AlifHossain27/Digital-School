import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
    value: ClassworkState;
}

type ClassworkState = {
    classworkID: number;
}

const initialState = {
    value: {    
        classworkID: 0
    } as ClassworkState
} as InitialState

export const classroom = createSlice({
    name: 'classroom',
    initialState,
    reducers: {
        ResetClasswork: () => {
            return initialState
        },
        SetClasswork: (state, action: PayloadAction<number>) => {
            return {
                value: {
                    classworkID: action.payload,
                }
            };
        }
    }
})

export const { SetClasswork, ResetClasswork } = classroom.actions;
export default classroom.reducer;