'use client'

import { ReactNode } from "react"
import { SessionProvider } from 'next-auth/react'


const AuthProvider = ({ children }) => {
    return <div>
        {children}
        {/* // <SessionProvider> */}

        {/* </SessionProvider> */}
    </div>


}

export default AuthProvider