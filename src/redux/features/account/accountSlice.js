import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import services from "../../../services"

const initialState = {
    account: {
        info: "",
        isLogin: false,
    },
    EM: "",
    EC: 1,
    isLoading: false,
    isError: false,
    isSuccess: false,
}

export const login = createAsyncThunk(
    "account/loginStatus",
    async (userData) => {
        const response = await services.loginReq({ ...userData })
        return response
    }
)

export const sendJwt = createAsyncThunk("account/sendJwt", async (userData) => {
    const response = await services.sendJwtReq()
    return response
})

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false

            return state
        },
        logout: (state) => {
            document.cookie =
                "jwt" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"

            state.account = initialState.account
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(login.pending, (state, action) => {
                // Add user to the state array
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload && action.payload.EC === 0) {
                    state.isError = false
                    state.account = {
                        info: { ...action.payload.DT },
                        isLogin: true,
                    }
                    state.isSuccess = true
                    state.isError = false
                } else {
                    state.isSuccess = false
                    state.isError = true
                }
            })
            .addCase(login.rejected, (state, action) => {
                // Add user to the state array
                state.isSuccess = false
                state.isLoading = false
                state.isError = true
            })

            .addCase(sendJwt.pending, (state, action) => {
                // Add user to the state array
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(sendJwt.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload && action.payload.EC === 0) {
                    state.isError = false
                    state.account = {
                        info: { ...action.payload.DT },
                        isLogin: true,
                    }
                    state.isSuccess = true
                    state.isError = false
                } else {
                    state.isSuccess = false
                    state.isError = true
                }
            })
            .addCase(sendJwt.rejected, (state, action) => {
                // Add user to the state array
                state.isSuccess = false
                state.isLoading = false
                state.isError = true
            })
    },
})

// Action creators are generated for each case reducer function
export const { clearState, logout } = accountSlice.actions

export default accountSlice.reducer