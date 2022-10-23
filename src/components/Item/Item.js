import {Link} from 'react-router-dom'
import './Item.css'

const Item = ({id, image, album ,name, genre, price}) => {
    return (
        <div className='card-container'>
            <img src={image} alt={name} style={{height: 350}}/>
            <section className='card-item'>
                <h5>{album}</h5>
                <div>
                    <p>Artist: {name}</p>
                    <p>Genre: {genre}</p>
                </div>
                <div>
                    <p>Price: U$S {price}</p>
                    <div>
                        <Link to={`/detail/${id}`} className='card-item-detail'>More details</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Item