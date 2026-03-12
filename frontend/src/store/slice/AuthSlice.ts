import { createSlice } from '@reduxjs/toolkit';
interface UserInfoInterface {
    email: string;
    name: string;
    phone: string;
    role: 'admin' | 'user';
}

interface AuthState {
    userInfo: UserInfoInterface | null;
    userToken: string | null;
}

const initialState: AuthState = {
    userInfo: null,
    userToken: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.userInfo = payload.data;
            state.userToken = payload.token;
        },
        logout: (state) => {
            state.userInfo = null;
            state.userToken = null;
        },
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;