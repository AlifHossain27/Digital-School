import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
    value: AuthState;
}

type AuthState = {
    isAuthenticated: boolean;
    userType: string;
}

const initialState = {
    value: {
        isAuthenticated: false,
        userType: ""
    } as AuthState
} as InitialState

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: () => {
            return initialState
        },
        logIn: (state, action: PayloadAction<string>) => {
            return {
                value: {
                    isAuthenticated: true,
                    userType: action.payload,
                }
            };
        }
    }
})

export const { logIn, logOut } = auth.actions;
export default auth.reducer;