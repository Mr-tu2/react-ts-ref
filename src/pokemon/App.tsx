import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { usePokemons } from '../customHook';

// interface
interface IHeading {
  title: string;
}
// interface
interface IPokemon {
  name: string;
  url: string;
}

// type
type ActionType =
  | { type: 'ADD'; name: string; url: string }
  | { type: 'REMOVE'; name: string }
  | { type: 'LOAD'; pokemons: IPokemon[] };

// function component
const HeadingWithInterface: React.FC<IHeading> = ({ title, children }) => (
  <h2>
    {title}
    {children}
  </h2>
);

// function component with React.FC
const Box: React.FC = ({ children }) => {
  return <div>{children}</div>;
};

// function component with defined props
const List: React.FC<{
  items: IPokemon[];
  clickLabel: string;
  onClick?: (item: IPokemon) => void;
}> = ({ items, clickLabel, onClick }) => {
  return (
    <ul>
      {items.map((item, i) => {
        return (
          <li key={i}>
            <a href={item.url}>{item.name}</a>
            <button style={{ marginLeft: '10px' }} onClick={() => onClick?.(item)}>
              {clickLabel}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

// component with useState
function ComponentWithUseState() {
  // useState
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  // initial data load
  useEffect(() => {
    // invoke ajax request
    (async () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/?limit=5';
      const response = await axios.get<{ results: IPokemon[] }>(url);
      const pokemonList = response.data.results;
      // set pokemons for useState
      setPokemons([pokemonList[0], pokemonList[1]]);
    })();
  }, []);

  // onClick event
  const onListClick = useCallback((pokemon: IPokemon) => {
    alert(`clicked on ${pokemon.name}`);
  }, []);

  return (
    <>
      <Box>Pokemon List with useState</Box>
      <List items={pokemons} clickLabel="alert" onClick={onListClick} />
    </>
  );
}

function ComponentWithUseReducer() {
  // useReducer
  const [state, dispatch] = useReducer((state: IPokemon[], action: ActionType) => {
    switch (action.type) {
      case 'ADD':
        return [...state, { name: action.name, url: 'https://www.google.com' }];
      case 'REMOVE':
        return state.filter((v) => v.name !== action.name);
      case 'LOAD':
        return [...state, ...action.pokemons];
      default:
        throw new Error();
    }
  }, []);

  // useRef
  const inputRef = useRef<HTMLInputElement>(null);

  // initial data load
  useEffect(() => {
    // invoke ajax request
    (async () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/?limit=5';
      const response = await axios.get<{ results: IPokemon[] }>(url);
      const pokemonList = response.data.results;

      // set pokemons for useReducer
      dispatch({ type: 'LOAD', pokemons: pokemonList });
    })();

    // focus on input
    inputRef.current?.focus();
  }, []);

  const onAdd = () => {
    // check if inputRef has valid value, then dispatch action, ADD
    if (inputRef.current?.value) {
      dispatch({ type: 'ADD', name: inputRef.current.value, url: 'https://www.google.com' });
      inputRef.current.value = '';
    }

    // focus on input
    inputRef.current?.focus();
  };

  const onRemove = (pokemon: IPokemon) => {
    dispatch({ type: 'REMOVE', name: pokemon.name });
  };

  return (
    <>
      <Box>Pokemon List with useReducer</Box>
      <input ref={inputRef} />
      <button onClick={onAdd}>Add Pokemon</button>
      <List items={state} clickLabel="remove" onClick={onRemove} />
    </>
  );
}

function ComponentWithCustomHook() {
  const { onAdd, onLoad, onRemove, pokemons } = usePokemons([]);

  const inputRef = useRef<HTMLInputElement>(null);

  // initial data load
  useEffect(() => {
    // invoke ajax request
    (async () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/?limit=5';
      const response = await axios.get<{ results: IPokemon[] }>(url);
      const pokemonList = response.data.results;

      onLoad(pokemonList);
    })();
  }, []);

  const onClick = useCallback(() => {
    if (inputRef.current?.value) {
      onAdd({ name: inputRef.current.value, url: 'https://www.google.com' });
      inputRef.current.value = '';
    }
  }, []);

  return (
    <>
      <Box>Pokemon List using custom hook</Box>
      <input type="text" ref={inputRef} />
      <button onClick={onClick}>Add Pokemon</button>
      <List items={pokemons} clickLabel="remove" onClick={onRemove} />
    </>
  );
}

function App() {
  return (
    <>
      <HeadingWithInterface title="POKEMON EXERCISE" />

      <ComponentWithUseState />
      <ComponentWithUseReducer />
      <ComponentWithCustomHook />
    </>
  );
}

export default App;
