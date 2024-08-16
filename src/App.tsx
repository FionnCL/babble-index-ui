//import { invoke } from '@tauri-apps/api/tauri';
import { useState, useEffect } from 'react';
import axios, { 
    AxiosResponse, 
    AxiosRequestConfig, 
    RawAxiosRequestHeaders 
} from 'axios';

import './App.css';

import { User } from './dtos/User';
import Navbar from './components/Navbar';
import TopicSearch from './components/TopicSearch';
import LiveUpdates from './components/LiveUpdates';

const axiosTranscriptConfig: AxiosRequestConfig = {
    headers: {
        'Accept': 'application/json'
    } as RawAxiosRequestHeaders,
};

const axiosTranscriptClient = axios.create({
    baseURL: 'http://localhost:3000',
});

function App() {
    const [username, setUsername] = useState('');
    const [tab, setTab] = useState('topic');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleTabChange = (currentTab: string) => {
        setTab(currentTab); 
    }

    function displayTab(): JSX.Element {
        switch(tab){
            case 'topic':
                return <TopicSearch/>;
            case 'live':
                return <LiveUpdates username={username}/>;
            default:
                return <TopicSearch/>;
        }
    }

    // Check for tab changes.
    useEffect(() => {
        displayTab(); 
    }, [tab]);

    async function checkForUser() {
        // Bad practice:
        //  - Should use JWTs or session auth.
        //  - Just for proof of concept.
        //  And to mention the obvious: no password.

        const userObject: User = {
            username: username
        }

        const loginResponse: AxiosResponse = await axiosTranscriptClient
        .post(`/user/verify`, 
              userObject, 
              axiosTranscriptConfig
        );

        if(loginResponse.status === 200) {
            setLoggedIn(true); 
        }
    }

    function loginHandler(): JSX.Element {
        if(loggedIn){
            return (
                <div>
                    <Navbar currentTab={handleTabChange}/>
                    {displayTab()}
                </div>
            );
        } else {
            return (
                <div>
                    <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        checkForUser();
                    }}>
                        <input
                        id='login-information'
                        onChange={(e) => setUsername(e.currentTarget.value)}
                        placeholder='Username'
                        />
                        <button className='login-button' type='submit'>Log In</button>
                    </form>
                </div>
            );
        }
    }

    useEffect(() => {
        loginHandler();
    }, [loggedIn]);

    return (
        <div className='container'>
            {loginHandler()}
        </div>
    );
}

export default App;
