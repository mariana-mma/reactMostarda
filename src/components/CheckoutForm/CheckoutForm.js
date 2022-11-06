import './CheckoutForm.css'
import { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { addDoc, collection, getDocs, query, where, documentId, writeBatch } from 'firebase/firestore'
import { db } from '../../services/firebase/index'

const CheckoutForm = () => {
    const [loading, setLoading] = useState(false)
    const { cart, getTotal } = useContext(CartContext)
    const totalPrice = getTotal()

    const createOrder = async () => {
        setLoading(true)

        try {
            const objOrder = {
                buyer: {
                    name: 'Mariana',
                    phone: '097862250',
                    mail: 'mmabal@mail.com'
                },
                items: cart,
                total: totalPrice
            }

            const batch = writeBatch(db)
            const outOfStock = []
            const ids = cart.map(prod => prod.id)
            const productsRef = collection(db, 'products')
            const productsFromFirestore = await getDocs(query(productsRef, where(documentId(), 'in', ids)))

            const {docs} = productsFromFirestore

            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock

                const productFromCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productFromCart?.count

                if(stockDb >= prodQuantity){
                    batch.update(doc.ref, { stock: stockDb - prodQuantity})
                }else{
                    outOfStock.push({ id: doc.id, ...dataDoc})
                }
            })

            if(outOfStock.length === 0){
                await batch.commit()

                const orderRef = collection(db, 'orders')
                const orderAdded = await addDoc(orderRef, objOrder)

                console.log('success msg');
            }else{
                console.log('error msg')
            }

        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
        

        // const collectionRef = collection(db, 'orders')

        // addDoc(collectionRef, objOrder).then(res => {
        //     console.log(res.id)
        // }).catch(err => {
        //     console.log(err)
        // })
    }

    if(loading){
        return <h2>Your order is being generated..</h2>
    }

    return (
        <div>
            <h1>Checkout</h1>
            <div>
                <h4>Items</h4>
                <p>Total: U$S {totalPrice}</p>
            </div>
            <h2>Form</h2>
            <button onClick={createOrder}>Finish purchase</button>
        </div>
    )
}

export default CheckoutForm