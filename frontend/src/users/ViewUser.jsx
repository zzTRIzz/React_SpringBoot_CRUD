import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useNavigate, Link, useParams} from 'react-router-dom'

export default function ViewUser() {

    let navigate = useNavigate()

    const {id} = useParams()

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
        await axios.put(`http://localhost:8080/user/${id}`, user)
        navigate("/")
    }

    const loadUser = async () =>{
        const response = await axios.get(`http://localhost:8080/user/${id}`)
        setUser(response.data)
    }

    useEffect(()=>{
        loadUser()
    },[])

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
                    readOnly={true}
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
                    readOnly={true}
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
                    readOnly={true}
                />
            </div>
        </form>

    )
}
