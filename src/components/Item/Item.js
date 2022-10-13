const Item = ({image, album ,name, genre, price}) => {
    return (
        <div>
            <img src={image} alt={name} style={{height: 300}}/>
            <section>
                <h4>{album}</h4>
                <h5>{name}</h5>
                <h5>{genre}</h5>
                <p>U$S {price}</p>
                <button>Details</button>
            </section>
            
        </div>
    )
}

export default Item