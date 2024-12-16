import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom'

export default function Navbar() {
    return (
        <div>

            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    <img
                        src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
                        width="37"
                        height="30"
                        className="d-inline-block align-top ms-3 me-3"
                        alt=""/>
                    Bootstrap
                </a>
                <Link className='btn btn-light' to="/adduser">
                    thêm user mới
                </Link>
            </nav>

        </div>
    )
}
