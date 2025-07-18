import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    user: null,
};
const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SetUser(state, action) {
            state.user = action.payload
        },
        removeUser(state) {
            state.user = null;
        }
    }
})

export const { SetUser, removeUser } = AuthSlice.actions
export default AuthSlice.reducer