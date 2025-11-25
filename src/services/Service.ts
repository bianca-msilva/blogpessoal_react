import axios from "axios";

// ********** Conexão entre o FrontEnd e BackEnd **********
// Objeto do Axios, {} para passar parâmetros
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL // Guarda endereço da API
})

// ******* Funções *******
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados); // Variável de estado
    setDados(resposta.data); // Atualizar os dados do Objeto pelos recebidos da resposta
}

// "url":  endereço do endpoint (Autenticar)
export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}

// Função para consultar com token
export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
}

// Função para cadastrar com token
export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
}

// Função para atualizar com token
export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
}

// Função para deletar com token
export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header);
}