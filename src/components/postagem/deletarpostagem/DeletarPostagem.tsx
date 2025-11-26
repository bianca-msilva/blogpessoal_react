import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Postagem from "../../../models/Postagem"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarPostagem() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout, isLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            if (!isLogout) {
                ToastAlerta("Você precisa estar logado", "info")
            }
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarPostagem() {
        setIsLoading(true)

        try {
            await deletar(`/postagens/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Postagem apagada com sucesso', 'sucesso')

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao deletar a postagem.', 'erro')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/postagens")
    }

    return (
        <div className="conatiner w-1/3 mx-auto">
            <h1 className="text-4xl text-center my-4 font-bold text-cyan-900">Deletar Postagem</h1>
            <p className="text-center font-semibold mb-4 text-cyan-800">
                Você tem certeza de que deseja apagar a postagem a seguir?
            </p>

            <div className="border-2 border-cyan-200 hover:border-cyan-900 flex flex-col rounded-2xl overflow-hidden justify-between">
                <header className="py-2 px-6 bg-cyan-600 text-white font-bold text-2xl">
                    Postagem
                </header>
                <div className="p-4">
                    <p className="text-xl h-full">{postagem.titulo}</p>
                    <p>{postagem.texto}</p>
                </div>

                <div className="flex">
                    <button
                        className="text-slate-100 bg-red-400 hover:bg-red-700 w-full py-2"
                        onClick={retornar}
                    >Não</button>
                    <button
                        className="text-slate-100 bg-blue-300 hover:bg-cyan-800 w-full py-2 font-semibold"
                        onClick={deletarPostagem}
                    >
                        {isLoading ?
                            <ClipLoader
                                color="#ffffff"
                                size={24}
                            /> :
                            <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarPostagem
