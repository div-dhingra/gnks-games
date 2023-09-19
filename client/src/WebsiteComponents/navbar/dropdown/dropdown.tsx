import {useState} from 'react';

import './dropdown.css';
import SubMenu from './submenu/submenu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown} from '@fortawesome/free-solid-svg-icons';

type DropDownProperties = {
    
    setLevelSelected : (levelSelected : number) => void,
    dropDownIsActive: boolean,
    setDropDownIsActive : (dropDownIsActive: boolean) => void,
    dropDownArrayToMap : string[],
    
}

const punjabiSchoolLevels = [0, 1];

const DropDown = ({setLevelSelected, dropDownIsActive, dropDownArrayToMap, setDropDownIsActive} : DropDownProperties) => {

    const [subMenuIsActive, setSubMenuIsActive] = useState<boolean>(false);

    return (
        
        <ul className = "dropdown" style = { { display: (dropDownIsActive ? "" : "none") } } >
            
            <li onClick = { () => { setDropDownIsActive(false); } } >
                Back
            </li> 

            {dropDownArrayToMap.map( (item) => (

                <li key = {item} onMouseLeave = {() => setSubMenuIsActive(false)}> 
                    
                    <a onMouseOver = {() => setSubMenuIsActive(true)} onClick = { () => { setSubMenuIsActive(true); } }>
                        {item}
                    </a>

                    { (subMenuIsActive) ? <FontAwesomeIcon icon = {faAngleRight} className = "caret-submenu" /> : 
                        <FontAwesomeIcon icon = {faAngleDown} className = "caret-submenu caret-down-offset" />}

                    <SubMenu subMenuIsActive ={subMenuIsActive} setSubMenuIsActive = {setSubMenuIsActive} setLevelSelected = {setLevelSelected}
                        subMenuArrayToMap = {punjabiSchoolLevels} setDropDownIsActive={setDropDownIsActive}/>
    
                </li>

            ))}

        </ul>

    )

}
export default DropDown; 