import { useCallback } from 'react';

interface IPokemon {
  name: string;
  url: string;
}

function App() {
  const onListClick = useCallback((pokemon: IPokemon) => {
    alert(`clicked on ${pokemon.name}`);
  }, []);

  return <div onClick={() => onListClick({ name: 'test', url: 'test' })}></div>;
}

export default App;
