import { open } from "@tauri-apps/api/shell";

import idiro from "../images/idiro.png";
import './Navbar.css';


function Navbar(){
    const openIdiroLink = () => {
        open("https://idiro.com/");
    };

    return(
        <div className="navbar">
            <h1>Babble Index</h1>
            <img onClick={openIdiroLink} alt="The Idiro Analytics logo." src={idiro}/>
        </div>
    );
}

export default Navbar;
