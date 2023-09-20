import {useState} from 'react';
import {Routes, Route} from 'react-router-dom';

import './App.css';

import LogoHeader from './WebsiteComponents/logoHeader/logoHeader'
import Navbar from './WebsiteComponents/navbar/navbar'

import Home from './WebsiteComponents/belowNavBarContent/Home/Home';
import About from './WebsiteComponents/belowNavBarContent/About/About';
import Hangman from './WebsiteComponents/belowNavBarContent/Games/Hangman/Hangman';

// * NOTE: To use 'react-router' (client-side routing) in my React-Application (CRA, Vite, etc.) in render.com,
// * I need to add a 'redirect' rule to allow continuous refreshing and retainence of the subpage (/PunjabiHangman, /About)
// * INSTEAD OF ending up with my subpages (react-router-dom client-side-routed subpages) showing 'NOT FOUND' 
// * on 1 refresh...

// * SOURCE: 
// * https://community.render.com/t/refreshing-production-subpage-does-not-work/12260
// * https://render.com/docs/deploy-create-react-app#using-client-side-routing

// NOTE: Make sure to add these deployment-environment configurations BEFORE DEPLOYING -> 
// Go to 'Redirects/Rewrites' tab before/during deployment (NOT AFTER), and type in the 
// 'render.com'-client-side-routing-react-router-dom, documentation-specified configuration, clicking 'Save Changes'.
// Then, after the React, static-site finishes deploying, click the generated link & navigate to the designated route,
// then refresh the SUBPAGE (/PunjabiHangman, /PunjabiWordle, /About) to check that the HTTP-knowledge of the page persists, 
// meaning that 'NOT FOUND' (Error: 404, resource not found) doesn't occur!

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