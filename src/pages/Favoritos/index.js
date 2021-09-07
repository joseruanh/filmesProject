import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './favoritos.css'
import { toast } from 'react-toastify'

export default function Favoritos(){

    const [filmes, setFilmes] = useState([])

    useEffect(()=>{

        const filmesFav = localStorage.getItem('filmes')
        setFilmes(JSON.parse(filmesFav) || [] )


    }, [])

    function remover(id){
        let filtroFilmes = filmes.filter((item)=>{

            return(item.id !== id)

        })

        setFilmes(filtroFilmes)
        localStorage.setItem('filmes', JSON.stringify(filtroFilmes))
        toast.success("Filme removido")
    }







    return(
        <div id="meus-filmes">

            <h1>Favoritos</h1>

            {filmes.length === 0 && <p> não há nenhum favorito D: </p>}

            <ul>
                {filmes.map((item)=>{
                    return(

                    <li key={item.id}>
                        <span>{item.nome}</span>

                        <div>
                            <Link to={`/filme/${item.id}`}>Detalhes</Link>
                            <button onClick={ ()=> remover(item.id)}>Excluir</button> 
                        </div>
                    </li>
                    
                    )
                })}
            </ul>


        </div>

    )
}