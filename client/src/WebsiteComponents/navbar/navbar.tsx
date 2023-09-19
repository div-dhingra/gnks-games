import {NavLink, useLocation} from 'react-router-dom';
import {useState} from 'react';

import './navbar.css'; 

import DropDown from './dropdown/dropdown';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';

type NavbarProperties = {
    setLevelSelected : (level : number) => void
}

const games = ["ਪੰਜਾਬੀ Hangman"];

const Navbar = ({setLevelSelected} : NavbarProperties) => {
    
    const [dropDownIsActive, setDropDownIsActive] = useState<boolean>(false);
    const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState<boolean>(false);    

    const location = useLocation();
    let currPath = location.pathname; 

    return (

    <nav className = "navbar-nav"> 

        <div className = {hamburgerMenuIsOpen ? "hamburger-close-icon" : "hamburger-open-icon" } 
          onClick = { () => {setHamburgerMenuIsOpen((prev) => !prev); } } > 

            <span> </span>
            <span style = {{visibility: hamburgerMenuIsOpen ? "hidden" : "visible"}}> </span>
            <span> </span>    

        </div> 

        <ul id = {hamburgerMenuIsOpen ? "" : "ul-default-view"} > 

            <span> | </span>
        
            <li> 
                
                <NavLink to = "/"> 
                    Home
                </NavLink>
            
            </li>

            <span> | </span>

            <li onMouseLeave = {() => setDropDownIsActive(false)} > 
            
                <a style = { {color: "white", background: (currPath === '/PunjabiHangman' ? "orange" : ""), borderRadius: "3px" } }
                    onMouseEnter = {() => {setDropDownIsActive(true); }} 
                    onClick = { () => { setDropDownIsActive(true); } } >
                        Games
                </a>
    
                {dropDownIsActive === true ? <FontAwesomeIcon icon = {faAngleUp} className = "caret" /> : <FontAwesomeIcon icon = {faAngleDown} className = "caret" /> }
                   
                <DropDown dropDownIsActive = {dropDownIsActive}  setDropDownIsActive = {setDropDownIsActive} setLevelSelected = {setLevelSelected}
                    dropDownArrayToMap={games} />

            </li>

            <span> | </span>

            <li>

                <NavLink to = '/About'>
                    About
                </NavLink>

            </li>

            <span> | </span>

        </ul>

    </nav>
    )

}

export default Navbar; 
