import { Link } from "react-router-dom";

function Navbar() {
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
                        Temas
                        Cadastrar Tema
                        Perfil
                        Sair
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar