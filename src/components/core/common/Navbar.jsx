import React from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from "../../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../Auth/ProfileDropDown'
function Navbar() {

    const {token} = useSelector((state) => state.auth);
    const userProfile = useSelector((state) => state.profile);
    const { user } = userProfile || {}; // Using default value to handle null


    const cart = useSelector((state) => state.cart);
    const { totalItems } = cart || {}; // Using default value to handle undefined


    const location = useLocation();


    const matchRoute = (route) =>{
        return matchPath({path:route} , location.pathname)
    }


  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between  '>

    {/*Image Addded  */}
        <Link to ="/">
        <img src = {logo} width  = {160} height={42} loading='lazy'/>
        </Link>

        <nav>
            <ul className='flex gap-6 text-richblack-5'>
        {
            NavbarLinks.map((link,index)=>(
                
                <li key = {index}>
                {
                    link.title ==="Catalog" ? (<div>

                    </div>) : (
                        <Link to = {link?.path}>
                            <p className ={`${matchRoute(link?.path)?"text-yellow-25" : "text-richblack-25" }`}>
                                {link.title}
                            </p>
                        </Link>
                    )
                
                    }
                </li>
            ))
        }

            </ul>
        </nav>


        {/* Login Signup Dashboard */}

        <div className='flex gap-4 items-center '>


            {
                user && user?.accountType !== "Instructor" && (
                    <Link to  = "/dashboard/cart" className  = 'relative'>
                        <AiOutlineShoppingCart/>
                        {
                            totalItems > 0 && (
                                <span>
                                    {totalItems}
                                </span>
                            )
                        }
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to = "/login">
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                        text-richblack-100 rounded-md'>
                            Login
                        </button>
                    </Link>
                )
            }

            {
                <Link to = "/signup">
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                        text-richblack-100 rounded-md'>
                        Sign Up 
                    </button>
                </Link>

            }

            {
                token !== null && <ProfileDropDown/>
            }

        </div>

        </div>
    </div>
  )
}

export default Navbar