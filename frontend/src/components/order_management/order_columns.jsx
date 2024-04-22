import {format} from 'date-fns'
import React, {useState, useRef, useImperativeHandle, } from 'react'
import OrderManagement from '../../pages/seller/order_management'
import { SortingTable } from './sorting_table'


export const GROUPED_COLUMNS = [
    {
        Header: 'Order ID',
        Footer: 'Order ID',
        accessor: 'order_id',
    },
    {
        Header: "Order",
        Footer: "Order",
        columns: [
            {
                Header: 'Product',
                Footer: 'Product',
                accessor: 'product'
        
            },
            {
                Header: 'Date',
                Footer: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Customer',
                Footer: 'Customer',
                accessor: 'customer',
            },
        ]
    },
    {
        Header: 'Payment Info',
        Footer: 'Payment Info',
        columns: [
            {
                Header: 'Payment',
                Footer: 'Payment',
                accessor: 'payment',
            },
            {
                Header: 'Total',
                Footer: 'Total',
                accessor: 'total',
            },
            {
                Header: 'Status',
                Footer: 'Status',
                accessor: 'status',
            },
        ]
    },
    {
        Header: 'Action',
        Footer: 'Action',
        accessor: 'action',
    }
]