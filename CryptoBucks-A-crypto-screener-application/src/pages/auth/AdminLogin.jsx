// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'
// import { BeatLoader } from 'react-spinners';
// import toast from 'react-hot-toast';
// import { useDispatch, useSelector } from 'react-redux';
// import { admin_login, messageClear } from '../../store/Reducers/authReducer';
// import { overrideStyle } from '../../utils/utils';

const AdminLogin = () => {

	// const navigate = useNavigate()

	// const [state, setState] = useState({
	// 	email: "",
	// 	password: ""
	// })

	// const dispatch = useDispatch()
	// const { successMessage, errorMessage, loader } = useSelector(state => state.auth)

	// const inputHandle = (e) => {
	// 	setState({
	// 		...state,
	// 		[e.target.name]: e.target.value
	// 	})
	// }
	// const submit = (e) => {
	// 	e.preventDefault()
	// 	//console.log(state)
	// 	dispatch(admin_login(state))
	// }

	// useEffect(() => {
	// 	if (errorMessage) {
	// 		toast.error(errorMessage)
	// 		dispatch(messageClear())
	// 	}
	// 	if (successMessage) {
	// 		toast.success(successMessage)
	// 		dispatch(messageClear())
	// 		navigate('/')
	// 	}
	// }, [errorMessage, successMessage])

	return (
		<div className='min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center' >
			<div className='w-[350px] text-[#ffffff] p-2'>
				<div className='bg-[#6f68d1] p-4 rounded-md'>
					<div className='h-[70px] flex justify-center items-center'>
						<div className='w-[180px] h-[50px] text-center text-lg'>
							Login
						</div>
					</div>
					<form
					//onSubmit={submit}
					>
						<div className='flex flex-col w-full gap-1 mb-3'>
							<label htmlFor="email">Email</label>
							<input
								//value={state.email}
								//onChange={inputHandle}
								className='px-3 py-2 outline-none border border-slate-400 bg-[#FAFBFC] text-gray-700 rounded-md'
								type="email" name='email' placeholder='Email' id='email' required />
						</div>
						<div className='flex flex-col w-full gap-1 mb-3'>
							<label htmlFor="password">Password</label>
							<input
								//value={state.password}
								//onChange={inputHandle}
								className='px-3 py-2 outline-none border border-slate-400 bg-[#FAFBFC] text-gray-700 rounded-md'
								type="password" name='password' placeholder='Password' id='password' required />
						</div>

						<button className='bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'
						//disabled={loader ? true : false}
						>Sign Up
							{/* {
								loader ? <BeatLoader color='#fff' cssOverride={overrideStyle} /> : 'Sign Up'
							} */}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default AdminLogin