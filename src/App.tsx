import Home from "./pages/home/Home"

function App() {

  // Só da para retornar UMA coisa, apenas com uma caixa envolvendo (div ou fragment)
  return (
    // É um fragmento vazio, sem criação de vários nós na DOM
    <> 
      <Home />
    </>
  )
}

export default App
