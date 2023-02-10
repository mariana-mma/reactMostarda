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
    }
    
    return (
        <div className="CardItem">
            <div>
                <img src={image} alt={album} className="DetailImg"/>
            </div>
            <div>
                <div className="DetailName">
                    <h4>{album}</h4>
                    <h5>{name}</h5>
                </div>
                <div className="DetailInfo">
                    <p><strong>Genre: </strong>{genre}</p>
                    <p><strong>Price: </strong>{price}</p>
                    <p><strong>Description: </strong>{description}</p>
                </div>
            </div>
            <div>
                { stock !== 0 ? <ItemCount onAdd={handleOnAdd} stock={stock}/> : <p>Currently out of stock</p>}
            </div>
        </div>
    )
}

export default ItemDetail