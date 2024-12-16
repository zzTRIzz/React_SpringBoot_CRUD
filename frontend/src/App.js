import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import AddUser from "./users/AddUser"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar/>
                <div className='container'>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/adduser" element={<AddUser/>}/>
                        <Route exact path='/edituser/:id' element={<EditUser />}/>
                        <Route exact path='/viewuser/:id' element={<ViewUser />}/>
                    </Routes>
                </div>
            </Router>
        </div>
    );
}
export default App;
