import React, { useState } from 'react';
import { useEffect } from 'react';
import styles from './Pagination.module.scss'

export default function Pagination({ itemsTotal, actualPage, handleSearch, data, resetPage}) {

    const [page, setPage] = useState(actualPage)
    const [items, setItems] = useState([])

    useEffect(() => {
        const items = []
        for (let i = 1; i <= itemsTotal; i++) {
            items.push(i)
        }
        setItems(items)
        setPage(1)
        console.log('reset pagination')
        
        
    },[itemsTotal, resetPage])

    const searchDatabase = (item) => {
        handleSearch({...data, page: item})
        setPage(item)
    }

    return (
        <>
            <div className={styles['__list']}>
                <ul>
                    <li className={styles['pages']}>Páginas:</li>
                    {items.map((item, index) => {
                        return (
                            <li key={index} className={`${item == page ? styles['active'] : ''}`}>
                                <button  onClick={() => searchDatabase(item)}>{item} </button>
                            </li>
                        )
                    })}
                </ul>
            </div>

        </>
    )
}
