import axios from 'axios'
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function AddUser() {

    let navigate = useNavigate()

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    })

    const {name, username, email} = user

    const onInputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/add", user)
        navigate("/")
    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <div className="mt-3">
                <input
                    type='text'
                    className="form-control mb-3"
                    name="username"
                    placeholder="Nhập username"
                    value={username}
                    onChange={(e) => {
                        onInputChange(e)
                    }}
                />
                <input
                    type="text"
                    className="form-control mb-3"
                    name="name"
                    placeholder="Nhập name"
                    value={name}
                    onChange={(e) => {
                        onInputChange(e)
                    }}
                />
                <input
                    type="text"
                    className="form-control mb-3"
                    name="email"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => {
                        onInputChange(e)
                    }}
                />
                <button type='submit' className='btn btn-primary'>thêm user mới</button>
            </div>
        </form>

    )
}
