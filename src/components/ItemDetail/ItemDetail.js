import './ItemDetail.css'
import ItemCount from '../ItemCount/ItemCount'

const ItemDetail = ({ id, image, album , name, genre, stock, price, description}) => {
    const handleOnAdd = (count) => {
        const productToAdd = {
            id, album, name, price, count
        }
        console.log(productToAdd)
    }
    
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