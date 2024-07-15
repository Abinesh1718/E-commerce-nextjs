import ProductForm from "../../../components/admin-panel/ProductForm";
import React from "react";
const Products = () => {
    return (
        <div className="h-[calc(100vh-96px)]  rounded-8 w-full grid place-items-center overflow-y-auto">
            <div className="bg-white w-[900px] rounded-8g p-4">
                <ProductForm />
            </div>
        </div>
    );
};
export default Products;