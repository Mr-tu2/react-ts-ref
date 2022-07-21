// https://unpkg.com/@types/react@16.4.7/index.d.ts
// search for IntrinsicElements
// https://www.youtube.com/watch?v=9y0eY6hs1QM&list=PLNqp92_EXZBJYFrpEzdO2EapvU0GOJ09n&index=25

// DetailedHTMLProps with extension to type of title
// if title is not provided, use children instead
// provides style as a custom HTML prop for extensibility
const Button: React.FC<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> & { title?: string } = ({ children, style, title, ...rest }) => {
  return (
    <button
      style={{
        ...style,
        fontWeight: 'bold',
        marginLeft: '100px',
        marginTop: '30px',
        backgroundColor: 'green'
      }}
      {...rest}>
      {title ?? children}
    </button>
  );
};

export function App() {
  return <Button title="A Button"></Button>;
}
