import { useCallback, useReducer } from 'react';

interface IPokemon {
  name: string;
  url: string;
}

type ActionType =
  | { type: 'ADD'; pokemon: IPokemon }
  | { type: 'REMOVE'; name: string }
  | { type: 'LOAD'; pokemons: IPokemon[] };

export const usePokemons = (
  initialPokemons: IPokemon[]
): {
  pokemons: IPokemon[];
  onAdd: (pokemon: IPokemon) => void;
  onRemove: (pokemon: IPokemon) => void;
  onLoad: (pokemons: IPokemon[]) => void;
} => {
  const [pokemons, dispatch] = useReducer((state: IPokemon[], action: ActionType) => {
    switch (action.type) {
      case 'LOAD':
        return [...state, ...action.pokemons];
      case 'ADD':
        return [...state, action.pokemon];
      case 'REMOVE':
        return state.filter((pokemon) => pokemon.name !== action.name);
      default:
        throw new Error();
    }
  }, initialPokemons);

  const onLoad = useCallback((pokemons: IPokemon[]) => {
    dispatch({ type: 'LOAD', pokemons });
  }, []);

  const onAdd = useCallback((pokemon: IPokemon) => {
    dispatch({ type: 'ADD', pokemon });
  }, []);

  const onRemove = useCallback((pokemon: IPokemon) => {
    dispatch({ type: 'REMOVE', name: pokemon.name });
  }, []);

  return { pokemons, onAdd, onRemove, onLoad };
};
