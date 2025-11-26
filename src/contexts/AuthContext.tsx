import { createContext, useRef, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service"
import { ToastAlerta } from "../utils/ToastAlerta";

// Tudo o que desejo compartilhar globalmente na aplicação, ter acesso à
interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
    isLogout: boolean
}


// Disponibiliza os "atributos" de AuthContext à todos componentes
interface AuthProviderProps {
    children: ReactNode // Qualquer componente React pode utilizar o nosso contexto
}

// Contexto inciializado com Objeto de AuthContextProps
export const AuthContext = createContext({} as AuthContextProps)

// Inicializando o Estado usuario (Guardar os dados do usuário autenticado)
export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    // Inicializar o Estado isLoading (Exibir e Ocultar o Loader no formulário de Login)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // useRef para indicar se o logout foi intencional ou não
    const isLogout = useRef(false)

    // Implementação da função de Login (Autenticação na API/Back)
    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true);

        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario)
            ToastAlerta("Usuário autenticado com sucesso!", "sucesso")
            isLogout.current=false // Reset do isLogout
        } catch (error) {
            ToastAlerta("Os dados do usuário estão inconsistentes!", "erro")
        }
        setIsLoading(false);
    }

    // Implementação da Função de Logout (desconectar)
    function handleLogout() {
        isLogout.current=true // indica que o logout foi intencional (usuário escolheu sair)
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        });
    }

    return(
        <AuthContext.Provider value={{usuario, handleLogin, handleLogout, isLoading, isLogout: isLogout.current}}>
            {children}
        </AuthContext.Provider>
    )
}