import './ItemDetail.css'
import ItemCount from '../ItemCount/ItemCount'
import { CartContext } from '../../context/CartContext'
import { useContext } from 'react'

const ItemDetail = ({ id, image, album , name, genre, stock, price, description}) => {
    const { addToCart } = useContext(CartContext)
    
    const handleOnAdd = (count) => {
        const item = {
            id, album, name, price, count, image
        }
        addToCart(item)
        console.log(item)
    }// change name of function
    
    return (
        <div className="CardItem">
            <div>
                <img src={image} alt={album} className="DetailImg"/>
            </div>
            <div>
                <h3>{album}</h3>
                <h4>{name}</h4>
            </div>
            <div>
                <p>Genre: {genre}</p>
                <p>Price: {price}</p>
                <p>Description: {description}</p>
            </div>
            <div>
                <ItemCount onAdd={handleOnAdd} stock={stock}/>
            </div>
        </div>
    )
}

export default ItemDetail