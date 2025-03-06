import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Search from './Search';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import FlightChoose from './FlightChoose';

function App() {
  const [searchData, setSearchData] = useState({})


  const handleSearchSubmit = (data) => {
    setSearchData(data);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search onSubmitForm={handleSearchSubmit} />}/>
        <Route path="/flight" element={searchData && <FlightChoose searchData={searchData}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
