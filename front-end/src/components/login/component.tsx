import { useDispatch } from 'react-redux'
import { loginUserWithGoogle } from '../../store/user'
import logo from './logo.png'

export default function Login() {
    const dispatch = useDispatch()
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-6 text-left bg-white shadow-lg">
                <div className="flex justify-center">
                    <img src={logo} width="48px" height="48px" alt="" />
                </div>
                <h3 className="text-2xl font-bold text-center ">
                    Login to your account
                </h3>
                <form action="">
                    <div className="mt-4">
                        <div>
                            <label className="block" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="text"
                                placeholder="Email"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            ></input>
                            <span className="text-xs tracking-wide text-red-600">
                                Email field is required{' '}
                            </span>
                        </div>
                        <div className="mt-4">
                            <label className="block">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                        </div>
                        <div className="flex items-baseline justify-between">
                            <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                                Login
                            </button>
                            {/* <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a> */}
                        </div>
                        <div className="w-full  mt-4">
                            <button
                                onClick={() => dispatch(loginUserWithGoogle())}
                                className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                                type="button"
                            >
                                Login with Google
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
