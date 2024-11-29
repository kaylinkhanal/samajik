'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import { useFormik } from 'formik'
import { useRouter } from "next/navigation"
import * as Yup from 'yup'

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  gender: Yup.string().oneOf(['Male', 'Female', 'Other'], 'Invalid gender').required('Gender is required'),
  dateOfBirth: Yup.date().required('Date of birth is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  phoneNumber: Yup.string().matches(/^[0-9]+$/, 'Must be only digits').min(10, 'Must be exactly 10 digits').max(10, 'Must be exactly 10 digits').required('Phone number is required')
})

export default function Register() {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      gender: 'Male',
      dateOfBirth: '',
      password: '',
      phoneNumber: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Handle form submission here
      try {
        const { data: { msg }, status } = await axios.post(`http://localhost:8080/register`, values)
        if (status == 200) { router.push("/") }
        console.log({ msg, status })
      } catch (err) {
        alert(err?.response?.data?.msg)
        console.log("err:", err)
      }
    },
  })
  const handleLoginRedirect = () => {
    router.push("/login") // Redirect to the login page
}

  return (
    (
        <form onSubmit={formik.handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
            <CardDescription>Create your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" {...formik.getFieldProps('fullName')} />
              {formik.touched.fullName && formik.errors.fullName ? (
                <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...formik.getFieldProps('email')} />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                onValueChange={(value) => formik.setFieldValue('gender', value)}
                defaultValue={formik.values.gender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {formik.touched.gender && formik.errors.gender ? (
                <div className="text-red-500 text-sm">{formik.errors.gender}</div>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input id="dateOfBirth" type="date" {...formik.getFieldProps('dateOfBirth')} />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                <div className="text-red-500 text-sm">{formik.errors.dateOfBirth}</div>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...formik.getFieldProps('password')} />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" type="tel" {...formik.getFieldProps('phoneNumber')} />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
              ) : null}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Sign Up</Button>
            <div className="mt-4 text-center">
                <span>Already have an account? </span>
                <Button variant="link" onClick={handleLoginRedirect}>
                    Login
                </Button>
            </div>
          </CardFooter>
          
        </form>
     )
  );
}
