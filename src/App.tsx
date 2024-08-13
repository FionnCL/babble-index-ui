//import { invoke } from "@tauri-apps/api/tauri";
import { useState, useEffect } from "react";
import axios, { 
    AxiosResponse, 
    AxiosRequestConfig, 
    RawAxiosRequestHeaders 
} from "axios";

import "./App.css";

import { SearchResults } from "./dtos/SearchResults";
import { PostUser } from "./dtos/PostUser";
import ResultCard from "./components/ResultCard";
import Navbar from "./components/Navbar";

const axiosSearchClient = axios.create({
    baseURL: "http://localhost:4000",
});

const axiosSearchConfig: AxiosRequestConfig = {
    headers: {
        "Accept": "application/json"
    } as RawAxiosRequestHeaders,
};

const axiosTranscriptClient = axios.create({
    baseURL: "http://localhost:3000",
});

function App() {
    const [input, setInput] = useState(""); 
    const [username, setUsername] = useState("");
    const [topicMessage, setTopicMessage] = useState("");
    const [results, setResults] = useState<SearchResults|undefined>(undefined);
    const [tab, setTab] = useState("topic");
    const [loggedIn, setLoggedIn] = useState(false);

    async function handle_topic() {
        // Display wait message.
        setTopicMessage("Searching for recent sentiment on " + input + "...");
        
        const searchResponse: AxiosResponse = await axiosSearchClient.get(
            `/search/topic/${input}`, axiosSearchConfig);
        
        // Set the results of the search;
        setResults(searchResponse.data);
    }

    // When the results/topicMessage variables change, this is invoked.
    useEffect(() => {
        // Displays "results found", message.
        if (results && topicMessage) {
            setTopicMessage(`Displaying results on ${input}`);
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
                displayLink={item.displayLink}
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

    const handleTabChange = (currentTab: string) => {
        setTab(currentTab); 
    }

    function displayTopicSearch(){
        return(
            <div>
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

    function displayWatchdog(){
        return(
            <div>
                <h1>Live Updates</h1>
            </div>
        );
    }

    function displayTab(): JSX.Element {
        switch(tab){
            case "topic":
                return displayTopicSearch();
            case "watchdog":
                return displayWatchdog();
            default:
                return displayTopicSearch();
        }
    }

    // Check for tab changes.
    useEffect(() => {
        displayTab(); 
    }, [tab]);

    async function checkForUser() {
        // Check database for user using API Request to audio API.
        // If there is no user, wait for the API to create one,
        // and then: setLoggedIn(true);

        const userObject: PostUser = {
            username: username
        }

        const loginResponse: AxiosResponse = await axiosTranscriptClient
        .post(`/verify/user`, 
              userObject, 
              axiosSearchConfig
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
                        id="login-information"
                        onChange={(e) => setUsername(e.currentTarget.value)}
                        placeholder="Username"
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>
            );
        }
    }

    useEffect(() => {
        loginHandler();
    },[loggedIn]);

    return (
        <div className="container">
            {loginHandler()}
        </div>
    );
}

export default App;
