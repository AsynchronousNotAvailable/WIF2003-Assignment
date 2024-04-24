import React from 'react'

export const GlobalFilter = ({filter, setFilter}) => {
    return(
        <span>
            <input
            className="h-full flex border-2 me-4 border-border-grey ps-2 rounded-lg w-full"
            value={filter}
            onChange={e => setFilter(e.target.value)}
                        type="text"
                        placeholder="Search product"
                        
                    ></input>
        </span>
    )
}