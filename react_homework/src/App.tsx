import { useState } from 'react'
import './App.css'

const App = () => {
  const [number, setNumber] = useState('');

  const handleChange = (event: any) => {
    const inputValue = event.target.value;
    setNumber(inputValue);
  };

  const multipliedNumber = number ? number * 2 : '';

  return (
    <div>
      <input type="number" value={number} onChange={handleChange}/>
      <p>{multipliedNumber}</p>
    </div>
  );
};

export default App;
