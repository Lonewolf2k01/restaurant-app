import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import NotFound from "../img/NotFound.svg";

import { BsCart4 } from 'react-icons/bs'
import { LuIndianRupee } from 'react-icons/lu'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

import Swal from 'sweetalert2';

let xy = []

const RowContainer = ({ flag, data, scrollValue }) => {

    const rowContainer = useRef()

    const [{ cartItems }, dispatch] = useStateValue();

    const [items, setItems] = useState([])
    const Swal = require('sweetalert2')

    const addToCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items,
        })
        localStorage.setItem("cartItems", JSON.stringify(items))
    }

    const handleItems = (item) => {
        setItems([...cartItems, item])
    }

    const handleAnim = (item) => {

        let cart = localStorage.getItem("cartItems")

        cart = JSON.parse(cart)

        cart.map((i) => {
            if (i.id === item.id) {
                xy = cartItems.filter((i) => i.id !== item.id)
                Swal.fire({
                    title: 'OOPS!',
                    icon: 'error',
                    showConfirmButton: true,
                    timer: 1000,
                    text: `${item?.title} Already in Cart`,
                    imageUrl: `${item?.imageURL}`,
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: `${item?.title}`,
                })
                setItems([...xy, item])
            } else {
                Swal.fire({
                    title: 'Sweet!',
                    icon: 'success',
                    showConfirmButton: true,
                    timer: 1000,
                    text: `${item?.title} Added to Cart`,
                    imageUrl: `${item?.imageURL}`,
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: `${item?.title}`,
                })
            }
        })
    }

    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue
    }, [scrollValue])

    useEffect(() => {
        addToCart()
    }, [items])

    return (
        <motion.div
            id='menu'
            ref={rowContainer}
            className={`w-full flex gap-4 items-center my-6 scroll-smooth ${flag ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap justify-center"}`}>
            {
                data && data.length > 0 ? (data.map((item) => (
                    <motion.div
                        key={item?.id}
                        whileHover={{ scale: 1.01 }}
                        className='w-275 h-[225px] min-w-[275px] md:w-300 md:min-w-[300px]  my-6 bg-cardOverlay rounded-2xl p-3 backdrop-blur-lg drop-shadow-xl hover:bg-orange-50 hover:shadow-xl flex flex-col items-center justify-evenly relative'>
                        <div className="w-full flex items-center justify-between">
                            <motion.div
                                whileHover={{ scale: 1.15 }}
                                className='w-40 h-40 -mt-8 drop-shadow-2xl'>
                                <img
                                    src={item?.imageURL}
                                    className='w-full h-full object-contain'
                                    alt={item?.title} />
                            </motion.div>

                            <motion.div
                                whileTap={{ scale: 0.5 }}
                                whileHover={{ scale: 1.3 }}
                                onClick={() => { handleItems(item); handleAnim(item) }}
                                // onClick={() => setItems([...cartItems, item])}
                                className='w-9 h-9 rounded-full bg-red-600 flex justify-center items-center cursor-pointer hover:shadow-xl '>
                                <BsCart4 className='text-white text-lg' />
                            </motion.div>
                        </div>

                        <div className='w-full flex flex-col items-end justify-end'>
                            <p className='text-red-500 font-semibold text-base md:text-lg'>
                                {item?.title}
                            </p>
                            <p className='mt-1 text-sm text-gray-500'>
                                {item?.calories} calories
                            </p>

                            <div className='flex items-center gap-8'>
                                <p className='text-lg flex gap-1 justify-center items-center text-headingColor font-semibold'>
                                    <span><LuIndianRupee className='text-xs text-red-600' /> </span>{item?.price}
                                </p>
                            </div>

                        </div>

                    </motion.div>
                ))
                ) : (
                    <div className="w-full flex flex-col items-center justify-center">
                        <img src={NotFound} className="h-340" />
                        <p className="text-xl text-headingColor font-semibold my-2">
                            Items Not Available
                        </p>
                    </div>
                )}
        </motion.div>
    )
}

export default RowContainer