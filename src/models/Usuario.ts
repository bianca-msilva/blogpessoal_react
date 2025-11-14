// Sem gerar nova classe, Interface apenas para ser de base

import type Postagem from "./Postagem";

// Isso significa que será pública
export default interface Usuario{
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    foto: string; 
    postagem?: Postagem[] | null; // ? - opcional, podem ou não ter postagens
} 