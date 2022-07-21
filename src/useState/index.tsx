import { useState } from 'react';

interface IPokemon {
  name: string;
  hp: number;
}

// with default react type
const PlaceHolder: React.FC<{
  pokemon: IPokemon;
  setPokemon: React.Dispatch<React.SetStateAction<IPokemon>>;
}> = ({ pokemon, setPokemon }) => {
  return (
    <div>
      <div>{pokemon.name}</div>
      <button onClick={() => setPokemon({ name: 'ivysaur', hp: 50 })}>Change Pokemon</button>
    </div>
  );
};

// use return type to type react type
const usePokemon = (init: IPokemon) => useState<IPokemon>(init);

type UsePokemonValue = ReturnType<typeof usePokemon>[0];
type UsePokemonSetValue = ReturnType<typeof usePokemon>[1];

const CustomHookForPropDrilling: React.FC<{
  pokemon: UsePokemonValue;
  setPokemon: UsePokemonSetValue;
}> = ({ pokemon, setPokemon }) => {
  return (
    <div>
      <div>{pokemon}</div>
      <button onClick={() => setPokemon({ name: 'ivysaur', hp: 50 })}>Change Pokemon</button>
    </div>
  );
};

export function App() {
  const [pokemon, setPokemon] = useState<IPokemon>({ name: 'bublasaur', hp: 100 });
  const [hookPokemon, setHookPokemon] = usePokemon({ name: 'bublasaur', hp: 100 });
  return (
    <>
      <PlaceHolder pokemon={pokemon} setPokemon={setPokemon} />;
      <CustomHookForPropDrilling pokemon={hookPokemon} setPokemon={setHookPokemon} />
    </>
  );
}
