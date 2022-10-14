import {useState, useEffect} from 'react'
import {getProducts, getProductsByGenre} from '../asyncMock'
import ItemList from '../ItemList/ItemList'
import {useParams} from 'react-router-dom'


const ItemListContainer = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const {genreId} = useParams()

    useEffect(() => {
        setLoading(true)

        const asyncFunction = genreId ? getProductsByGenre : getProducts

        asyncFunction(genreId).then(res => {
            setProducts(res)
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
        <div>
            <h1>DISCOVER MUSIC</h1>
            <ItemList products={products}/>
        </div>
    )

}

export default ItemListContainer