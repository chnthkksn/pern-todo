import React, { useEffect, useState } from 'react';
import InputTodos from './components/InputTodos';
import ListTodos from './components/ListTodos';

function App() {

  const [savedTheme, setSavedTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.body.dataset.bsTheme = savedTheme;
  }, [savedTheme])

  function changeTheme() {
    const newTheme = savedTheme === 'light' ? 'dark' : 'light'
    setSavedTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <>
      <div className="container">
        <button className='position-absolute bottom-0 end-0 m-5 btn' onClick={changeTheme}> {
          savedTheme === 'light' ? <i className="bi bi-moon-fill"></i> : <i className="bi bi-brightness-high-fill"></i>
        } </button>
        <InputTodos />
        <ListTodos />
      </div>
    </>
  );
}

export default App;
