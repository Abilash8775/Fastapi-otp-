
import './App.css';
import {BrowserRouter,Link, Route,Routes} from 'react-router-dom'
import Login from './components/Login.js';
import Profile from './components/Profile.js';
import {RequireToken} from './components/Auth.js';
function App() {
  return (
    <div className="vh-100 gradient-custom">
      <div className="container">
        <h1 className="page-header text-center">REACT AND FASTAPI OTP LOGIN WITH pyJWT TOKEN AUTHENTICATION</h1>
        <BrowserRouter>
        <p><Link to="/" className="btn btn-success">Login</Link> | <Link to="profile" className="btn btn-success">Profile</Link></p>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/profile" element={
            <RequireToken>
              <Profile/>
            </RequireToken>
          }/>
        </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
