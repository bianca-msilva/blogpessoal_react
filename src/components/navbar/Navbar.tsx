import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

    const navigate = useNavigate();
    const { handleLogout } = useContext(AuthContext);

    function logout(){
        handleLogout();
        alert("O usuário foi desconectado com sucesso!")
        navigate('/login');
    }

    return (
        <>
            <div className="bg-indigo-900 flex text-white py-4">
                <div className="container flex justify-between items-center text-lg mx-7">
                    {/* Coluna da esquerda com logo e título */}
                    <div className="flex flex-col items-center gap-2">
                        <Link to="/home" className="text-2xl font-bold">Blog Pessoal</Link>
                        <img className="rounded-xl size-15" src="./src/assets/logoblog2.png" alt="Logo do Blog" />
                    </div>

                    {/* Menu de navegação */}
                    <div className="flex gap-5">
                        Postagens
                        <Link to='/temas' className='hover:underline'>Temas</Link>
                        <Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link>
                        Perfil
                        {/* Ao invés do endereço de uma rota, passa o onClick */}
                        <Link to='' onClick={logout} className="hover:underline">Sair</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar