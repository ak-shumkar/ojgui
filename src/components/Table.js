import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import makeData from './makeData'
import axios from 'axios';
import DATA from './DATA.json'
import './css/table.css'

function MakeTable({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <div className='main'>
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
        </div>
    )
}

function Table() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',

            },
            {
                Header: 'username',
                accessor: 'username',

            },
            {
                Header: 'Rating',
                accessor: 'rating',
            },
        ],
        []
    )

    // const data = React.useMemo(() => makeData(20), [])
    const data = useMemo(() => DATA, []);
    return (
        <div>
            <MakeTable columns={columns} data={data} />
        </div>
    )
}

export default Table;
