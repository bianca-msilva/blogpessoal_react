import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

function DeletarTema() {
    const navigate = useNavigate(); // Redirecionamento entre componentes

    const [isLoading, setIsloading] = useState<boolean>(false);

    const [tema, setTema] = useState<Tema>({} as Tema); // Guardar os dados que for digitando no formulário

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const { id } = useParams<{ id: string }>();

    async function buscarTemaPorId() {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarTemaPorId();
        }
    }, [id])

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    function retornar() {
        navigate("/temas");
    }

    async function deletarTema() {
        setIsloading(true);

        try {

            await deletar(`/temas/${id}`, {
                headers: { Authorization: token }
            })
            alert('Tema deletado com sucesso!')

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            } else {
                alert('Erro ao deletar o tema!')
            }
        }

        setIsloading(false);
        retornar();
    }

    return (
        <div className="container w-1/3 mx-auto">
            <h1 className="text-4xl text-indigo-950 font-bold text-center my-3">Deletar Tema</h1>
            <p className="text-indigo-900 text-center mb-4 font-semibold">Você tem certeza de que deseja apagar o tema a seguir?</p>

            <div className="border border-slate-700 rounded-2xl flex flex-col justify-between overflow-hidden">
                <header className="py-2 px-6 bg-indigo-700 text-white font-semibold text-2xl">
                    Tema
                </header>
                <p className="p-7 text-2xl bg-slate-200 h-full text-slate-900">{tema.descricao}</p>
                <div className="flex">
                    <button className="bg-red-400 hover:bg-red-700 w-full text-white flex items-center justify-center"
                        onClick={retornar}
                    >
                        Não
                    </button>
                    <button className="bg-indigo-400 hover:bg-indigo-700 w-full text-white p-1 flex items-center justify-center"
                        onClick={deletarTema}
                    >
                        {
                            isLoading ?
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

export default DeletarTema
