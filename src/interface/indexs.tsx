interface IHeading {
  title: string;
}
// interface
interface IPokemon {
  name: string;
  url: string;
}

const heading: IHeading = { title: 'hello' };
const pokemon: IPokemon = { name: 'bulbasaur', url: 'https://www.google.com' };

console.log(heading, pokemon);

export {};
