import Header from './Componentes/Header';
import './App.css';
import ListaCadastro from './Componentes/ListaCadastro';

function App() {

  return (
    <>
      <Header />
      <div className="container mt-4">
        <ListaCadastro />
      </div>
    </>
  );
}

export default App;
