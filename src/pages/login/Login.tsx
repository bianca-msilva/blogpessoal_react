import { Link, useNavigate } from "react-router-dom"
import type UsuarioLogin from "../../models/UsuarioLogin";
import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";

function Login() {

  const navigate = useNavigate();
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);
  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if(usuario.token !== ""){
      navigate('/home')
    }
  }, [usuario])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    })
  }

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    handleLogin(usuarioLogin);
  }

  // console.log(JSON.stringify(usuarioLogin));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen place-items-center font-bold">
        <div className="flex">
          <form className=" flex flex-col justify-center items-center gap-4"
            onSubmit={login}
          >
            <h1 className="text-4xl text-slate-900">
              Entrar
            </h1>

            <div className="flex-col flex">
              <label htmlFor="usuario">Usuario</label>
              <input type="text" id="usuario"
                name="usuario" placeholder="Usuario" className="border-2 border-slate-700 rounded p-2"
                value={usuarioLogin.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>

            <div className="flex-col flex">
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha"
                name="senha" placeholder="Senha" className="border-2 border-slate-700 rounded p-2"
                value={usuarioLogin.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>

            <button type="submit"
              className=" flex bg-blue-400 hover:bg-blue-700 py-2 justify-center rounded text-white w-1/2">
              {
                isLoading ?
                  <ClipLoader
                    color="#ffffff"
                    size={24}
                  />
                  :
                  <span>Entrar</span>
              }
            </button>

            <hr className="border-slate-500 w-full" />

            <p className="text-slate-900">
              Ainda não tem uma conta?{' '}
              <Link to="/cadastro" className="text-indigo-900 hover:underline">
                Cadastre-se
              </Link>
            </p>

          </form>
        </div >
        <div
          className="hidden sm:flex justify-center items-center w-full h-full"
        >
          <img src="https://ik.imagekit.io/dijdduf7u/blog%20pessoal/logoblog2.png" alt="Imagem de login" />
        </div>
      </div>
    </>
  )
}

export default Login
