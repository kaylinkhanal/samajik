'use client'

import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  productName: Yup.string().required('Product name is required'),
  productPrice: Yup.number().positive('Price must be positive').required('Price is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
})

const Products = () => {
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/categories')
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const initialValues = {
    productName: '',
    productPrice: '',
    description: '',
    category: '',
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post('http://localhost:8080/products', values)
      alert('Product added successfully!')
      // Reset form or redirect user
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Failed to add product')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field
                name="productName"
                type="text"
                placeholder="Product Name"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage name="productName" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <Field
                name="productPrice"
                type="number"
                placeholder="Product Price"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage name="productPrice" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <Field
                name="description"
                as="textarea"
                placeholder="Description"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <Field
                as="select"
                name="category"
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select a category</option>
                {categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.categoryName}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              {isSubmitting ? 'Submitting...' : 'Add Product'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Products