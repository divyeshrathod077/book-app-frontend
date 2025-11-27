import React from 'react'
import {Link} from 'react-router-dom';
import { RiMenu2Line } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from 'react-icons/fi'
import { FaRegHeart } from "react-icons/fa";
import avatarImg from '../assets/avatar.png'
import {useState} from "react"
import {useSelector,useDispatch} from "react-redux"
import { useAuth } from '../context/AuthContext'
const navigation=[
   {name:"Dashboard",href:"/dashboard"},
   {name:"Orders",href:"/order"},
   {name:"cart Page",href:"/cart"},
   {name:"check out ",href:"/checkout"},
]
const Navbar =() =>{
    const [isDropdownOpen,setIsdropdownOpen]= useState(false)
    const cartItems = useSelector(state =>state.cart.cartItems);
    console.log(cartItems)
    
const auth = useAuth();
  const currentUser = auth?.currentUser;

    const handleLogOut =()=>{
        auth.logout();
         
    }
    return(
        <header className='max-w-screen-2xl mx-auto px-4 py-6'>
            <nav className='flex justify-between items-center'>
                <div className='flex items-center md:gap-16 gap-4'>
                    <Link to='/'>
                   <RiMenu2Line/> </Link>

                  <div className='relative sm:72 w-40 space-x-2 '>
                    <FaSearch className='absolute inline-block left-3 inset-y-2' />
                    <input type="text" placeholder="Search here" className='bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none'/>

                  </div>
                </div>
                <div className='relative flex items-center md:space-x-3 space-x-2 '>
                    <div >
                        {
                            currentUser ?<>
                            <button onClick={()=>setIsdropdownOpen(!isDropdownOpen)}>
                                <img src={avatarImg} alt="" className={`size-7 rounded-full $ {currentUser ? 'ring-2 ring-blue-500 :''}`}/>
                            </button>
                            {
                                isDropdownOpen && (
                                    <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                                        <ul className='py-2'>
                                            {
                                                navigation.map((item)=>(
                                                  <li key={item.name} onClick={()=>setIsdropdownOpen(false)}>
                                                    <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'>
                                                    {item.name}
                                                    </Link>
                                                  </li>
                                                ))
                                            }
                                            <li>
                                                <button
                                                onClick={handleLogOut}
                                                className='block px-4 py-2  w-full text-left text-sm hover:bg-gray-100'>Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                            </>:<Link to="/login"><FaRegUser className="size-6"/></Link>

                        }
                    </div>
               
                <button className='hidden sm:block '>
                    <FaRegHeart className='size-6'/>
                </button>
                <Link to="/cart" className='bg-amber-300 p-1 sm:px-6 py-2 flex items-center rounded-sm'>
                   <FiShoppingCart className='size-6'/>
                   {
                    cartItems.length > 0  ? <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span>
                    :<span className='text-sm font-semibold sm:ml-1'>0</span>
        
                   }
                   
                   
                    </Link>
                </div>
            </nav>
        </header>
    )
}
export default Navbar;