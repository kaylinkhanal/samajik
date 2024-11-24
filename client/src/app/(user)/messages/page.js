'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Messages = () => {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])


    const fetchCategoriesAndProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/categories')
        const  {data: productData}  = await axios.get('http://localhost:8080/products')

        setCategories(data)
        setProducts(productData)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
  
    useEffect(() => {
        fetchCategoriesAndProducts()
    }, [])
  return (
    <div>
        {products.map((item)=>{
            return (
                <div className='m-2 p-2 bg-orange-300 rounded-xl'>
                    {item.productName}
                    {item.productPrice}
                </div>
            )
        })}
        {JSON.stringify(products)}
        {JSON.stringify(categories)}

    </div>
  )
}

export default Messages