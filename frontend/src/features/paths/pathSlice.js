import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import pathService from './pathService'

const initialState = {
    paths: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createPath = createAsyncThunk('paths/create', async(pathData, thunkAPI)=>{
    try {
       const token = thunkAPI.getState().auth.user.token
       return await pathService.createPath(pathData, token) 
    } catch (error) {
       const message = (error.reponse && error.reponse.data && error.reponse.data.message) || error.message || error.toString()
       return thunkAPI.rejectWithValue(message)
    }
})

export const getPaths = createAsyncThunk('paths/getAll', async(_, thunkAPI)=>{
    try {
       const token = thunkAPI.getState().auth.user.token
       return await pathService.getPaths(token) 
    } catch (error) {
       const message = (error.reponse && error.reponse.data && error.reponse.data.message) || error.message || error.toString()
       return thunkAPI.rejectWithValue(message)
    }
})

export const deletePath = createAsyncThunk('paths/delete', async(id, thunkAPI)=>{
    try {
       const token = thunkAPI.getState().auth.user.token
       return await pathService.deletePath(id, token) 
    } catch (error) {
       const message = (error.reponse && error.reponse.data && error.reponse.data.message) || error.message || error.toString()
       return thunkAPI.rejectWithValue(message)
    }
})

export const pathSlice = createSlice({
    name: 'path',
    initialState,
    reducers:{
        resetPath: (state) => initialState
    },
    extraReducers:(builder)=>{
        builder
            .addCase(createPath.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(createPath.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.paths.push(action.payload)
            })
            .addCase(createPath.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(getPaths.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(getPaths.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.paths=action.payload
            })
            .addCase(getPaths.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(deletePath.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(deletePath.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.paths = state.paths.filter((path)=> path._id !== action.payload.id)
                
            })
            .addCase(deletePath.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {resetPath} = pathSlice.actions
export default pathSlice.reducer
