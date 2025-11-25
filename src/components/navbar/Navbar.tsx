import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);

    function logout(){
        handleLogout();
        ToastAlerta("O usuário foi desconectado com sucesso!", "info")
        navigate('/login');
    }

    //  Para a Navbar aparecer somente apenas o usuário estiver autenticado
    let component: ReactNode // É um componente react

    if(usuario.token !== ''){
        component = (
            <div className="bg-indigo-900 flex text-white py-4">
                <div className="container flex justify-between items-center text-lg mx-7">
                    {/* Coluna da esquerda com logo e título */}
                    <div className="flex flex-col items-center gap-2">
                        <Link to="/home" className="text-2xl font-bold">Blog Pessoal</Link>
                        <img className="rounded-xl size-15" src="https://ik.imagekit.io/dijdduf7u/blog%20pessoal/logoblog2.png" alt="Logo do Blog" />
                    </div>

                    {/* Menu de navegação */}
                    <div className="flex gap-5">
                        <Link to='/postagens' className='hover:underline'>Postagens</Link>
                        <Link to='/temas' className='hover:underline'>Temas</Link>
                        <Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link>
                        <Link to='/perfil' className="hover:underline">Perfil</Link>
                        {/* Ao invés do endereço de uma rota, passa o onClick */}
                        <Link to='' onClick={logout} className="hover:underline">Sair</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {/* Para exibir o Navbar quando token !== '' */}
            {component}
        </>
    )
}

export default Navbar