import { useTable, useSortBy, usePagination} from 'react-table'
import React, { useMemo, useState} from 'react'
import MOCK_DATA from './MOCK_DATA.json'
import { ORDER_COLUMNS } from './order_columns'
import {ReactPaginate} from 'react-paginate'


export const SortingTable = () => {
    const columns = useMemo(() => ORDER_COLUMNS, [])      

    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable({
        columns: columns,
        data: data
    },
    useSortBy,
    usePagination
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
        prepareRow, 
        gotoPage,
        pageCount, 
    } = tableInstance
    
    const {pageIndex} = state

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
                {page.map(row => {
                    prepareRow(row)
                    return (
                        <tr className='h-14 border-b border-border-grey'{...row.getRowProps()}>
                            {   
                                row.cells.map(
                                    cell => {
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
        <div className='float-right'>
            <span className='inline-block'>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <ul>
                <li className='inline-block'>
                    <button className="bg-button-blue rounded-lg mx-2 h-7 px-4" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                </li>
                <li className='inline-block'>
                    <button className="bg-button-blue rounded-lg mx-2 h-7 px-4" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
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
                    <button className='bg-button-blue rounded-lg mx-2 h-7 px-4' onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                </li>
                <li className='inline-block'>
                    <button className="bg-button-blue rounded-lg mx-2 h-7 px-4" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                </li>
            </ul>
        </div>
        </div>
    )
}