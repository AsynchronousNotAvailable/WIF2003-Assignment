import React, { useState } from 'react'

function ProductFilter({column}) {
    const{filterValue, setFilter} = column
    
    function handleFilterChange(event){
        setFilter(event.target.value);
    }
    return (
        <>
            <input 
                value={filterValue}
                type="text" placeholder="Search product" 
                onChange={handleFilterChange}
                className="flex-1 border-2 me-4 border-border-grey ps-2 rounded-lg">
            </input></>
    )
}

export default ProductFilter
