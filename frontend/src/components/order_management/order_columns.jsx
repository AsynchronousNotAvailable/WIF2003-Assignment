import {format} from 'date-fns'

export const ORDER_COLUMNS = [
    {
        Header: 'Order ID',
        Footer: 'Order ID',
        accessor: 'order_id',
    },
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
    {
        Header: 'Total',
        Footer: 'Total',
        accessor: 'total',
    },
    {
        Header: 'Payment',
        Footer: 'Payment',
        accessor: 'payment',
    },
    {
        Header: 'Status',
        Footer: 'Status',
        accessor: 'status',
    },
    {
        Header: 'Action',
        Footer: 'Action',
        accessor: 'action',
    }
]

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