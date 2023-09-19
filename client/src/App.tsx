import {useState} from 'react';
import {Routes, Route} from 'react-router-dom';

import './App.css';

import LogoHeader from './WebsiteComponents/logoHeader/logoHeader'
import Navbar from './WebsiteComponents/navbar/navbar'

import Home from './WebsiteComponents/belowNavBarContent/Home/Home';
import About from './WebsiteComponents/belowNavBarContent/About/About';
import Hangman from './WebsiteComponents/belowNavBarContent/Games/Hangman/Hangman';

const App = () => {

  const [levelSelected, setLevelSelected] = useState<number>(0);

  return (
    
    <div className = "App"> 

      <LogoHeader/>
      <Navbar setLevelSelected = {setLevelSelected} />
     
      <Routes> 

        <Route path = '/' element = {<Home/>}/>

        <Route path = '/PunjabiHangman' element = {<Hangman levelSelected = {levelSelected}/>} />

        <Route path = '/About' element = {<About/>} />

      </Routes>

    </div>
  )
}

export default App; 