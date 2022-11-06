import { useState } from "react"
import './Form.css'

const Form = ({createOrder}) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        createOrder({
            email,
            name,
            phone
        });
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div>
                <label>Email:
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        autoComplete="off"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                
            </div>
            <div>
                <label>Complete name and surname: 
                    <input
                        className="form-input"
                        type="text"
                        name="name"
                        autoComplete="off"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>Phone number:
                    <input
                        className="form-input"
                        type="tel"
                        name="phone"
                        autoComplete="off"
                        required
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </label>
            </div>
            <button className="buttonComplete" type="submit">Finish purchase</button>
        </form>
    )
}

export default Form