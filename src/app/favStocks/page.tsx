"use client"

import { useState, useEffect } from "react"

export default function Page(){

    const [allFavStocks, setAllFavStocks] = useState<string[]>([])

    useEffect(() => {
    const getAllFavStocksList = localStorage.getItem("favStocks");
    setAllFavStocks(getAllFavStocksList ? JSON.parse(getAllFavStocksList) : []);
  }, []);


    const handleDelete = (item: string)=>{
        const updatedList = allFavStocks.filter((items)=> items!== item ) 
        setAllFavStocks(updatedList)
        localStorage.setItem("favStocks", JSON.stringify(updatedList))
    }

    return(
        <div>
            <h1>Your fav stocks</h1>
            {allFavStocks.map((items, index)=>(
                <li key={index} > {items} <button onClick={()=>handleDelete(items)}  >Delete</button> </li>
            ))}

        </div>
    )
}