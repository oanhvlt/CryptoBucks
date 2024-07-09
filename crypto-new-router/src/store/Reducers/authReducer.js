import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const admin_login = createAsyncThunk(
	'auth/admin_login',
	async (info, { rejectWithValue, fulfillWithValue }) => {
		//console.log(info)
		try {
			const { data } = await api.post('/admin-login', info, { withCredentials: true })
			//console.log(data)
			localStorage.setItem('accessToken', data.token)
			return fulfillWithValue(data)
		} catch (error) {
			console.log(error.response.data)
			return rejectWithValue(error.response.data)
		}
	}
)

// const returnRole = (token) => {
// 	if (token) {
// 		 const decodeToken = jwtDecode(token)
// 		 const expireTime = new Date(decodeToken.exp * 1000)
// 		 if (new Date() > expireTime) {
// 			 localStorage.removeItem('accessToken')
// 			 return ''
// 		 } else {
// 					return decodeToken.role
// 		 }

// 	} else {
// 			return ''
// 	}
// }

const authReducer = createSlice({
	name: 'auth',
	initialState: {
		successMessage: '',
		errorMessage: '',
		loader: false,
		userInfo: '',
		//role: returnRole(localStorage.getItem('accessToken')),
		token: localStorage.getItem('accessToken')
	},
	reducers: {
		messageClear: (state, _) => {
			state.errorMessage = ""
			//state.successMessage = ""
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(admin_login.pending, (state, { payload }) => {
				state.loader = true
			})
			.addCase(admin_login.rejected, (state, { payload }) => {
				state.loader = false;
				state.errorMessage = payload.error //BE return
			})
			.addCase(admin_login.fulfilled, (state, { payload }) => {
				state.loader = false;
				state.successMessage = payload.message
				state.token = payload.token
				//state.role = returnRole(payload.token)
			})
	}
});

export const { messageClear } = authReducer.actions
export default authReducer.reducer;