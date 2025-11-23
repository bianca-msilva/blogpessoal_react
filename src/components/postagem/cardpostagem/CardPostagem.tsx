import { Link } from "react-router-dom"
import type Postagem from "../../../models/Postagem"

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
    return (
        <>
            <div className="border border-cyan-200 flex flex-col overflow-hidden justify-between rounded-xl shadow-lg">
                <div>
                    <div className="flex bg-cyan-700 w-full py-2 px-4 items-center gap-4">
                        <img src={postagem.usuario?.foto} alt={postagem.usuario?.nome} className="rounded-full h-10" />
                        <h1 className="text-slate-100 font-bold text-xl text-center">
                            {postagem.usuario?.nome}
                        </h1>
                    </div>
                    <div className="flex flex-col bg-sky-50 p-3">
                        <p className="text-lg font-semibold">{postagem.titulo}</p>
                        <p>{postagem.texto}</p>
                        <p>Tema: {postagem.tema?.descricao}</p>
                        <p>Data: {new Intl.DateTimeFormat("pt-BR", {
                            dateStyle: 'full',
                            timeStyle: 'medium',
                        }).format(new Date(postagem.data))}</p>
                    </div>

                    <div className="flex">
                        <Link to={`/editarpostagem/${postagem.id}`} className="bg-cyan-400 hover:bg-cyan-600 text-white font-semibold w-1/2 flex items-center justify-center">
                            <button >Editar</button>
                        </Link>
                        <Link to={`/deletarpostagem/${postagem.id}`} className="bg-red-400 hover:bg-red-600 text-white font-semibold w-1/2 flex items-center justify-center">
                            <button >Excluir</button>
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CardPostagem
