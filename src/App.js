import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './redux/authActions';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.authReducer.userLogged);
  const isLogged = useSelector((store) => store.authReducer.isLogged);

  const handleLogin = () => {
    dispatch(login());
  }

  const handleLogout = () => {
    dispatch(logout());
  }

  const handleFile = (e) => {
    console.log("archivos", e.target.files[0])
  }

  return (
    <div className="App">
      <header className="App-header">
        EJEMPLO AUTH FIREBASE CON REDUX THUNK
        {isLogged ? <button onClick={() => handleLogout()}>Logout</button> : <button onClick={() => handleLogin()}>Login with google</button>}
        {isLogged &&
          <div>
            Bienvenido {user.user.displayName}
          </div>
        }
        <br/>
        <input type="file" onChange={(e) => handleFile(e)} />
      </header>
    </div>
  );
}

export default App;
