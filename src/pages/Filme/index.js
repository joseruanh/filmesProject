import { useEffect, useState } from 'react'
import './filme-info.css'
import { useParams, useHistory } from 'react-router-dom'
import api from '../../services/api' 
import { toast } from 'react-toastify'

export default function Filme(){

    const { id } = useParams()
    const history = useHistory()
    const [filme, setFilme] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{

        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`)

            if(response.data.length === 0){
                //tentou acessar com ID inexistente
                history.replace('/')
                return;
            }


            setFilme(response.data)
            setLoading(false)
        }
        loadFilme()

        return(()=>{console.log("componente desmontado")})

    }, [history, id])

    function salvaFilme(){
        
        const minhaLista = localStorage.getItem('filmes')

        let filmesSalvos = JSON.parse(minhaLista) || []

        //se tiver algum filme duplicado, esse id vai ignorar

        const hasFilme = filmesSalvos.some((filmeSalvo)=>filmeSalvo.id === filme.id)

        if(hasFilme){
            toast.error('Este filme já está nos favoritos!')
            return;
        }


        filmesSalvos.push(filme)
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos))
        toast.success('Filme adicionado aos favoritos!')



    }

    if(loading){
        return(
                <div clasName="filme-info">
                    <h2>Carregando...</h2>
                </div>
            )
    }


    return(

        <div className="filme-info">
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome} />
            <h3>Sinopse</h3>
            {filme.sinopse}

            <div className="botoes">
                <button onClick={ salvaFilme } >Favoritar</button>
                <button>

                    <a target="blank" href={`http://youtube.com/results?search_query=${filme.nome} Trailer`}>
                        Trailer
                        </a>

                </button>
            </div>

        </div>
    )
}