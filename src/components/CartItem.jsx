import React, { useEffect, useState } from 'react'

import { LuIndianRupee } from 'react-icons/lu'
import { CgMathPlus, CgMathMinus } from 'react-icons/cg'

import { motion } from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

import Swal from 'sweetalert2';


let items = []

const CartItem = ({ ci, setFlag, flag }) => {

    const Swal = require('sweetalert2')

    const [qty, setQty] = useState(ci.qty)
    // const [items, setItems] = useState([])

    const [{ cartItems }, dispatch] = useStateValue()

    const cartDispatch = () => {
        localStorage.setItem("cartItems", JSON.stringify(items));
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items,
        });
    };

    const updateQty = (action, id) => {
        if (action == 'add') {
            setQty(qty + 1)
            cartItems.map(item => {
                if (item.id === id) {
                    item.qty += 1
                    setFlag(flag + 1)
                }
            })
            cartDispatch()
        } else {
            if (qty == 1) {
                Swal.fire({
                    title: 'Do you want to remove the item from the cart?',
                    showDenyButton: true,
                    icon: 'warning',
                    // showCancelButton: true,
                    confirmButtonText: 'Yes',
                    denyButtonText: 'No',
                }).then((result) => {
                    if (result.isConfirmed) {
                        items = cartItems.filter((item) => item.id !== id)
                        Swal.fire('Item Removed!', '', 'success')
                        cartDispatch()
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                        cartDispatch()
                    }
                })
            } else {
                setQty(qty - 1)
                cartItems.map(item => {
                    if (item.id === id) {
                        item.qty -= 1
                        setFlag(flag + 1)
                    }
                })
                cartDispatch()
            }
        }
    }

    useEffect(() => {
        items = cartItems
    }, [items, qty])

    return (
        <div className='w-full p-1 px-2 rounded-3xl bg-red-200 flex items-center gap-2'>
            <img
                src={ci?.imageURL}
                className='w-20 h-20 max-w-[60px] rounded-full object-contain'
                alt={ci?.title} />

            {/* nameSection */}
            <div className='flex flex-col gap-2'>
                <p className='text-base font-semibold text-red-900'>
                    {ci?.title}
                </p>
                <p className='text-sm text-black font-semibold flex items-center justify-start'>
                    <LuIndianRupee className='text-sm text-red-600' />
                    {parseFloat(ci?.price) * qty}.0
                </p>
            </div>

            {/* buttonSection */}
            <div className='group flex items-center gap-2 ml-auto cursor-pointer'>
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.6 }}
                    onClick={() => { updateQty("subtract", ci?.id) }}>
                    <CgMathMinus className='text-lg w-7 text-red-100 bg-cartNumBg rounded-full' />
                </motion.div>
                <p className="w-7 h-7 rounded-full bg-red-900 text-gray-50 flex items-center justify-center">
                    {qty}
                </p>
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.75 }}
                    onClick={() => { updateQty("add", ci?.id) }}>
                    <CgMathPlus className='text-lg w-7 text-red-100 bg-cartNumBg rounded-full' />
                </motion.div>
            </div>

        </div>
    )
}

export default CartItem