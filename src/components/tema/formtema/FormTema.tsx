import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

function FormTema() {

    const navigate = useNavigate(); // Redirecionamento entre componentes

    const [isLoading, setIsloading] = useState<boolean>(false);

    const [tema, setTema] = useState<Tema>({} as Tema); // Guardar os dados que for digitando no formulário

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const { id } = useParams<{ id: string }>();

    async function buscarTemaPorId(id: string) {
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
            buscarTemaPorId(id);
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

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsloading(true)

        if (id !== undefined) {
            // Atualização
            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: { Authorization: token }
                })
                alert('O Tema foi atualizado com sucesso!')
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    alert('Erro ao atualizar o Tema!')
                }
            }
        } else {
            // Cadastro
            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: { Authorization: token }
                })
                alert('O Tema foi cadastrado com sucesso!')
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    alert('Erro ao cadastrar o Tema!')
                }
            }
        }

        setIsloading(false);
        retornar();
    }

    return (
        <>
            <div className="container flex flex-col justify-center items-center mx-auto">
                <div className="text-indigo-900 text-center my-8 text-4xl">
                    <h1>{id === undefined ? 'Cadastrar' : 'Atualizar'} Tema</h1>
                </div>

                <form className="w-1/2 flex flex-col gap-4"
                    onSubmit={gerarNovoTema}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="descricao">Descrição do Tema</label>
                        <input type="text" placeholder="Descreva aqui seu tema"
                            name="descricao"
                            className="border px-4 py-1 rounded border-slate-700"
                            value={tema.descricao}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button className="bg-indigo-400 hover:bg-indigo-700 text-white rounded p-1
                    w-1/2 justify-center flex mx-auto" type="submit">
                        {
                            isLoading ?
                                <ClipLoader
                                    color="#ffffff"
                                    size={24}
                                /> :
                                <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                        }
                    </button>
                </form>
            </div>
        </>
    )
}

export default FormTema
