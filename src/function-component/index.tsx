import React from 'react';

interface IHeading {
  title: string;
}
// interface
interface IPokemon {
  name: string;
  url: string;
}

// function component with inline typing
const HeadingWithInlineTyping = ({ title }: { title: string }) => <div>{title}</div>;

// function component
const HeadingWithInterface = ({ title }: IHeading) => <h2>{title}</h2>;

// function component with React.FC
const Box: React.FC = ({ children }) => {
  return <div>{children}</div>;
};

// function component with React.FC and defined props
const List: React.FC<{ items: IPokemon[]; onClick?: (item: IPokemon) => void }> = ({
  items,
  onClick
}) => {
  return (
    <ul>
      {items.map((item, i) => {
        return (
          <li key={i} onClick={() => onClick?.(item)}>
            <a href={item.url}>{item.name}</a>
          </li>
        );
      })}
    </ul>
  );
};

export const Example = () => {
  const onClick = (item: IPokemon) => {
    console.log(item.name);
  };

  return (
    <>
      <HeadingWithInlineTyping title="test" />
      <HeadingWithInterface title="test" />
      <Box>
        <div>test</div>
        <div>test2</div>
      </Box>
      <List
        items={[
          { name: 'bulbasaur', url: 'https://www.google.com' },
          { name: 'ivysaur', url: 'https://www.google.com' }
        ]}
        onClick={onClick}
      />
    </>
  );
};
