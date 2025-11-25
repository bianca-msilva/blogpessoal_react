// Formulário de cadastro do usuário

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type Usuario from "../../models/Usuario";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../utils/ToastAlerta";


function Cadastro() {

  //  Objeto Hook useNavigate - redirecionar a outros componentes de acordo com a rota informada aqui
  const navigate = useNavigate();

  // *********** Estados ************
  // Carregar e controlar a animação de loading do Loader
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  // Cuida do segundo input
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  // Usuario para validar todas as informações, guarda tudo dentro do Estado usuario
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: ""
  })

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario])

  function retornar() {
    navigate("/");
  }

  // Conectar o Formulário com os seus respectivos estados (função responsável por atualizar o estado)
  // (e: ) = event, indica quem disparou o evento
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      // e.target.name - pegar o valor que tem o mesmo nome do input que está onChange
      [e.target.name]: e.target.value // : e.target.value - substituir pelo valor atual dentro do input
    })
  }

  // Confirmação da senha, atualizar seu estado
  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovousuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true); // Carregar a animação
    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {

      try {
        // Mandar para o Backend, setUsuario para receber o id posteriormente
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        ToastAlerta('Usuário cadastrado com sucesso!', "sucesso");
      } catch (error) {
        ToastAlerta('Erro ao cadastrar o usuário!', "erro");
      }

    } else {
      ToastAlerta("Os dados do usuário inconsistentes! Verifique as informações do cadastro!", "info");
      setUsuario({
        ...usuario,
        senha: ''
      });
      setConfirmarSenha('');
    }

    setIsLoading(false);
  }

  // USADO SOMENTE EM DESENVOLVIMENTO, ao colocar em produção DEVEM ser retirados
  // console.log(JSON.stringify(usuario));
  // console.log("Confirmar Senha: " + confirmarSenha);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen place-items-center font-bold">
        <img src="https://ik.imagekit.io/dijdduf7u/blog%20pessoal/logoblog2.png" alt="Imagem de cadastro" />
        <form className="flex flex-col justify-center items-center w-2/3 py-4 gap-4"
          onSubmit={cadastrarNovousuario}
        >
          <h1 className="text-4xl text-slate-900">Cadastrar</h1>

          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" name="nome"
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          {/* value={usuario.nome} = Chamar a função */}
          {/* onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} =  Chamar o evento que vai disparar o evento */}

          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input type="text" id="usuario" name="usuario"
              placeholder="Usuario"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input type="text" id="foto" name="foto"
              placeholder="Foto"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>


          <div className="flex flex-col w-full">
            <label htmlFor="confimarSenha">Confirmar Senha</label>
            <input type="password" id="confimarSenha" name="confimarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>

          <div className="flex gap-7 justify-around w-full text-white">
            <button type="reset" className="bg-red-400 flex py-2 rounded hover:bg-red-700 w-1/2 justify-center"
              onClick={retornar}
            >Cancelar</button>
            <button className="bg-blue-400 flex py-2 px-4 rounded hover:bg-blue-700 w-1/2 justify-center"
            >
              {/* Carregar a animação */}
              {
                isLoading ?
                  <ClipLoader
                    color="#ffffff"
                    size={24}
                  />
                  :
                  <span>Cadastrar</span>
              }
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro
