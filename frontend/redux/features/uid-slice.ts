import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
    value: UidState;
}

type UidState = {
    userID: string;
}

const initialState = {
    value: {    
        userID: ""
    } as UidState
} as InitialState

export const uid = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        ResetUID: () => {
            return initialState
        },
        SetUID: (state, action: PayloadAction<string>) => {
            return {
                value: {
                    userID: action.payload,
                }
            };
        }
    }
})

export const { SetUID, ResetUID } = uid.actions;
export default uid.reducer;