'use client'

import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSelector } from 'react-redux'
import axios from 'axios'

const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
})

export default function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {userDetails}= useSelector(state=>state.user)



  const handleSubmit = async (values) => {
    try {
      // Extract userId from wherever it's stored (e.g., from context, props, or local storage)
      const userId = userDetails.user._id;
  
      // Make PATCH request to change password
      const response = await axios.patch(`http://localhost:8080/change-password/${userId}`, {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      });
  
      // Set success status
     
      
    } catch (error) {
        // Handle error
        
      }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-orange-50">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-orange-700">Change Password</CardTitle>
        <CardDescription className="text-orange-600">
          Enter your current password and choose a new one
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
          validationSchema={PasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, status }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-orange-700">Current Password</Label>
                <div className="relative">
                  <Field
                    as={Input}
                    id="currentPassword"
                    name="currentPassword"
                    type={showCurrentPassword ? 'text' : 'password'}
                    className="pr-10 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-5 w-5 text-orange-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-orange-500" />
                    )}
                  </button>
                </div>
                {errors.currentPassword && touched.currentPassword && (
                  <p className="text-red-500 text-sm">{errors.currentPassword}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-orange-700">New Password</Label>
                <div className="relative">
                  <Field
                    as={Input}
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    className="pr-10 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-5 w-5 text-orange-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-orange-500" />
                    )}
                  </button>
                </div>
                {errors.newPassword && touched.newPassword && (
                  <p className="text-red-500 text-sm">{errors.newPassword}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-orange-700">Confirm New Password</Label>
                <div className="relative">
                  <Field
                    as={Input}
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="pr-10 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-orange-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-orange-500" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                {isSubmitting ? 'Changing Password...' : 'Change Password'}
              </Button>

              {status && status.success && (
                <p className="text-green-600 text-center">{status.success}</p>
              )}
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}

