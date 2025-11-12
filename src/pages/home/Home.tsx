// pages - criação de estáticos, ou seja, que não renderizam no nav.

// Home é componente, isso cria automaticamente sua estrutura (rfce)
function Home() {
    return (

        // Código do componente por HTML
        // Essa div é o container geral da página
        <div
            // Atributo e suas regras, {} externa - indica código TS dentro do código HTML e {} internas - objetos do TS
            style={{
                backgroundColor: "#312e81",
                display: "flex",
                justifyContent: "center",
            }}
        >
            {/* Divide a tela em 2 colunas */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr", // 2 colunas de tamanhos iguais
                    color: "white",
                    width: "100%", // Texto ocupa tam máximo possível
                    maxWidth: "1280px" // Limita o tamanho máximo da tela
                }}
            >
                {/* 1° coluna, da esquerda */}
                <div
                    // Fazer estilização da div, coluna
                    style={{
                        display: "flex",
                        flexDirection: "column", // Um elemento embaixo do outro
                        gap: "1rem",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingTop: "1rem",
                        paddingBottom: "1rem"
                    }}
                >
                    <h2
                        style={{
                            fontSize: "3rem",
                            fontWeight: "bold",
                            margin: "0rem"
                        }}
                    >Seja Bem Vinde!</h2>
                    <p
                        style={{
                            fontSize: "1.25rem",
                            marginBottom: "0rem"
                        }}
                    >Expresse aqui seus pensamentos e opiniões</p>

                    {/* Guardando lugar para Link/Botão */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            gap: "1rem"
                        }}
                    >
                        <div
                            style={{
                                borderRadius: "0.5rem",
                                color: "white",
                                border: "2px solid white",
                                padding: "0.5rem 1rem"
                            }}
                        >Nova Postagem</div>
                    </div>
                </div>

                {/* 2° coluna, da direita */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src="https://i.imgur.com/fyfri1v.png"
                        alt="Imagem da página Home"
                        style={{
                            width: "66%"
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
