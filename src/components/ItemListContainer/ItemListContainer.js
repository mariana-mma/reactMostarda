import { useState, useEffect} from 'react'
import { getProducts } from '../asyncMock'
import ItemList from '../ItemList/ItemList'


const ItemListContainer = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProducts().then(res => {
            console.log(res)
            setProducts(res)
        }).finally(() => {
            setLoading(false)
        })
    },[])

    if(loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <h1>DISCOVER MUSIC</h1>
            <ItemList products={products}/>
        </div>
    )

}

export default ItemListContainer