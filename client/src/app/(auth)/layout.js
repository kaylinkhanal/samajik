import { Card } from '@/components/ui/card'
import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
                {children}
        </Card>
        </div>
  )
}

export default AuthLayout