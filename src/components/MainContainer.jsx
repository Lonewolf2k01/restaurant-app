import React, { useEffect, useState } from 'react'
import HomeContainer from './HomeContainer'

import { TbArrowBigLeftLineFilled, TbArrowBigRightLineFilled } from 'react-icons/tb'

import { motion } from 'framer-motion'
import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider'
import MenuContainer from './MenuContainer'
import CartContainer from './CartContainer'

const MainContainer = () => {

    const [{ foodItems, cartShow }, dispatch] = useStateValue()

    const [scrollValue, setScrollValue] = useState(0)

    useEffect(() => { }, [scrollValue])

    return (
        <div className="w-full h-auto flex flex-col items-center justify-center">
            <HomeContainer />

            <section className='w-full my-6'>
                <div className='w-full flex items-center justify-between'>
                    <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100'>
                        Our Fresh & Healthy Fruits
                    </p>

                    <div className='hidden md:flex gap-3 items-center'>
                        <motion.div
                            whileTap={{ scale: 0.5 }}
                            whileHover={{ scale: 1.15 }}
                            onClick={() => { setScrollValue(prevValue => prevValue - 200) }}
                            className="w-8 h-8 rounded-full bg-[#ffedd5] text-[#f97316] hover:text-[#ffedd5] hover:bg-[#f97316] cursor-pointer hover:shadow-xl flex items-center justify-center">
                            <TbArrowBigLeftLineFilled className='text-xl' />
                        </motion.div>
                        <motion.div
                            whileTap={{ scale: 0.5 }}
                            whileHover={{ scale: 1.15 }}
                            onClick={() => { setScrollValue(prevValue => prevValue + 200) }}
                            className="w-8 h-8 rounded-full bg-[#ffedd5] text-[#f97316] hover:text-[#ffedd5] hover:bg-[#f97316] cursor-pointer hover:shadow-xl flex items-center justify-center">
                            <TbArrowBigRightLineFilled className='text-xl ' />
                        </motion.div>
                    </div>
                </div>

                <RowContainer
                    scrollValue={scrollValue}
                    flag={true}
                    data={foodItems?.filter(f => f.category === "Fruits")} />

            </section>

            <MenuContainer />

            {
                cartShow && (
                    <CartContainer />
                )
            }

        </div>
    )
}

export default MainContainer