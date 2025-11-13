// pages - criação de estáticos, ou seja, que não renderizam no nav.

// Home é componente, isso cria automaticamente sua estrutura (rfce)
function Home() {
    return (

        // Código do componente por HTML
        // Essa div é o container geral da página
        <div
            // Pelo Tailwind CSS, "" regras
            className="bg-indigo-900 flex justify-center"
        >
            {/* Divide a tela em 2 colunas */}
            <div
                // breakpoints para responsividade, grid-cols-1 para celular, grid-cols-2 para telas maiores que 680px
                className="container grid grid-cols-1 sm:grid-cols-2 text-white"
            >
                {/* 1° coluna, da esquerda */}
                <div
                    className="flex flex-col gap-4 items-center justify-center py-4"
                >
                    <h2
                        className="text-5xl font-bold"                        
                    >Seja Bem Vinde!</h2>
                    <p
                        className="text-xl"
                    >Expresse aqui seus pensamentos e opiniões</p>

                    {/* Guardando lugar para Link/Botão */}
                    <div
                        className="flex justify-around gap-4"
                    >
                        <div
                            className="rounded text-white border-white border-solid border-2 py-2 px-4"
                        >Nova Postagem</div>
                    </div>
                </div>

                {/* 2° coluna, da direita */}
                <div
                    className="flex justify-center"
                >
                    <img
                        src="https://i.imgur.com/fyfri1v.png"
                        alt="Imagem da página Home"
                        className="w-2/3"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
