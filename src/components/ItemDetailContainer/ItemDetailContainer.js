import './ItemDetailContainer.css';
import { useState, useEffect } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase/index';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)

    const {productId} = useParams()

    useEffect(() => {
        const docRef = doc(db, 'products', productId)

        getDoc(docRef).then(res => {
            const data = res.data()
            const productAdapted = { id: res.id, ...data }
            
            setProduct(productAdapted)
        }).catch(err => {
            console.log(err)
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

