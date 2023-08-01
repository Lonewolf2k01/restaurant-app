import React from 'react'
import Delivery from '../img/delivery.png'
import HeroBg from '../img/heroBg.png'
import data from '../utils/data'

import { LuIndianRupee } from 'react-icons/lu'

const HomeContainer = () => {
    return (
        <section 
            id='home'
            className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full"
        >
            <div className="px-1 py-2 flex flex-1 flex-col items-start justify-center gap-6">
                <div className="flex items-center justify-center gap-2 bg-red-100 rounded-full px-4 py-1">
                    <p className="text-base text-red-500 font-semibold">
                        Bike Delivery
                    </p>
                    <div className="w-8 h-8 rounded-full bg-white overflow-hidden drop-shadow-xl">
                        <img src={Delivery} className="w-full h-full object-contain" alt="BOY" />
                    </div>
                </div>

                <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
                    The Fastest Delivery in <span className="text-red-600 text-[3rem] lg:text-[5rem]">Your CITY</span>
                </p>

                <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>
                    At FoodVerse, we believe that food is not just a means of sustenance; it's an art form, a way to express culture, and a gateway to unforgettable experiences. Our restaurant app is designed to be your ultimate companion on your gastronomic journey, offering a delightful fusion of technology and culinary delights.
                </p>

                <button type='button' className='text-white bg-red-50 border-red-300 border-2 px-4 py-2 w-full md:w-auto rounded-3xl hover:shadow-xl transition-all ease-in-out duration-100 btn relative inline-flex items-center justify-start overflow-hidden hover:bg-white group hover:scale-105'>
                    <span className="w-0 h-0 rounded bg-red-700 absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span>
                    <span className="w-full text-red-900 transition-colors duration-300 ease-in-out group-hover:text-white z-10 font-semibold">
                        <a href="#menu">
                            Order Now!
                        </a>
                    </span>
                </button>
            </div>
            <div className="py-2 flex-1 relative items-center">
                <img src={HeroBg} className='ml-auto w-full h-420 lg:w-auto lg:h-650' alt="Background" />

                <div className="w-full h-full absolute top-0 left-0 flex items-center flex-wrap justify-center py-4 gap-4 lg:px-32">
                    {
                        data && data.map((d) => (
                            <div key={d.id} className='lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex items-center justify-center flex-col drop-shadow-xl'>
                                <img src={d.imageSrc} className='w-20 -mt-10 lg:w-36 lg:-mt-18' alt="I1" />
                                <p className='text-base lg:text-lg font-semibold text-textColor lg:mt-3 mt-2'>
                                    {d.name}
                                </p>

                                <p className='text-[10px] lg:text-sm text-center text-lighttextGray my-1 lg:my-3'>
                                    {d.decp}
                                </p>

                                <p className='flex items-center justify-center gap-1 text-sm font-semibold text-headingColor'>
                                    <span className='text-xs text-red-600'><LuIndianRupee /></span>
                                    {d.price}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default HomeContainer