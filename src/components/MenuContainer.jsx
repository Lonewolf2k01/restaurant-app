import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { categories } from '../utils/data'
import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider'

const MenuContainer = () => {

    const [filter, setFilter] = useState("Chicken")

    const [effect, setEffect] = useState(false)

    const [{ foodItems }, dispatch] = useStateValue()

    return (
        <section id='menu' className='w-full my-6'>
            <div className='w-full flex flex-col items-center justify-center '>
                <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto '>
                    Our Hot Dishes
                </p>

                <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none pl-4 md:pl-0">
                    {
                        categories && categories.map((category) => (
                            <motion.div
                                key={category.id}
                                className={`group ${filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"} ${filter === category.urlParamName ? "scale-110 md:scale-125" : "scale-100"} w-24 min-w-[94px] h-28 cursor-pointer rounded-2xl drop-shadow-xl flex flex-col gap-3 items-center justify-center duration-200 transition-all ease-in-out hover:bg-cartNumBg hover:scale-110 hover:md:scale-125 ${filter === category.urlParamName ? `${effect && "animate-wiggle"}` : ""}
                                `}
                                onClick={() => {
                                    setEffect(true)
                                    setFilter(category.urlParamName)
                                }}
                                onAnimationEnd={() => setEffect(false)}
                            >
                                <div className={`w-10 h-10 rounded-full ${filter === category.urlParamName ? "bg-card" : "bg-cartNumBg"} ${filter === category.urlParamName ? "text-textColor" : "text-card"} group-hover:bg-card group-hover:text-textColor flex items-center justify-center`}>
                                    {category?.icon}
                                </div>

                                <p className={`text-sm ${filter === category.urlParamName ? "text-white" : "text-textColor"} group-hover:text-white font-semibold`}>
                                    {category.name}
                                </p>
                            </motion.div>
                        ))
                    }

                </div>


                <div className='w-full'>
                    <RowContainer
                        flag={false}
                        data={foodItems?.filter(n => n.category === filter)} />
                </div>

            </div>
        </section>
    )
}

export default MenuContainer