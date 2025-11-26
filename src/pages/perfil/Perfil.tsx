import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Perfil() {
    const navigate = useNavigate()

    const { usuario, isLogout } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            if (!isLogout) {
                ToastAlerta("Você precisa estar logado", "info")
            }
            navigate("/")
        }
    }, [usuario.token])

    return (
        <div className="flex justify-center mx-4">
            <div className="container mx-auto my-4 rounded-2xl overflow-hidden">
                <img
                    className="w-full h-72 object-cover border-b-8 border-white"
                    src="https://ik.imagekit.io/dijdduf7u/blog%20pessoal/Merry%20Christmas.png"
                    alt="Capa do Perfil"
                />

                <img
                    className="rounded-full w-56 mx-auto -mt-32 border-8 border-white relative z-10"
                    src={usuario.foto}
                    alt={`Foto de perfil de ${usuario.nome}`}
                />

                <div
                    className="relative -mt-24 h-90 flex flex-col
                    bg-linear-to-b from-cyan-700 to-cyan-900 text-white text-2xl items-center justify-center"
                >
                    <p>Nome: {usuario.nome} </p>
                    <p>Email: {usuario.usuario}</p>
                    {/* Botão de editar */}
                    <Link
                        to={`/atualizarperfil`}
                        className="mt-8 w-full md:w-auto"
                    >
                        <button className="w-full md:w-auto bg-linear-to-b from-green-600 to-cyan-700 hover:from-green-700 hover:to-cyan-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
                            Editar Perfil
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Perfil