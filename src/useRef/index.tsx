import { useRef } from 'react';

export function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input type="text" ref={inputRef} />
      <button onClick={() => console.log(inputRef.current?.value)}></button>
    </>
  );
}
