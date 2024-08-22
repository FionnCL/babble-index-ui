import { useState, useEffect, ReactNode } from 'react';
import axios, { 
    AxiosResponse, 
    AxiosRequestConfig, 
    RawAxiosRequestHeaders 
} from 'axios';

import { UserKeyword } from '../dtos/UserKeyword';
import { Keyword } from '../dtos/Keyword';
import MentionCard from './MentionCard';
import { Summary } from '../dtos/Summary';
import './LiveUpdates.css';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000',
});

const axiosConfig: AxiosRequestConfig = {
    headers: {
        'Accept': 'application/json'
    } as RawAxiosRequestHeaders,
};

function LiveUpdates({username}: 
 {username: string}){
    const [keyword, setKeyword] = useState('');
    const [userKeywords, setUserKeywords] = useState<string[]>([]);
    const [summaries, setSummaries] = useState<Summary[]>();

    useEffect(() => {
        getKeywords();
        renderKeywords(); 
        getSummaries();
        renderSummaries();
    },[]);

    async function addKeywordToAccount() {
        if(username === '') { return; }

        const userKeywordObject: UserKeyword = {
            username: username,
            keyword: keyword
        }

        await axiosClient.post(
            `/user/add-keyword`, userKeywordObject, axiosConfig);

        await getKeywords();
        renderKeywords(); 
    }

    function renderKeywords() {
        const keywordHtml = userKeywords.map((keyword) => {
            return <p>{keyword}</p>;
        });

        return keywordHtml;
    }

    function renderSummaries() {
        if(!summaries) { return <p>Pending summaries</p>; }

        const summaryHtml = summaries.map((summary) => {
            return(
                <MentionCard 
                podcast={summary.podcast} 
                keyword={summary.keyword} 
                summary={summary.summary}/>
            );
        });

        return summaryHtml;
    }

    function refresh(){
        setKeyword('');
    }

    async function getKeywords(){
        if(username === '') { return; }

        const getKeywordsResponse = 
            await axiosClient.get<[Keyword[]]>(
            `/user/get-keywords/${username}`, axiosConfig);
        
        console.log(getKeywordsResponse.data[0]);

        const keywordValues = getKeywordsResponse.data[0].map((keyword) => {
            return keyword.keyword;
        });

        setUserKeywords(keywordValues);
    }

    async function getSummaries(){
        if(username === '') { return; }

        const getSummariesResponse = 
            await axiosClient.get<Summary[]>(
            `/user/get-summaries/${username}`, axiosConfig);
        
        console.log(getSummariesResponse.data);

        const summaryArray: Summary[] = getSummariesResponse.data.map((s) => {
            return {
                podcast: s.podcast,
                keyword: s.keyword,
                summary: s.summary
            } as Summary;
        });

        setSummaries(summaryArray);
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
                    {renderSummaries()}
                </div>
            </div>
        </div>
    );
}

export default LiveUpdates;
