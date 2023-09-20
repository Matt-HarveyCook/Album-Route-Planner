import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

// Gets the user id from the client local storage
const user = JSON.parse(localStorage.getItem('user'))

// Pulls out the default values for the slice
const initialState = {
    user: user ? user:null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Used to call the register function from authService.js while wrapping in a try catch
export const register = createAsyncThunk('auth/register', async(user, thunkAPI)=>{
    try {
       return await authService.register(user) 
    } catch (error) {
       // Finds and returns the error message
       const message = (error.reponse && error.reponse.data && error.reponse.data.message) || error.message || error.toString()
       return thunkAPI.rejectWithValue(message)
    }
})

// Wraps a call to the login function within a try catch
export const login = createAsyncThunk('auth/login', async(user, thunkAPI)=>{
    try {
       return await authService.login(user) 
    } catch (error) {
       const message = (error.reponse && error.reponse.data && error.reponse.data.message) || error.message || error.toString()
       return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout',
    async()=>{
        await authService.logout()
    }
)



// An object which combines state and reducers for authorisation of the user
export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset: (state)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    // Based on the outcome of the register function, it updates the according states
    extraReducers: (builder)=>{
        builder 
            .addCase(register.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
             .addCase(login.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) =>{
                state.user = null
            })

    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer

