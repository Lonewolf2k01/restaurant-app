import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { AiOutlineClear } from 'react-icons/ai'

import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

import EmptyCart from "../img/emptyCart.svg";
import CartItem from './CartItem'
import { LuIndianRupee } from 'react-icons/lu'

const CartContainer = () => {

    const Swal = require('sweetalert2')

    const [effect, setEffect] = useState(false)
    const [{ cartShow, cartItems }, dispatch] = useStateValue()

    const [flag, setFlag] = useState(1);
    const [tot, setTot] = useState(0);

    const user = localStorage.getItem("user")
    useEffect(() => {
    }, [user])

    const hideCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        })
    }

    const clearCart = () => {
        Swal.fire({
            title: 'Do you want to clear the cart?',
            showDenyButton: true,
            icon: 'warning',
            // showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: actionType.SET_CART_ITEMS,
                    cartItems: [],
                });

                localStorage.setItem("cartItems", JSON.stringify([]));
                Swal.fire('Cleared Successfully!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    };

    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
            return accumulator + item.qty * item.price
        }, 0)
        setTot(totalPrice)
    }, [tot, flag, cartItems])

    return (
        <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}

            className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
        >
            <div className="w-full flex items-center justify-between p-4 cursor-pointer">
                <motion.div
                    onClick={hideCart}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-between p-4 cursor-pointer">
                    <div className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-card transition duration-50 ease-out border-none rounded-full shadow-md group">
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-150 -translate-x-full bg-cartNumBg group-hover:translate-x-0 ease">
                            <MdOutlineKeyboardBackspace className="text-card text-3xl" />
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-cartNumBg transition-all duration-150 transform group-hover:translate-x-full ease">Close</span>
                        <span className="relative invisible">Close</span>
                    </div>
                </motion.div>

                <p className="text-textColor text-lg font-semibold">Cart</p>

                <motion.div
                    whileTap={{ scale: 0.5 }}
                    whileHover={{ scale: 1.2 }}
                    className={`flex items-center gap-2 bg-red-200 p-3 hover:bg-cartNumBg shadow-lg cursor-pointer hover:text-card text-base ${effect && "animate-wiggle1"} rounded-full`}
                    onClick={() => {
                        setEffect(!effect)
                        clearCart()
                    }}
                    onHoverStart={() => setEffect(!effect)}
                    onAnimationEnd={() => setEffect(false)}
                >

                    <AiOutlineClear className='text-2xl rounded-full' />

                </motion.div>
            </div>

            {/* bottomSection */}
            {
                cartItems && cartItems.length > 0 ? (
                    <div className='w-full h-full bg-red-50 rounded-t-[2rem] flex flex-col'>
                        {/* cartItemsSection */}
                        <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none'>
                            {/* cartItem */}
                            {
                                cartItems && cartItems.map((ci) => (
                                    <CartItem key={ci.id} ci={ci} setFlag={setFlag}
                                        flag={flag} />
                                ))
                            }

                        </div>

                        {/* cartTotalSection */}
                        <div className='w-full flex-1 bg-red-200 rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2'>
                            <div className="w-full flex items-center justify-between p-1 mt-1">
                                <p className="text-red-900 text-lg">Sub Total</p>
                                <p className="text-red-900 text-lg flex items-center justify-center">
                                    <LuIndianRupee className='text-sm text-red-600' />
                                    {tot}.0
                                </p>
                            </div>
                            <div className="w-full flex items-center justify-between p-1">
                                <p className="text-red-900 text-lg">Delivery</p>
                                <p className="text-red-900 text-lg flex items-center justify-center">
                                    <LuIndianRupee className='text-sm text-red-600' />
                                    50.0
                                </p>
                            </div>

                            <div className="w-full border-b border-gray-600 my-2"></div>

                            <div className="w-full flex items-center justify-between p-1">
                                <p className="text-red-900 text-xl font-semibold">Total</p>
                                <p className="text-red-900 text-xl font-semibold flex items-center justify-center">
                                    <LuIndianRupee className='text-sm text-red-600' />
                                    {tot + 50}.0
                                </p>
                            </div>

                            {
                                user && user.length > 0 ? (
                                    <button
                                        type="button"
                                        className="w-full p-2 rounded-full btn relative inline-flex items-center justify-start overflow-hidden text-white bg-red-400 group hover:scale-105 text-lg my-2 hover:shadow-lg duration-100 transition-all ease-in-out border-red-900 border-2"
                                    >
                                        <span className="w-0 h-0 rounded bg-red-900 absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span>
                                        <span className="w-full text-red-900 transition-colors duration-300 ease-in-out group-hover:text-white z-10 font-semibold">
                                            Check Out
                                        </span>
                                    </button>
                                ) : (
                                        <button
                                            type="button"
                                            className="w-full p-2 rounded-full btn relative inline-flex items-center justify-start overflow-hidden text-white bg-red-400 group hover:scale-105 text-lg my-2 hover:shadow-lg duration-100 transition-all ease-in-out border-red-900 border-2"
                                        >
                                            <span className="w-0 h-0 rounded bg-red-900 absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span>
                                            <span className="w-full text-red-900 transition-colors duration-300 ease-in-out group-hover:text-white z-10 font-semibold">
                                                Login to Check Out.
                                            </span>
                                        </button>
                                )
                            }

                        </div>

                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                        <img src={EmptyCart} className="w-300" alt="" />
                        <p className="text-xl text-textColor font-semibold">
                            Your Cart is Empty!!!
                        </p>
                    </div>
                )
            }

        </motion.div>
    )
}

export default CartContainer