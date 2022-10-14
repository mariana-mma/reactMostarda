import { useState } from "react"

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
        <div>
            <div>
                <button onClick={decrement}>-</button>
                <h2>{count}</h2>
                <button onClick={increment}>+</button>
            </div>
            <div>
                <button onClick={() => onAdd(count)}>Add to cart</button>
            </div>
        </div>
    )
}

export default ItemCount