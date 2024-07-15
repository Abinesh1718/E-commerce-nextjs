import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { ImHome } from "react-icons/im";
import { TbShoppingCartFilled } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
import { RiSettings4Fill } from "react-icons/ri";

import { MdOutlineSupervisorAccount } from "react-icons/md";
import { SiShopify } from "react-icons/si";


function Sidebar() {
  const pathname = usePathname()

  const menu = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      logo: <ImHome />

    },
    {
      title: "Create a Product",
      href: "/admin/products",
      logo: <TbShoppingCartFilled />

    },
    {
      title: "Shoping",
      href: "/",
      logo: <SiShopify />

    }


  ]
  return (
    <div className="bg-white w-[300px] min-h-screen p-4 shrink-0">
      <div className='flex items-center gap-4'>
        {/* <img className='size-10 ' alt='Logo' /> */}
        <h2 className='text-[20px] font-semibold'>Seller User</h2>

      </div>
      <ul className='space-y-4 mt-6'>

        {menu.map((menu, index) => <Link key={index} href={menu.href} className={`flex gap-5 items-center p-4 cursot-pointer rounded-lg hover:bg-pink hover:text-white ${pathname === menu.href ? 'bg-pink text-white ' : 'bg-gray-300'}`} >

          <div>{menu?.logo}</div>

          {menu.title}

        </Link>)}

      </ul>

    </div>
  )
}

export default Sidebar