import React from 'react'
import './Register.css'
import { NavLink } from 'react-router-dom'

const Register = () => {
  
  return (
    <div className='flex items-center justify-center w-[100%] h-[100vh] bg-slate-300' >
    <div className='bg-white p-10 rounded-lg shadow-md w-96'>
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <div>

            <form >
                {/* <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="email" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 w-full border rounded-md" placeholder="Enter your email" />
                </div> */}
                <div className="mb-4">
                    {/* <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">Password</label> */}
                    <input type="email"  id="email" className="mt-1 p-2 w-full border rounded-md" placeholder="Enter your email" />

                </div>
                <div className="mb-4">
                    {/* <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">Email</label> */}
                    <input type="password" id="password" className="mt-1 p-2 w-full border rounded-md" placeholder="Enter your password" />

                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[100%]" >Register</button>
                {/* <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ms-4" >Forget Password</button> */}
                    
                {/* {error && (
                        <div className="mt-4 text-red-600">
                            <p>{error}</p>
                        </div>
                    )} */}
                <div className='mt-2'>
                    <p>Already have an account click on </p>
                    <NavLink className='text-blue-500 underline' to={'/login'}>Login</NavLink>
                </div>
               
            </form>
        </div>
    </div>

</div>
  )
}

export default Register