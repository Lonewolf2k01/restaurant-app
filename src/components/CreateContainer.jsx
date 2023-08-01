import React, { useState } from 'react'
import { motion as m } from 'framer-motion'
import { IoFastFood } from 'react-icons/io5'
import { MdCategory } from 'react-icons/md'
import { categories } from '../utils/data'

import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

import { AiFillCaretDown } from 'react-icons/ai'
import { GiCloudUpload } from 'react-icons/gi'
import { MdDeleteForever, MdFoodBank, MdDeleteSweep } from 'react-icons/md'
import { LuIndianRupee } from 'react-icons/lu'

import {
    Menu,
    MenuItem,
    MenuButton
} from "@szhsin/react-menu";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Loader from './Loader'
import { storage } from '../firebase.config'
import { getAllFoodItems, saveItem } from '../utils/firebaseFuntions'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'



const CreateContainer = () => {

    const [title, setTitle] = useState("")
    const [calories, setCalories] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState(null)
    const [imageAsset, setImageAsset] = useState(null)
    const [fields, setFields] = useState(false)
    const [alertStatus, setAlertStatus] = useState("danger")
    const [msg, setMsg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [foodImg, setFoodImg] = useState("")

    const [{ foodItems }, dispatch] = useStateValue()

    const uploadImage = (e) => {
        setIsLoading(true)
        const imageFile = e.target.files[0]
        const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
        const uploadTask = uploadBytesResumable(storageRef, imageFile)

        uploadTask.on('state_changed', (snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (error) => {
            console.log(error)
            setFields(true)
            setMsg("Error while uploading, Try Again 🙇");
            setAlertStatus("danger")
            setTimeout(() => {
                setFields(false)
                setIsLoading(false)
            }, 4000);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
                downloadURL => {
                    setImageAsset(downloadURL)
                    setIsLoading(false)
                    setFields(true)
                    setMsg("Image Uploaded Successfully 😊")
                    setAlertStatus("success")
                    setTimeout(() => {
                        setFields(false)
                    }, 4000)
                }
            )
        })
    }

    const deleteImage = () => {
        setIsLoading(true)
        const deleteRef = ref(storage, imageAsset)
        deleteObject(deleteRef).then(() => {
            setImageAsset(null)
            setIsLoading(false)
            setFields(true)
            setMsg("Image deleted Successfully 😊")
            setAlertStatus("success")
            setTimeout(() => {
                setFields(false)
            }, 4000)
        })

    }

    const saveDetails = () => {
        setIsLoading(true)
        try {
            if (!title || !calories || !imageAsset || !price || !category) {
                setFields(true)
                setMsg("Required fields can't be empty")
                setAlertStatus("danger")
                setTimeout(() => {
                    setFields(false)
                    setIsLoading(false)
                }, 4000)
            } else {
                const data = {
                    id: `${Date.now()}`,
                    title: title,
                    imageURL: imageAsset,
                    category: category,
                    calories: calories,
                    qty: 1,
                    price: price,
                }
                saveItem(data)
                setIsLoading(false)
                setFields(true)
                setMsg("Details added Successfully 😊")
                setAlertStatus("success")
                setTimeout(() => {
                    setFields(false)
                    clearData()
                }, 4000)
            }

        } catch (error) {
            console.log(error)
            setFields(true)
            setMsg("Error while uploading, Try Again 🙇");
            setAlertStatus("danger")
            setTimeout(() => {
                setFields(false)
                setIsLoading(false)
            }, 4000);
        }

        fetchData()

    }

    const fetchData = async () => {
        await getAllFoodItems().then((data) => {
            dispatch({
                type: actionType.SET_FOOD_ITEMS,
                foodItems: data,
            })
        })
    }

    const clearData = () => {
        setTitle("");
        setImageAsset(null);
        setCalories("");
        setPrice("");
        setCategory("");
    };

    const menuClassName = () =>
        `text-md bg-white rounded-3xl shadow-xl w-full`

    const menuItemClassName = () =>
        `rounded-xl text-lg focus:outline-none hover:text-white hover:bg-slate-600 gap-20`;

    return (
        <div className="w-full min-h-[88vh] md:min-h-[84vh] flex items-center justify-center overflow-hidden">
            <div className="w-[90%] md:w-[75%] border border-gray-400 rounded-3xl p-4 flex flex-col items-center justify-center gap-7">
                {
                    fields && (
                        <m.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`w-full p-2 rounded-xl text-center text-lg font-semibold
                            ${alertStatus === "danger" ?
                                    "bg-red-400 text-red-800" : "bg-emerald-400 text-emerald-800"}`
                            }
                        >
                            {msg}
                        </m.p>
                    )
                }

                <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                    <IoFastFood className="text-2xl text-gray-700" />
                    <input
                        type="text"
                        required
                        value={title}
                        placeholder='Give a Title..'
                        onChange={(e) => setTitle(e.target.value)}
                        className='w-full h-full text-xl bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor'
                    />
                    {
                        title && (
                            <button className="text-3xl text-gray-700" onClick={() => { setTitle("") }}>
                                <MdDeleteSweep />
                            </button>
                        )
                    }
                </div>

                <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                    <MdCategory className="text-2xl text-gray-700" />

                    {
                        category ?
                            (
                                <div className="w-full h-full text-xl bg-transparent font-semibold outline-none border-none text-textColor flex items-center">
                                    <span>
                                        {category}
                                    </span>
                                    <img src={foodImg} className='w-10 h-10 ml-10' alt="" />
                                </div>
                            ) : (
                                <Menu
                                    className={menuClassName}
                                    menuButton={
                                        <MenuButton >
                                            <div className="text-gray-400 text-xl font-semibold flex gap-5 items-center">
                                                Select Food Category
                                                <AiFillCaretDown className='ml-auto' />
                                            </div>
                                        </MenuButton>
                                    }
                                    transition
                                >
                                    {categories &&
                                        categories.map((c) => (
                                            <MenuItem
                                                key={c.id}
                                                value={c.urlParamName}
                                                onClick={(e) => {
                                                    setCategory(e.value)
                                                    setFoodImg(c.imgSrc)
                                                }}
                                                className={menuItemClassName}
                                            >
                                                {c.name}
                                                <img className='w-10 h-10 ml-auto' src={c.imgSrc} alt={c.name} />
                                            </MenuItem>

                                        ))}
                                </Menu>
                            )
                    }

                    {
                        category && (
                            <button className="text-3xl text-gray-700" onClick={() => { setCategory("") }}>
                                <MdDeleteSweep />
                            </button>
                        )
                    }

                    {/* <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="outline-none bg-transparent w-full text-base rounded-xl cursor-pointer"
                    >
                        <option value="other" className="bg-white">
                            Select Category
                        </option>
                        {categories &&
                            categories.map((c) => (
                                <option
                                    key={c.id}
                                    className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                                    value={c.urlParamName}
                                >
                                    {c.name}
                                </option>
                            ))}
                    </select> */}
                </div>

                <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-3xl">
                    {
                        isLoading ?
                            <Loader /> :
                            <>
                                {
                                    !imageAsset ?
                                        <>
                                            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                                <div className='w-full h-full flex flex-col items-center justify-center text-xl font-semibold text-gray-400 hover:text-gray-900 duration-200 transition-all ease-in-out gap-2'>
                                                    <GiCloudUpload className='text-3xl' />
                                                    <p>
                                                        Upload an Image Here
                                                    </p>
                                                </div>
                                                <input type="file" name="uploadImage" accept='image/*' onChange={uploadImage} className='w-0 h-0' />
                                            </label>
                                        </> :
                                        <>
                                            <div className="relative h-full">
                                                <img
                                                    src={imageAsset}
                                                    alt="uploaded image"
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                                                    onClick={deleteImage}
                                                >
                                                    <MdDeleteForever className="text-white" />
                                                </button>
                                            </div>
                                        </>
                                }
                            </>
                    }
                </div>

                <div className="w-full flex flex-col md:flex-row items-center gap-3">
                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2 ">
                        <MdFoodBank className="text-3xl text-gray-700" />
                        <input
                            type="number"
                            required
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            placeholder="Calories"
                            className="w-full h-full text-lg bg-transparent outline-none border-none font-semibold placeholder:text-gray-400 text-textColor"
                        />
                        {
                            calories && (
                                <button className="text-3xl text-gray-700" onClick={() => { setCalories("") }}>
                                    <MdDeleteSweep />
                                </button>
                            )
                        }

                    </div>

                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2 ">
                        <LuIndianRupee className="text-3xl text-gray-700" />
                        <input
                            type="number"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                            className="w-full h-full text-lg bg-transparent outline-none border-none font-semibold placeholder:text-gray-400 text-textColor"
                        />
                        {
                            price && (
                                <button className="text-3xl text-gray-700" onClick={() => { setPrice("") }}>
                                    <MdDeleteSweep />
                                </button>
                            )
                        }

                    </div>

                </div>

                <div className="flex items-center w-full">
                    <button
                        type="button"
                        className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
                        onClick={saveDetails}
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>
    )
}



export default CreateContainer