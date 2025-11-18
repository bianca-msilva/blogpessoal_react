import { Link } from "react-router-dom"
import type Tema from "../../../models/Tema";

// Props
interface CardTemaProps{
    tema: Tema; // Objeto da interface Tema
}

function CardTema({tema}: CardTemaProps) {
    return (
        <>
            <div className="border rounded-2xl overflow-hidden flex flex-col justify-between p-4">
                <header className="text-white text-2xl font-bold bg-indigo-700 px-6 py-1">Tema</header>

                {/* Ao receber o Objeto tema, vai renderizar a descrição do tema {tema.descricao} - atributo */}
                <p className="text-2xl p-7 h-full bg-slate-200">{tema.descricao}</p>

                <div className="flex text-white">
                    <Link to={`/editartema/${tema.id}`} className="bg-indigo-400 hover:bg-indigo-700 flex items-center justify-center py-1 w-full">
                        <button>Editar</button>
                    </Link>
                    <Link to={`/deletartema/${tema.id}`} className="bg-red-300 hover:bg-red-700 flex items-center justify-center py-1 w-full">
                        <button>Deletar</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default CardTema