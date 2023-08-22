import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './redux/authActions';
import { getProductsFromFirestore } from './redux/productActions';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.authReducer.userLogged);
  const isLogged = useSelector((store) => store.authReducer.isLogged);
  const prods = useSelector((store) => store.productReducer.productos);
  const [product, setProduct] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    dispatch(getProductsFromFirestore());
  }, [dispatch])

  const handleLogin = () => {
    dispatch(login());
  }

  const handleLogout = () => {
    dispatch(logout());
  }

  const handleSendForm = (e) => {
    e.preventDefault();
    console.log("producto", product);
    console.log("precio", price)
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
        <form id="sencillo">
          <label>Producto</label>
          <input name="product" type='text' onChange={(e) => setProduct(e.target.value)}></input>
          <label>Precio0</label>
          <input name="precio" type='number' onChange={(e) => setPrice(e.target.value)}></input>
          <button onClick={(e) => handleSendForm(e)}>Enviar</button>
        </form>
        <br />
        <header>Lista de productos</header>
        {prods.map(item => <div key={item.id}>{item.nombre} - {item.precio}</div> )}
      </header>
    </div>
  );
}

export default App;
