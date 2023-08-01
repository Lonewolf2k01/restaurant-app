import React, { useEffect, useState } from 'react'

import Logo from '../img/food-verse-logo.png'
import Avatar from '../img/avatar.png'

import { IoIosBasket, IoMdLogIn } from 'react-icons/io'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { BiHome, BiMenu } from 'react-icons/bi'
import { HiUserGroup } from 'react-icons/hi'
import { GrServices } from 'react-icons/gr'

import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

import { getAuth, signInWithPopup, GoogleAuthProvider, getRedirectResult, signInWithRedirect, onAuthStateChanged } from "firebase/auth";
import { app } from '../firebase.config'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const Header = () => {

    const navigate = useNavigate()

    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider()

    const [{ cartShow, cartItems }, dispatch] = useStateValue()

    const [isMenu, setIsMenu] = useState(false)
    const [effect, setEffect] = useState(false)

    const [isUpdated, setIsUpdated] = useState(false)

    const [user, setUser] = useState(() => {
        // Get the user details from local storage on initial component load
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        const divElement = document.getElementById('animatedDiv')
        divElement.classList.add("animate-wiggle1")
        setTimeout(() => {
            // Remove the animation class after a certain duration (e.g., 1 second)
            divElement.classList.remove("animate-wiggle1");
        }, 1000);
    } ,[cartItems])

    // Function to handle redirect result
    const handleRedirectResult = async () => {
        try {
            const result = await getRedirectResult(firebaseAuth);
            if (result.user) {
                const userDetails = result.user.providerData[0];
                setUser(userDetails); // Update the user state
                localStorage.setItem("user", JSON.stringify(userDetails)); // Save user details to local storage

            }
        } catch (error) {
            console.error("Error processing redirect result:", error);
        }
    };

    useEffect(() => {
        handleRedirectResult();
    }, []);

    // Function to initiate the login process
    const login = async () => {
        try {
            if (!user) {
                await signInWithRedirect(firebaseAuth, provider);
            } else {
                setIsMenu(!isMenu)
            }
        } catch (error) {
            console.error("Firebase authentication error:", error);
        }
    };

    // Function to handle logout
    const logout = async () => {
        try {
            await firebaseAuth.signOut();
            setUser(null); // Clear the user details from state after logout
            localStorage.removeItem("user"); // Remove user details from local storage
            setIsMenu(false)
        } catch (error) {
            console.error("Firebase signout error:", error);
        }
    };

    // Listen for changes in the user authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                const userDetails = user.providerData[0];
                setUser(userDetails); // Update the user state
                localStorage.setItem("user", JSON.stringify(userDetails)); // Save user details to local storage
            } else {
                setUser(null); // Clear the user details from state
                localStorage.removeItem("user"); // Remove user details from local storage
            }
        });

        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        })
    }

    useEffect(() => {
        const divElement = document.getElementById('animatedDiv1')
        divElement.classList.add("animate-wiggle1")
        setTimeout(() => {
            // Remove the animation class after a certain duration (e.g., 1 second)
            divElement.classList.remove("animate-wiggle1");
        }, 1000);
    }, [cartItems])

    // const login = async () => {
    //     try {
    //         if (!user) {
    //         const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider)
    //         dispatch({
    //             type: actionType.SET_USER,
    //             user: providerData[0],
    //         });
    //         window.localStorage.setItem("user", JSON.stringify(providerData[0]))
    //         } else {
    //             setIsMenu(!isMenu)
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // const logout = () => {
    //     setIsMenu(false)
    //     localStorage.clear()

    //     dispatch({
    //         type: actionType.SET_USER,
    //         user: null,
    //     })

    // }

    return (
        <header
            onClick={() => {
                if (isMenu === true) {
                    setIsMenu(false)
                }
            }}
            className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 backdrop-blur-xl">
            {/* desktop view */}
            <div className="hidden md:flex w-full h-full items-center justify-between">
                <Link
                    to={'/'} onClick={() => { setIsMenu(false) }}
                    className="flex items-center gap-2 hover:scale-110 duration-200 transition-all ease-in-out">
                    <img src={Logo} className="w-16 object-cover" alt="Logo" />
                    <p className="text-headingColor text-2xl font-bold hover:text-red-600 duration-200 transition-all ease-in-out">
                        Food <span className='text-red-600 hover:text-headingColor duration-200 transition-all ease-in-out'>Verse</span>
                    </p>
                </Link>

                <div className="flex items-center gap-8">
                    <motion.ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className="relative flex flex-row items-center gap-8 ml-auto">
                        <motion.li
                            whileTap={{ scale: 0.5 }}
                            whileHover={{ scale: 1.15 }}
                            className="text-base relative group text-textColor hover:text-red-600   duration-200 transition-all ease-in-out cursor-pointer">
                            <a href="#home">
                                Home
                                <span className="absolute -bottom-1 right-0 w-0 h-[2px] bg-red-900 group-hover:w-full group-hover:transition-all"></span>
                            </a>
                        </motion.li>
                        <motion.li
                            whileTap={{ scale: 0.5 }}
                            whileHover={{ scale: 1.15 }}
                            className="relative group text-base text-textColor hover:text-red-600 duration-200 transition-all ease-in-out cursor-pointer">
                            <a href="#menu">
                                Menu
                                <span className="absolute -bottom-1 right-0 w-0 h-[2px] bg-red-900 group-hover:w-full group-hover:transition-all"></span>
                            </a>
                        </motion.li>
                        <motion.li
                            whileTap={{ scale: 0.5 }}
                            whileHover={{ scale: 1.15 }}
                            className="relative group text-base text-textColor hover:text-red-600   duration-200 transition-all ease-in-out cursor-pointer">
                            <a href="https://lonewolf2k01.github.io/My_Portfolio/" target='blank'>
                                About Us
                                <span className="absolute -bottom-1 right-0 w-0 h-[2px] bg-red-900 group-hover:w-full group-hover:transition-all"></span>
                            </a>
                        </motion.li>
                        <motion.li
                            whileTap={{ scale: 0.5 }}
                            whileHover={{ scale: 1.15 }}
                            className="relative group text-base text-textColor hover:text-red-600 duration-200 transition-all ease-in-out cursor-pointer">
                            <a href="#menu">
                                Services
                                <span className="absolute -bottom-1 right-0 w-0 h-[2px] bg-red-900 group-hover:w-full group-hover:transition-all"></span>
                            </a>
                        </motion.li>
                        {/* <li>Contact</li> */}
                    </motion.ul>

                    <motion.div
                        id='animatedDiv'
                        onHoverStart={() => {
                            setEffect(!effect)
                        }}
                        onAnimationEnd={() => setEffect(false)} 
                        whileTap={{ scale: 0.5 }}
                        whileHover={{ scale: 1.15 }}
                        onClick={showCart}
                        className={`flex relative items-center justify-center `}>
                        <IoIosBasket className="text-textColor text-2xl hover:text-red-600 duration-100 transition-all ease-in-out cursor-pointer" />
                        {
                            cartItems && cartItems.length > 0 && (
                                <div
                                    
                                    className={`absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center`}>
                                    <p className="text-xs text-white font-semibold">
                                        {cartItems.length}
                                    </p>
                                </div>
                            )
                        }
                    </motion.div>

                    <div className="relative">
                        <motion.img
                            whileTap={{ scale: 0.5 }}
                            whileHover={{ scale: 1.15 }}
                            src={user ? user?.photoURL : Avatar}
                            onClick={login}
                            className="w-10 rounded-full min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer"
                            alt="AvatarImage" />
                        {
                            isMenu && (
                                <motion.div
                                    // initial={{ opacity: 0, x: 200 }}
                                    // animate={{ opacity: 1, x: 0 }}
                                    // exit={{ opacity: 0, x: 200 }}
                                    initial={{ opacity: 0, scale: 0.2 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.2 }}
                                    className="w-40 bg-gray-50 shadow-2xl rounded-xl flex flex-col absolute top-12 right-0 px-4 py-2">
                                    {
                                        user && user.email === "adarshteeparthi@gmail.com" && (

                                            <motion.p
                                                onClick={() => {
                                                    setIsMenu(!isMenu)
                                                    navigate("/createItem")
                                                }}
                                                whileTap={{ scale: 0.5 }}
                                                whileHover={{ scale: 1.05 }}
                                                className="px-[11px] py-2 flex items-center gap-2 cursor-pointer hover:text-red-700 hover:bg-red-100 hover:rounded-xl transition-all duration-100 ease-in-out">
                                                New Item
                                                <AiOutlinePlusCircle className='text-xl' />
                                            </motion.p>

                                        )

                                    }
                                    <motion.p
                                        whileTap={{ scale: 0.5 }}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={logout}
                                        className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:text-red-700 hover:bg-red-100 hover:rounded-xl transition-all duration-100 ease-in-out">
                                        Logout
                                        <RiLogoutCircleRLine className='text-xl' />
                                    </motion.p>

                                </motion.div>
                            )
                        }

                    </div>
                </div>
            </div>

            {/* mobile view */}
            <div className="flex items-center justify-between md:hidden w-full h-full backdrop-blur-xl">

                <motion.div
                    id='animatedDiv1'
                    onHoverStart={() => {
                        setEffect(!effect)
                    }}
                    onAnimationEnd={() => setEffect(false)}
                    whileTap={{ scale: 0.5 }}
                    whileHover={{ scale: 1.15 }}
                    onClick={showCart}
                    className="flex relative items-center justify-center">
                    <IoIosBasket className="text-textColor text-2xl hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer" />
                    {
                        cartItems && cartItems.length > 0 && (
                            <div
                                className={`absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center`}>
                                <p className="text-xs text-white font-semibold">
                                    {cartItems.length}
                                </p>
                            </div>
                        )
                    }
                </motion.div>

                <Link
                    to={'/'} onClick={() => { setIsMenu(false) }}
                    className="flex items-center gap-2 hover:scale-110 duration-200 transition-all ease-in-out">
                    <img src={Logo} className="w-16 object-cover" alt="Logo" />
                    <p className="text-headingColor text-2xl font-bold hover:text-red-600 duration-200 transition-all ease-in-out">
                        Food <span className='text-red-600 hover:text-headingColor duration-200 transition-all ease-in-out'>Verse</span>
                    </p>
                </Link>

                <div className="relative">
                    <motion.img
                        whileTap={{ scale: 0.5 }}
                        whileHover={{ scale: 1.15 }}
                        src={user ? user.photoURL : Avatar}
                        onClick={login}
                        className="w-10 rounded-full min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer"
                        alt="AvatarImage" />
                    {
                        isMenu && (
                            <motion.div
                                // initial={{ opacity: 0, x: 200 }}
                                // animate={{ opacity: 1, x: 0 }}
                                // exit={{ opacity: 0, x: 200 }}
                                initial={{ opacity: 0, scale: 0.2 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.2 }}
                                className="w-40 bg-gray-50 shadow-2xl rounded-xl flex flex-col absolute top-12 right-0 px-4 py-2">
                                {
                                    user && user.email === "adarshteeparthi@gmail.com" && (

                                        <motion.p
                                            onClick={() => {
                                                setIsMenu(!isMenu)
                                                navigate("/createItem")
                                            }}
                                            whileTap={{ scale: 0.5 }}
                                            whileHover={{ scale: 1.05 }}
                                            className="px-[11px] py-2 flex items-center gap-3 cursor-pointer hover:text-red-700 hover:bg-red-100 hover:rounded-xl transition-all duration-100 ease-in-out">
                                            <AiOutlinePlusCircle />
                                            New Item
                                        </motion.p>
                                    )
                                }

                                <ul
                                    className="flex flex-col">
                                    <motion.li
                                        whileTap={{ scale: 0.5 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center justify-between gap-3 hover:text-red-700 hover:bg-red-100 hover:rounded-xl duration-100 transition-all ease-in-out cursor-pointer px-[11px] py-2">
                                        <a href="#home" className='flex items-center justify-center gap-3'>
                                            <BiHome />
                                            Home
                                        </a>
                                    </motion.li>
                                    <motion.li
                                        whileTap={{ scale: 0.5 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center justify-between gap-3  hover:text-red-700 hover:bg-red-100 hover:rounded-xl duration-100 transition-all ease-in-out cursor-pointer px-[11px] py-2">
                                        <a href="#menu" className='flex items-center justify-center gap-3'>
                                            <BiMenu />
                                            Menu
                                        </a>
                                    </motion.li>
                                    <motion.li
                                        whileTap={{ scale: 0.5 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center justify-between gap-3  hover:text-red-700 hover:bg-red-100 hover:rounded-xl duration-100 transition-all ease-in-out cursor-pointer px-[11px] py-2">
                                        <a href="https://lonewolf2k01.github.io/My_Portfolio/" target='blank' className='flex items-center justify-center gap-3'>
                                            <HiUserGroup />
                                            About Us
                                        </a>
                                    </motion.li>
                                    <motion.li
                                        whileTap={{ scale: 0.5 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center justify-between gap-3  hover:text-red-700 hover:bg-red-100 hover:rounded-xl duration-100 transition-all ease-in-out cursor-pointer px-[11px] py-2">
                                        <a href="#menu" className='flex items-center justify-center gap-3'>
                                            <GrServices />
                                            Services
                                        </a>
                                    </motion.li>
                                    {/* <li>Contact</li> */}
                                </ul>

                                <motion.p
                                    whileTap={{ scale: 0.5 }}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={logout}
                                    className="m-2 p-2 flex items-center justify-center gap-3 cursor-pointer bg-gray-300 hover:bg-gray-700 hover:text-cyan-50 hover:rounded-xl rounded-xl transition-all duration-100 ease-in-out">
                                    <RiLogoutCircleRLine />
                                    Log Out
                                </motion.p>

                            </motion.div>

                        )
                    }

                </div>

            </div>
        </header>
    )
}

export default Header