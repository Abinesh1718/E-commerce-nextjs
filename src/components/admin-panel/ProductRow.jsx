import React from 'react'

import { useAppDispatch } from '../redux/hook'
import { addProduct } from '../redux/features/productSlice';
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { setLoading } from '../redux/features/loadingReducer';
import axios from 'axios';
import { makeToast } from '../../app/utlis/helper';


const ProductRow = ({
    srNo,
    setOpenPopup,
    setUpdateTable,
    product,
}) => {
    const dispatch = useAppDispatch()

    const onEdit = () => {
        console.log("Prodd", product);
        dispatch(addProduct(product));
        setOpenPopup(true);
    };
    const onDelete = (id) => {
        console.log(id);
        dispatch(setLoading(true));
        axios.delete(`/api/delete/${id}`)
            .then(res => {
                setUpdateTable(prev => !prev)
                makeToast('Product Deleted successfully!')
            })

            .catch(err => console.log(err))
            .finally(() => dispatch(setLoading(false)));

    };

    return (
        <tr className='mar-4'>
            <td className="text-left">
                <div>{srNo}</div>
            </td>
            <td className="text-left">
                <div>{product.name}</div>
            </td>
            <td className="text-left">${product.price}</td>
            <td className="text-left py-2">
                <img
                    // src={product.imgsrc}
                    width={40}
                    height={40}
                    alt="product_image" />
            </td>
            <td className="text-left">
                <div className="text-2x1 flex items-center gap-2 text-gray-600">
                    <BiEditAlt
                        className="cursor-pointer hover:text-black"
                        onClick={onEdit} />
                    <MdDelete
                        className="text-[20px] cursor-pointer hover:text-red-600"
                        onClick={() => onDelete(product?.id)}
                    />
                </div>
            </td>
        </tr>

    )
};
export default ProductRow;