import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './redux/authActions';
import { 
  getProductsFromFirestore, 
  addProductToFirestore, 
  updateProductToFirestore, 
  deleteProductToFirestore,
  getProductsByName
 } from './redux/productActions';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.authReducer.userLogged);
  const isLogged = useSelector((store) => store.authReducer.isLogged);
  const prods = useSelector((store) => store.productReducer.productos);
  const [product, setProduct] = useState('')
  const [price, setPrice] = useState('')
  const [search, setSearch] = useState('')
  const [selectedProductId, setSelectedProductId] = useState(null)

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
    const producto = {
      nombre: product,
      precio: price
    }
    dispatch(addProductToFirestore(producto));
    setProduct("");
    setPrice("");
  }

  const handleEdit = (producto) => {
    setProduct(producto.nombre);
    setPrice(producto.precio);
    setSelectedProductId(producto.id);
  }

  const handleUpdateForm = (e) => {
    e.preventDefault();
    const producto = {
      nombre: product,
      precio: price,
      id: selectedProductId
    }
    dispatch(updateProductToFirestore(producto));
    setProduct("");
    setPrice("");
    setSelectedProductId(null);
  }

  const handleDelete = (producto) => {
    const index = prods.findIndex(item => item.id === producto.id);
    dispatch(deleteProductToFirestore(producto.id, index));
  }

  const handleSearch = () => {
    dispatch(getProductsByName(search));
  }

  const handleCleanSearch = () => {
    dispatch(getProductsFromFirestore());
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
          <br />
          <label>Producto</label>
          <input name="product" value={product} type='text' onChange={(e) => setProduct(e.target.value)}></input>
          <br /><br />
          <label>Precio</label>
          <input name="precio" value={price} type='number' onChange={(e) => setPrice(e.target.value)}></input>
          <br /><br />
          {selectedProductId ?
            <button onClick={(e) => handleUpdateForm(e)}>Editar</button> :
            <button onClick={(e) => handleSendForm(e)}>Enviar</button>
          }
        </form>
        <br />
        <header>Lista de productos</header>
        <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="button" onClick={() => handleSearch()}>Buscar</button>
        <button type="button" onClick={() => handleCleanSearch()}>Limpiar busqueda</button>
        {prods.map(producto =>
          <div key={producto.id}>
            {producto.nombre} - {producto.precio}
            <button onClick={() => handleEdit(producto)}>Editar</button>
            <button onClick={() => handleDelete(producto)}>Eliminar</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
