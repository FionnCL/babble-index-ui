import { useState, useEffect, ReactNode } from 'react';
import axios, { 
    AxiosResponse, 
    AxiosRequestConfig, 
    RawAxiosRequestHeaders 
} from 'axios';

import { UserKeyword } from '../dtos/UserKeyword';
import { Keyword } from '../dtos/Keyword';
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
    const [userKeywords, setUserKeywords] = useState<string[]>([]);

    useEffect(() => {
        getKeywords();
        renderKeywords(); 
    },[]);

    async function addKeywordToAccount() {
        if(username === '') { return; }

        const userKeywordObject: UserKeyword = {
            username: username,
            keyword: keyword
        }

        await axiosKeywordClient.post(
            `/user/add-keyword`, userKeywordObject, axiosKeywordConfig);

        await getKeywords();
        renderKeywords(); 
    }

    function renderKeywords() {
        const keywordHtml = userKeywords.map((keyword) => {
            return <p>{keyword}</p>;
        });

        return keywordHtml;
    }

    function refresh(){
        setKeyword('');
    }

    async function getKeywords(){
        if(username === '') { return; }

        const getKeywordsResponse = 
            await axiosKeywordClient.get<[Keyword[]]>(
            `/user/get-keywords/${username}`, axiosKeywordConfig);
        
        console.log(getKeywordsResponse.data[0]);

        const keywordValues = getKeywordsResponse.data[0].map((keyword) => {
            return keyword.keyword;
        });

        setUserKeywords(keywordValues);
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
                    {renderKeywords()}
                </div>
                <div className='col'>
                    <h2>Mentions</h2> 
                </div>
            </div>
        </div>
    );
}

export default LiveUpdates;
