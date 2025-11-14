import { Link } from "react-router-dom"

function Login() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen place-items-center font-bold">
        <div className="flex">
          <form className=" flex flex-col justify-center items-center gap-4">
            <h1 className="text-4xl text-slate-900">
              Entrar
            </h1>

            <div className="flex-col flex">
              <label htmlFor="usuario">Usuario</label>
              <input type="text" id="usuario"
                name="usuario" placeholder="Usuario" className="border-2 border-slate-700 rounded p-2"></input>
            </div>

            <div className="flex-col flex">
              <label htmlFor="senha">Senha</label>
              <input type="text" id="senha"
                name="senha" placeholder="Senha" className="border-2 border-slate-700 rounded p-2"></input>
            </div>

            <button type="submit"
              className=" flex bg-blue-400 hover:bg-blue-700 py-2 justify-center rounded text-white w-1/2">
              <span>Entrar</span>
            </button>

            <hr className="border-slate-500 w-full"/>

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
          <img src="./src/assets/logoblog2.png" alt="Imagem de login" />
        </div>
      </div>
    </>
  )
}

export default Login
