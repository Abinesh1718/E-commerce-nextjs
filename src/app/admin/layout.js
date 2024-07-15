
'use client'
import React from 'react'
import { useAppSelector } from '../../components/redux/hook'
import { useSession } from 'next-auth/react'
import Login from '../../components/admin-panel/Login'
import Loader from '../../components/admin-panel/Loader'
import Sidebar from '../../components/admin-panel/Sidebar'

const layout = ({ children }) => {
    const isLoading = useAppSelector(data => data.loadingReducer)

    // const { data: session } = useSession()

    // if (!session?.user) {
    //     return <Login />
    // }

    return (
        <div className="flex">
            <Sidebar />
            {isLoading && <Loader />}
            <div className="w-full h-full">
                <div className="bg-gray-200 p-4 h-[calc(100vh-64px)]">
                    {children}
                </div>
            </div>

        </div>
    )
}
export default layout

