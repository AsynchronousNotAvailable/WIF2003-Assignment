import { useTable } from 'react-table'
import React, { useMemo } from 'react'
import MOCK_DATA from './MOCK_DATA.json'
import {GROUPED_COLUMNS } from './order_columns'

export const BasicTable = () => {
    const columns = useMemo(() => GROUPED_COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
    const tableInstance = useTable({
        columns: columns,
        data: data
    }
    )

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow, 
        footerGroups,
    } = tableInstance
    return (
        <table className='flex-1'{...getTableProps()}>
            <thead className='border-b-2 border-border-grey content-start text-left'>
                {headerGroups.map((headerGroup) => (
                    <tr className='flex-auto'{...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>   
                ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
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
            <tfoot className='border-b-2 border-border-grey content-start text-left'>
                {
                    footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {
                                footerGroup.headers.map(column => (
                                    <td {...column.getFooterProps}>
                                        {
                                            column.render('Footer')
                                        }
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tfoot>
        </table>
    )
}