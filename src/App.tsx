//import { invoke } from "@tauri-apps/api/tauri";
import { useState, useEffect } from "react";
import axios, { 
    AxiosResponse, 
    AxiosRequestConfig, 
    RawAxiosRequestHeaders 
} from 'axios';

import "./App.css";

import { SearchResults } from "./dtos/SearchResults";
import ResultCard from "./components/ResultCard";

const axiosSearchClient = axios.create({
    baseURL: 'http://localhost:3000',
});

const axiosSearchConfig: AxiosRequestConfig = {
    headers: {
        'Accept': 'application/json'
    } as RawAxiosRequestHeaders,
};

function App() {
    const [input, setInput] = useState(""); 
    const [topicMessage, setTopicMessage] = useState("");
    const [results, setResults] = useState<SearchResults|undefined>(undefined);

    async function handle_topic() {
        // Display wait message.
        setTopicMessage("Searching for recent sentiment on " + input + "...");
        
        const searchResponse: AxiosResponse = await axiosSearchClient.get(
            `/search/topic/${input}`, axiosSearchConfig);
        
        // Set the results of the search;
        console.log(searchResponse.data);
        setResults(searchResponse.data);

    }

    // When the results variable changes, this is invoked
    useEffect(() => {
        // Displays 'results found', message.
        if (results && topicMessage) {
            setTopicMessage(`Displaying results on ${input}...`);
        }
    }, [results, topicMessage])
    
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
                summary={item.summary}
                />
            );
        });
    }

    function refresh(){
        setInput("");
        setTopicMessage("");
        setResults(undefined);
    }

    return (
        <div className="container">
            <h1>Babble Index</h1>
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
                <button type="reset" className="restart" onClick={refresh}>⟳ </button>
            </form>
            <p>{topicMessage}</p>
            <div className="resultcards">
                {Results(results)}
            </div>
        </div>
    );
}

export default App;
