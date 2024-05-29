import React from "react";


export default function Seller({ sellerId, name, pfp, navigateToShop }) {
    console.log(sellerId, name, pfp);
    return (
        <div
            
            className=" flex flex-col justify-center max-w-sm h-92 mx-5 my-5 rounded-xl shadow-xl px-10 py-10 items-center hover:bg-slate-100"
            onClick={() => navigateToShop(sellerId)}
        >
            <img
                src={pfp}
                className="border-gray-500 border-2 w-[110px] h-[110px] rounded-full shadow-2xl object-contain mb-5"
            />
            <p className="font-sans font-light text-xl">{name}</p>
        </div>
        
    );
}
