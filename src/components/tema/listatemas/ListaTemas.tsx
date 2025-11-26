import { useNavigate } from "react-router-dom";
import CardTema from "../cardtema/CardTema"
import { useContext, useEffect, useState } from "react";
import type Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaTemas() {

    // Pegar os dados do BackEnd
    const navigate = useNavigate(); // Redirecionamento entre componentes

    const [isLoading, setIsloading] = useState<boolean>(false);

    const [temas, setTemas] = useState<Tema[]>([]);

    // Context
    const { usuario, handleLogout, isLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === '') {
            if (!isLogout) {
                ToastAlerta("Você precisa estar logado", "info")
            }
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarTemas()
    }, [temas.length])

    // Função que manda e busca a requisição mn BE, usnaod a da Services
    async function buscarTemas() {
        try {
            setIsloading(true);
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        } finally {
            setIsloading(false);
        }
    }

    return (
        <>
            {
                // Animação de isLoading para ser exibida
                isLoading && (
                    <div className="flex justify-center w-full my-8">
                        <SyncLoader
                            color="#312e81"
                            size={32}
                        />
                    </div>
                )
            }

            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    {
                        (!isLoading && temas.length === 0) && (
                            <span className="text-3xl text-center my-8">
                                Nenhum Tema foi encontrado!
                            </span> // Injetar texto ou outra estilização no meio de alguma outra coisa, sem precisar de novas div
                        )
                    }
                    <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {
                            temas.map((tema) => (
                                <CardTema key={tema.id} tema={tema} />
                                // key={tema.id} é para identificar o card, falando que cada card é um diferente
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaTemas
