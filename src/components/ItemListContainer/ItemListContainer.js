import { useState, useEffect } from 'react'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import './ItemListContainer.css'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../../services/firebase/index'


const ItemListContainer = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const {genreId} = useParams()

    useEffect(() => {
        setLoading(true)

        const collectionRef = genreId 
        ? query(collection(db, 'products'), where('genre', '==', genreId)) 
        : collection(db, 'products')

        getDocs(collectionRef).then(res => {
            console.log(res)
            const productsAdapted = res.docs.map(doc =>{
                const data = doc.data()

                return { id: doc.id, ...data }
            })

            setProducts(productsAdapted)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }, [genreId])

    if(loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='products-container'>
            <h2>DISCOVER MUSIC</h2>
            <ItemList products={products}/>
        </div>
    )

}

export default ItemListContainer