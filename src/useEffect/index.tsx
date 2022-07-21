import axios from 'axios';
import { useEffect } from 'react';

// interface
interface IPokemon {
  name: string;
  url: string;
}

function App() {
  useEffect(() => {
    (async () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/';
      const response = await axios.get<{ results: IPokemon[] }>(url);
      console.log(response.data.results);
    })();
  }, []);

  return <div>sample</div>;
}

export default App;
