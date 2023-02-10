import { useState, useEffect } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase/index';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ItemDetailContainer = () => {
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)

    const {productId} = useParams()

    useEffect(() => {
        const docRef = doc(db, 'products', productId)
        const MySwal = withReactContent(Swal)

        getDoc(docRef).then(res => {
            const data = res.data()
            const productAdapted = { id: res.id, ...data }
            
            setProduct(productAdapted)
        }).catch(err => {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: err
            })
        }).finally(() => {
            setLoading(false)
        })

    },[productId])

    if(loading) {
        return <h1 style={{textAlign: 'center'}}>Loading...</h1>
    }

    return (
        <div>
            <ItemDetail {...product} />
        </div>
    )
}

export default ItemDetailContainer

