import {Link} from 'react-router-dom';

import './submenu.css';

type SubMenuProps = {
    
    subMenuIsActive : boolean
    setLevelSelected : (levelSelected : number) => void,
    subMenuArrayToMap : number[]

    setDropDownIsActive : (dropDownIsHovered : boolean) => void,
    setSubMenuIsActive :  (subMenuIsActive : boolean) => void
}

const SubMenu = ({subMenuIsActive, setLevelSelected, subMenuArrayToMap, setDropDownIsActive, setSubMenuIsActive} : SubMenuProps) => (

    <ul className = "submenu" style = {{display: subMenuIsActive ? "" : "none"}} > 
        
        <li onClick = { () => { setSubMenuIsActive(false); } } >
            Back
        </li> 

        {subMenuArrayToMap.map( (subItem) => 

            <li key = {subItem}> 

                <Link to = '/PunjabiHangman' onClick = { () => { setLevelSelected(subItem); setDropDownIsActive(false); } } > 
                    {subItem === 0 ? "Kinder" : ("Level " + subItem)}
                </Link>

            </li>

        )}

    </ul>

)

export default SubMenu;