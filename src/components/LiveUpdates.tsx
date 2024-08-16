import { useState, useEffect } from 'react';
import axios, { 
    AxiosResponse, 
    AxiosRequestConfig, 
    RawAxiosRequestHeaders 
} from 'axios';

import { UserKeyword } from '../dtos/UserKeyword';
import './LiveUpdates.css';

const axiosKeywordClient = axios.create({
    baseURL: 'http://localhost:3000',
});

const axiosKeywordConfig: AxiosRequestConfig = {
    headers: {
        'Accept': 'application/json'
    } as RawAxiosRequestHeaders,
};

function LiveUpdates({username}: 
 {username: string}){
    const [keyword, setKeyword] = useState('');


    async function addKeywordToAccount() {
        if(username === '') { return; }

        const userKeywordObject: UserKeyword = {
            username: username,
            keyword: keyword
        }

        const searchResponse: AxiosResponse = await axiosKeywordClient.post(
            `/user/add-keyword`, userKeywordObject, axiosKeywordConfig);
        
        console.log(searchResponse);
    }

    function refresh(){
        setKeyword('');
    }

    return(
        <div className='live-updates'>
            <h1>Live Updates</h1>
            <div className='cols'>
                <div className='col'>
                    <h2>Keywords</h2>
                    <form
                    className='row'
                    onSubmit={(e) => {
                        e.preventDefault();
                        addKeywordToAccount();
                    }}>
                        <input
                        onChange={(e) => setKeyword(e.currentTarget.value)}
                        placeholder='Keyword'
                        />
                        <button className='add-button' type='submit'>
                        Add to Account</button>
                        <button 
                        onClick={refresh} 
                        type='reset' 
                        className='restart'>⟳ </button>
                    </form>
                </div>
                <div className='col'>
                    <h2>Mentions</h2> 
                </div>
            </div>
        </div>
    );
}

export default LiveUpdates;
