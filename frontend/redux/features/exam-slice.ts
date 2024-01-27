import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
    value: ExamState;
}

type ExamState = {
    examID: number;
}

const initialState = {
    value: {    
        examID: 0
    } as ExamState
} as InitialState

export const exam = createSlice({
    name: 'exam',
    initialState,
    reducers: {
        ResetExam: () => {
            return initialState
        },
        SetExam: (state, action: PayloadAction<number>) => {
            return {
                value: {
                    examID: action.payload,
                }
            };
        }
    }
})

export const { SetExam, ResetExam } = exam.actions;
export default exam.reducer;