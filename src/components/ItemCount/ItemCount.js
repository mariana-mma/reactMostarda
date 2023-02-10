import { useState } from "react"
import "./ItemCount.css"

const ItemCount = ({stock = 0, initial = 1, onAdd}) => {
    const [count, setCount] = useState(initial)


    const increment = () => {
        if(count < stock){
            setCount(count + 1)
        }
    }

    const decrement = () => {
        if(count > 1){
            setCount(count - 1)
        }
    }

    return(
        <div className="item-count--container">
            <div className="counter-container">
                <button className="counter-btn" onClick={decrement}>-</button>
                <p className="counter-text">{count}</p>
                <button className="counter-btn" onClick={increment}>+</button>
            </div>
            <div>
                <button className="add-btn" onClick={() => onAdd(count)}>Add to cart</button>
            </div>
        </div>
    )
}

export default ItemCount