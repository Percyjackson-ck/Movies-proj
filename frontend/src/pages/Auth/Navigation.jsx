import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai';
import { MdOutlineLocalMovies } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../../redux/api/user';
import { logout } from '../../redux/feature/auth/authSlice';

const Navigation = () => {

    
    const userinfo = useSelector((state) => state.auth)
    
    const [dropdownOpen, setdropdownOpen] = useState(false)
    
    const toggleDropdown = () => {
        setdropdownOpen(!dropdownOpen);
    }
    
    const dispatch = useDispatch();
    
    const navigate = useNavigate;
    
    const [logApiCall] = useLoginMutation();
    
    return <div class="fixed bottom-10 left-[30rem] transform translate-x-1/2 
    translate-y-1/2 z-50 bg-[#f4e8e8] border w-[30%] px-[4rem] mb-[2rem] rounded">
    <section className='flex justify-between items-center'>
    {/* section1 */}
    <div className='flex justify-center items-center mb-[2rem]'>
    <Link to='/'  className=' flex items-center transition-transform transform hover:translate-x-2'></Link>
    </div>
    {/* section2 */}
    </section>
</div>

};

export default Navigation;
