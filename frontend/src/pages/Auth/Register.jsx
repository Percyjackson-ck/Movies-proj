import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { setCredentails } from '../../redux/feature/auth/authSlice'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../redux/api/users'
const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isloading }] = useRegisterMutation();
    const userInfo = useSelector((state) => state.auth?.userInfo);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/'


    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }

    }, [navigate, redirect, userInfo])
const submitHandler=async(e)=>{
    e.preventDefault();
    if(password!=confirmPassword){
        toast.error("Password do not match")
    }else{
        try{
        const res=await register({username,email,password}).unwrap();
        console.log("🚀 API Response:", res);
        dispatch(setCredentails({...res}))
        navigate(redirect)
        toast.success('User sucessfully registerd.');
         
        }catch(err){
            console.log(err)
            toast.error(err.data.message)
        }
    }
}

    return <div className='pl-[10rem] flex flex-wrap register-container'>
        <div className='mr-[4rem] mt-[5rem]'>
            <h1 className="text-2xl font-semibold mb-4">Register </h1>
            <form onSubmit={submitHandler} className='container w-[40rem]'>
                <div className='my-[2rem]'>
                    <label htmlFor="name" className='block text-sm font-medium text-white'>
                        Name
                    </label>
                    <input type="text" id='name' className='mt-1 border p-2 rounded w-full
                'placeholder='Enter Name' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='my-[2rem]'>
                    <label htmlFor="email" className='block text-sm font-medium text-white'>
                        Email Address
                    </label>
                    <input type="email" id='email' className='mt-1 border p-2 rounded w-full
                'placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='my-[2rem]'>
                    <label htmlFor="password" className='block text-sm font-medium text-white'>
                        Password
                    </label>
                    <input type="password" id='password' className='mt-1 border p-2 rounded w-full
                'placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='my-[2rem]'>
                    <label htmlFor="confirmPassword" className='block text-sm font-medium text-white'>
                      Confirm Password
                    </label>
                    <input type="password" id='confirmPassword' className='mt-1 border p-2 rounded w-full
                'placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>


                <button disabled={isloading} type="submit"
                className='bg-teal-500 text-white px-4 py-2 rounded cursor-pointer 
                my-[1rem]'
                
                >
                 {isloading?"Registering...":"Register"}


                </button>
                {isloading &&<Loader/>}

            </form>
            <div className='mt-4'>
                <p className='text-white'>
                    Already have an account?{" "}
                    <Link to={redirect?`/login?redirect=${redirect}`:"/login"}
                    className='text-teal-500 hover:underline'>
                    
                    Login
                    </Link>
                </p>
            </div>
{console.log(userInfo)
}

        </div>
       


    </div>
}

export default Register