import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
    const [input, setInput] = useState(""); 
    const [topicMessage, setTopicMessage] = useState("");
    const [results, setResults] = useState([]);

    function handle_topic() {
        // Display wait message.
        setTopicMessage("Searching for recent sentiment on " + input + "...");

        // Async await for results.
        (async () => {
            // Sets results.
            setResults(await invoke("topic_handler", { input }));
            // Displays 'results found', message.
            setTopicMessage("Displaying results on " + input + "...");
        });
    }
    
    // Uppercase is standard convention for component functions.
    function Results(r: string[]) {
        if (r && r.length > 0) {
            return <p>{r.toString()}</p>;
        }
        return <p></p>;
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
            placeholder="Enter a topic..."/>
            <button type="submit">Search</button>
        </form>
        <p>{topicMessage}</p>
        {Results(results)}
        </div>
    );
}

export default App;
