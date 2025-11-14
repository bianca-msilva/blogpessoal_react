import axios from "axios";

// ********** Conexão entre o FrontEnd e BackEnd **********
// Objeto do Axios, {} para passar parâmetros
const api = axios.create({
    baseURL: 'https://blogpessoal-spring-vpxs.onrender.com' // Guarda endereço da API
})

// ******* Funções *******
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados); // Variável de estado
    setDados(resposta.data); // Atualizar os dados do Objeto pelos recebidos da resposta
}

// "url":  endereço do endpoint
export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados); 
    setDados(resposta.data);
}