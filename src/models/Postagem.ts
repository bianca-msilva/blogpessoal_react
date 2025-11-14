import type Tema from "./Tema";
import type Usuario from "./Usuario";

export default interface Postagem{
    id: number;
    titulo: string;
    texto: string;
    data: string; // gerada automaticamente pelo BD (consultada pela API)
    tema: Tema | null;
    usuario: Usuario | null;
}