import { useReducer } from 'react';

interface IPokemon {
  name: string;
  hp: number;
}

type ActionType = { type: 'ADD'; name: string; hp: number } | { type: 'REMOVE'; name: string };

export function App() {
  const [state, dispatch] = useReducer((state: IPokemon[], action: ActionType) => {
    switch (action.type) {
      case 'ADD':
        return [
          ...state,
          {
            name: action.name,
            hp: action.hp
          }
        ];
      case 'REMOVE':
        return state.filter((v) => v.name !== action.name);
      default:
        throw new Error();
    }
  }, []);

  return (
    <>
      <ul>
        {state.map((pokemon) => {
          return (
            <>
              <li key={pokemon.name}>
                {pokemon.name}, {pokemon.hp}
              </li>
              <button onClick={() => dispatch({ type: 'REMOVE', name: pokemon.name })}>
                Remove
              </button>
            </>
          );
        })}
      </ul>
      <button onClick={() => dispatch({ type: 'ADD', name: 'test', hp: 123 })}>ADD</button>
    </>
  );
}
