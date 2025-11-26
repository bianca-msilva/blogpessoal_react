import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom"
import type Tema from "../../../models/Tema";
import type Postagem from "../../../models/Postagem";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [temas, setTemas] = useState<Tema[]>([]);

    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '', });

    const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

    const { usuario, handleLogout, isLogout } = useContext(AuthContext);
    const token = usuario.token;

    const { id } = useParams<{ id: string }>();

    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        }
    }

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

    // A função setTemas atualiza o estado com os dados retornados
    async function buscarTemas() {
        try {
            await buscar(`/temas`, setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        }
    }

    // Monitora valor do token, se ainda está válido
    useEffect(() => {
        if (token === '') {
            if (!isLogout) {
                ToastAlerta("Você precisa estar logado", "info")
            }
            navigate('/'); // Redireciona para o Login
        }
    }, [token])

    useEffect(() => {
        buscarTemas()

        if (id !== undefined) {
            buscarPostagemPorId(id); // Quando o usuário for editá-la, a postagem correspondente é carregada
        }
    }, [id])

    // Garante que atualizações feitas em tema sejam refletidos nas postagens também
    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema, // atributo que fica em postagem, que mostra o tema associado, sendo atualizado
        })
    }, [tema])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/postagens');
    }

    async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token, },
                });
                ToastAlerta('Postagem atualizada com sucesso!', 'sucesso')
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao atualizar a Postagem', 'erro')
                }
            }
        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token, },
                });
                ToastAlerta('Postagem cadastrada com sucesso', 'sucesso')
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao cadastrar a Postagem', 'erro')
                }
            }
        }

        setIsLoading(false);
        retornar();
    }

    const carregandoTema = tema.descricao === '';

    return (
        <>
            <div className="container flex flex-col items-center">
                <h1 className="text-4xl text-center my-8 text-cyan-900">
                    {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
                </h1>

                <form className="flex flex-col w-1/2 gap-3"
                    onSubmit={gerarNovaPostagem}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="titulo">Título da Postagem</label>
                        <input name="titulo" type="text" placeholder="Título"
                            required
                            className="border-2 border-gray-300 hover:border-cyan-700 rounded px-2 py-1"
                            value={postagem.titulo}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="texto">Texto da Postagem</label>
                        <input name="texto" type="text" placeholder="Texto"
                            required
                            className="border-2 border-gray-300 hover:border-cyan-700 rounded px-2 py-1"
                            value={postagem.texto}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="tema">Tema da Postagem</label>
                        <select name="tema" id="tema" className="border-2 border-gray-300 hover:border-cyan-700 rounded px-2 py-1"
                            onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                        >
                            <option value="" selected disabled>Selecione um Tema</option>

                            {temas.map((tema) => (
                                <>
                                    <option value={tema.id}>{tema.descricao}</option>
                                </>
                            ))}

                        </select>
                    </div>

                    <button type="submit"
                        className="rounded disabled:bg-slate-200 bg-blue-400 hover:bg-cyan-800 
                    text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
                        disabled={carregandoTema}
                    >
                        {isLoading ?
                            <ClipLoader
                                color="#ffffff"
                                size={24}
                            /> :
                            <span>{id !== undefined ? 'Editar' : 'Cadastrar'}</span>
                        }
                    </button>
                </form >
            </div >
        </>
    )
}

export default FormPostagem
