import './ItemDetailContainer.css';
import { useState, useEffect } from 'react';
import { getProductById } from '../asyncMock';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)

    const {productId} = useParams()

    useEffect(() => {
        getProductById(productId).then(res => {
            setProduct(res)
        }).finally(() => {
            setLoading(false)
        })
    },[productId])

    if(loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <ItemDetail {...product} />
        </div>
    )
}

export default ItemDetailContainer

