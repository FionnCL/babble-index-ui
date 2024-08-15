import { useState, useEffect } from 'react';
import axios, { 
    AxiosResponse, 
    AxiosRequestConfig, 
    RawAxiosRequestHeaders 
} from 'axios';

import './LiveUpdates.css';

const axiosSearchClient = axios.create({
    baseURL: 'http://localhost:4000',
});

const axiosSearchConfig: AxiosRequestConfig = {
    headers: {
        'Accept': 'application/json'
    } as RawAxiosRequestHeaders,
};

function LiveUpdates(){
    const [input, setInput] = useState('');

    async function addKeywordToAccount() {
        const searchResponse: AxiosResponse = await axiosSearchClient.get(
            `/search/topic/${input}`, axiosSearchConfig);
        
        console.log(searchResponse);
        // Set the results of the search;
        //setResults(searchResponse.data);
    }

    function refresh(){
        setInput('');
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
                        onChange={(e) => setInput(e.currentTarget.value)}
                        placeholder='Enter a topic...'
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
