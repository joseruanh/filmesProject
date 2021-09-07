import React from 'react'
import Routes from './routes'
import './estilo.css'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//https://sujeitoprogramador.com/r-api/?api=filmes/

function App(){
  return(
    <div className="app">
      <Routes />
      <ToastContainer autoClose={3000} />
    </div>
  )
}
export default App;