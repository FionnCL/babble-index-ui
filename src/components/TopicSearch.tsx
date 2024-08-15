import { useState, useEffect } from 'react';
import axios, { 
    AxiosResponse, 
    AxiosRequestConfig, 
    RawAxiosRequestHeaders 
} from "axios";

import { SearchResults } from "../dtos/SearchResults";
import ResultCard from "./ResultCard";
import './TopicSearch.css';

const axiosSearchClient = axios.create({
    baseURL: "http://localhost:3000",
});

const axiosSearchConfig: AxiosRequestConfig = {
    headers: {
        "Accept": "application/json"
    } as RawAxiosRequestHeaders,
};

function TopicSearch(){
    const [input, setInput] = useState(""); 
    const [topicMessage, setTopicMessage] = useState("");
    const [results, setResults] = useState<SearchResults|undefined>(undefined);

    function refresh(){
        setInput("");
        setTopicMessage("");
        setResults(undefined);
    }

    // When the results/topicMessage variables change, this is invoked.
    useEffect(() => {
        // Displays "results found", message.
        if (results && topicMessage) {
            setTopicMessage(`Displaying results on ${input}`);
        }
    }, [results, topicMessage])

    async function handle_topic() {
        // Display wait message.
        setTopicMessage("Searching for recent sentiment on " + input + "...");
        
        const searchResponse: AxiosResponse = await axiosSearchClient.get(
            `/search/topic/${input}`, axiosSearchConfig);
        
        // Set the results of the search;
        setResults(searchResponse.data);
    }

    // Construct an array of ResultCard elements.
    function Results(results: SearchResults | undefined) {
        // If no results, return nothing, essentially.
        if (!results) { return <p></p>; }
        
        // Make component array:
        return results.items.map((item, idx) => {
            return (
                <ResultCard
                key={idx}
                title={item.title} 
                link={item.link}
                displayLink={item.displayLink}
                summary={item.summary}
                />
            );
        });
    }

    return(
        <div className='topic-search'>
            <h1>Search By Topic</h1>
            <form
            className="row"
            onSubmit={(e) => {
                e.preventDefault();
                handle_topic();
            }}>
                <input
                id="greet-input"
                onChange={(e) => setInput(e.currentTarget.value)}
                placeholder="Enter a topic..."
                />
                <button type="submit">Search</button>
                <button type="reset" className="restart" 
                onClick={refresh}>⟳ </button>
            </form>
            <p>{topicMessage}</p>
            <div className="resultcards">
                {Results(results)}
            </div>
        </div>
    );
}

export default TopicSearch;
