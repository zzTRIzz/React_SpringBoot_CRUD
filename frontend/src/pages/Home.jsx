import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'

//js-worksheet
export default function Home() {

    const [users, setUsers] = useState([]); // Sửa ở đây

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const result = await axios.get("http://localhost:8080/user"); // Chờ kết quả
            console.log(result.data);
            setUsers(result.data); // Cập nhật state với dữ liệu nhận được
        } catch (error) {
            console.error("Lỗi khi tải người dùng:", error); // Xử lý lỗi
        }
    };

    const {id} = useParams()

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/user/${id}`)
        loadUsers()
    }


    return (
        <div className='container'> {/* Sửa ở đây */}
            <h1>Welcome to my home page</h1>
            <div>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">username</th>
                        <th scope="col">name</th>
                        <th scope="col">email</th>
                        <th scope="col">acion</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((user, index) => {
                            return (
                                <tr key={user.id}>
                                    <td key={index}>{index + 1}</td>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className='m-2'>
                                        <Link className='btn btn-info mx-1' to={`/viewuser/${user.id}`}>
                                            View
                                        </Link>
                                        <Link className='btn btn-warning mx-1' to={`/edituser/${user.id}`}>
                                            Edit
                                        </Link>
                                        <button className='btn btn-danger mx-1'
                                                onClick={() => {
                                                    deleteUser(user.id)
                                                }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
