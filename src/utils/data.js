import I1 from "../img/i1.png";
import F1 from "../img/f1.png";
import C3 from "../img/c3.png";
import C4 from "../img/c4.png";
import D3 from "../img/d3.png";
import Fi1 from "../img/fi1.png";
import Cu1 from "../img/cu1.png"
import R1 from "../img/r1.png"

import { GiChickenOven, GiBowlOfRice, GiCirclingFish, GiFruitBowl } from 'react-icons/gi'
import { PiBowlFoodFill } from 'react-icons/pi'
import { IoIceCream } from 'react-icons/io5'
import { BiSolidDrink } from 'react-icons/bi'

const data = [
    {
        id: 1,
        name: "Icecream",
        decp: "Chocolate & vanilla",
        price: "129.0",
        imageSrc: I1,
    },
    {
        id: 2,
        name: "Strawberries",
        decp: "Fresh Strawberries",
        price: "100.0",
        imageSrc: F1,
    },
    {
        id: 3,
        name: "Fried Chicken",
        decp: "Mixed Kebab Plate",
        price: "329.0",
        imageSrc: C4,
    },
    {
        id: 4,
        name: "Fish Platter",
        decp: "Mixed Fish Kebab",
        price: "449.0",
        imageSrc: Fi1,
    },
];

export const categories = [
    {
        id: 1,
        name: "Chicken",
        urlParamName: "Chicken",
        imgSrc: C3,
        icon: <GiChickenOven className='text-xl' />
    },
    {
        id: 2,
        name: "Curry",
        urlParamName: "Curry",
        imgSrc: Cu1,
        icon: <PiBowlFoodFill className='text-xl' />

    },
    {
        id: 3,
        name: "Rice",
        urlParamName: "Rice",
        imgSrc: R1,
        icon: <GiBowlOfRice className='text-xl' />
    },
    {
        id: 4,
        name: "Fish",
        urlParamName: "Fish",
        imgSrc: C3,
        icon: <GiCirclingFish className='text-xl' />
    },
    {
        id: 5,
        name: "Fruits",
        urlParamName: "Fruits",
        imgSrc: F1,
        icon: <GiFruitBowl className='text-xl' />
    },
    {
        id: 6,
        name: "Icecreams",
        urlParamName: "Icecreams",
        imgSrc: I1,
        icon: <IoIceCream className='text-xl' />
    },

    {
        id: 7,
        name: "Soft Drinks",
        urlParamName: "Soft Drinks",
        imgSrc: D3,
        icon: <BiSolidDrink className='text-xl' />
    },
];

export default data