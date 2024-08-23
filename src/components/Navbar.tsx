import { useState, useEffect } from 'react';
import { open } from '@tauri-apps/api/shell';

import idiro from '../images/idiro.png';
import './Navbar.css';

interface NavbarProps {
    currentTab(tab: string): void;
}

function Navbar({ currentTab } : NavbarProps){
    const [tab, setTab] = useState('topic');

    const openIdiroLink = () => {
        open('https://idiro.com/');
    };

    useEffect(()=> {
            currentTab(tab);
    }, [tab]);
    
    const changeToTopic = () => {
        setTab('topic');
    }

    const changeToLiveUpdates = () => {
        setTab('live');
    }

    return(
        <div className='navbar'>
            <div className='left'>
                <h1 className={`tab ${tab=='topic' ? 'highlighted' : ''}`}
                onClick={changeToTopic}>Topic Search</h1>
                <h1 className={`tab ${tab=='live' ? 'highlighted' : ''}`} 
                onClick={changeToLiveUpdates}>Live Updates</h1>
            </div>
            <img onClick={openIdiroLink} 
            alt='The Idiro Analytics logo.' 
            src={idiro}/>
        </div>
    );
}

export default Navbar;
