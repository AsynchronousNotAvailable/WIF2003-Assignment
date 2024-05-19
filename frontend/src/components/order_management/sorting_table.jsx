import { useTable, useSortBy, usePagination, useGlobalFilter, useFilters, } from 'react-table'
import React, { useMemo, useState, useEffect, forwardRef, useImperativeHandle, useContext} from 'react'
import { GlobalContext } from "../../context";
import axios  from 'axios';


let renderCount = 0
function SortingTable(props, ref){
    const columnsData = props.columns;
    const dataImport = props.data; 
    const dateFilter = props.dateFilter; 
    const [data, setData] = useState(dataImport);
    const { seller } = useContext(GlobalContext);
     
    
    
    const columns = useMemo(() => columnsData, [data])      

    function handleEditData(productID){
        
    }
    
    function handleDeleteData(productID){
        const username = seller.username; 
        axios.delete(`http://localhost:8080/api/sellers/${username}/${productID}/delete`).then((_) => {
            window.alert("Product is delete successfully.")
            axios.get(`http://localhost:8080/api/sellers/${username}/products`).then((response) => {
                setData(response.data);
            });
        })
    }
    
    function handleHideData(){
        
    }

    
    

    const tableInstance = useTable({
        columns,
        data
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    )

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page, 
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions, 
        state, 
        setGlobalFilter, 
        prepareRow, 
        gotoPage,
        pageCount, 
    } = tableInstance
    const { globalFilter} = state; 
    const {pageIndex} = state
    renderCount++
    useImperativeHandle(ref, () => {
        return {
            handleDeleteData: (productID) => handleDeleteData(productID),
            handleEditData: (productID) => {handleEditData(productID)},
            handleHideData: () => {alert("hi")},
            globalFilter: globalFilter, 
            setGlobalFilter: setGlobalFilter, 
        };

    }, []);
    return (
        <div className='flex-auto w-full'>
         <table className='flex-1 w-full mb-5'{...getTableProps()}>
            <thead className='border-b-2 border-border-grey content-start text-left'>
                {headerGroups.map((headerGroup) => (
                    <tr className='flex-auto'{...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                </span>
                            </th>
                        ))}
                    </tr>   
                ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.filter(row => {
                    let filterPass = true;
                    const date = new Date(row.values.createdDateTime)
                    if(dateFilter?.startDate){
                        filterPass = filterPass && (new Date(dateFilter.startDate) < date)
                    }
                    if(dateFilter?.endDate){
                        filterPass = filterPass && (new Date(dateFilter.endDate) > date)
                    }
                    return filterPass;
                }).map(row => {
                    prepareRow(row)
                    return (
                        <tr className='h-14 border-b border-border-grey'{...row.getRowProps()}>
                            {   
                                row.cells.map(
                                    cell => {
                                        //return <td className={`${cell.column.Header === "SKU" ? 'text-button-100' : 'text-textGrey-400'}`} {...cell.getCellProps()}/>
                                        return <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    }
                                )
                            }

                        </tr>
                    )
                })}
            </tbody>
        </table>
        <div className='float-right pb-3'>
            <span className='inline-block mb-2'>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <ul>
                <li className='inline-block'>
                    <button className="disabled:bg-textGrey-400 bg-button-100 rounded-lg mx-2 h-7 px-4 w-14" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                </li>
                <li className='inline-block'>
                    <button className="disabled:bg-textGrey-400 bg-button-100 rounded-lg mx-2 h-7 px-4 w-14" onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>
                </li>
                <li className='inline-block'>
                    {
                        pageCount < 6 && 
                        Array.from(Array(pageCount).keys()).map((_, i) => {
                            return <li>
                                <button onClick={() => gotoPage(i + 1)}></button>
                            </li>
                        }
                    )
                    }
                </li>
                <li className='inline-block'>
                    <button className='disabled:bg-textGrey-400 bg-button-100  rounded-lg mx-2 h-7 px-4 w-14' onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
                </li>
                <li className='inline-block'>
                    <button className="disabled:bg-textGrey-400 bg-button-100  rounded-lg mx-2 h-7 px-4 w-14" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                </li>
            </ul>
        </div>
        </div>
    )
}

export default React.forwardRef(SortingTable);