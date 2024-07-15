
'use client'
import Image from "next/image";
import Navbar from "../components/front-end/Navbar";
import { useState } from "react";
import Cart from '../components/front-end/Cart'
import Products from '../components/front-end/Products'

export default function Home() {
  const [showcart, setshowcart] = useState(false)
  const [search, setsearch] = useState("")
  return (
    <main>
      <Navbar setsearch={setsearch} setshowcart={setshowcart} />
      {showcart && <Cart setshowcart={setshowcart} />}
      <Products search={search} />
    </main>
  );
}
