import { useEffect, useState } from "react";
import axios, { 
    AxiosResponse, 
    AxiosRequestConfig, 
    RawAxiosRequestHeaders 
} from 'axios';
//import { invoke } from "@tauri-apps/api/tauri";

import "./App.css";

import { SearchResults } from "./dtos/SearchResults";
import ResultCard from "./components/ResultCard";

const axiosSearchClient = axios.create({
    //baseURL: 'https://search-engine-e28d7.web.app',
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

        // Displays 'results found', message.
        if (results) {
            setTopicMessage(`Displaying results on ${input}...`);
        } else {
            setTopicMessage(`Searching for sentiment on ${input}`);
        }
    }
    
    // Uppercase is the usual convention for component-returning functions.
    function Results(results: SearchResults | undefined) {
        if (results) {
            // Make component array:
            return results.items.map((item) => {
                return (
                    <ResultCard
                        title={item.title} 
                        link={item.link}
                        summary={item.summary}
                    />
                );
            });
        }
        // If no results, return nothing, essentially.
        return <p>Generating summaries...</p>;
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
            </form>
            <p>{topicMessage}</p>
            <div className="resultcards">
                {Results(results)}
            </div>
        </div>
    );
}

export default App;
