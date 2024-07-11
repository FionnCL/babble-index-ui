import { open } from "@tauri-apps/api/shell";

import "./ResultCard.css"

function ResultCard
({title, link, summary}: {title: string, link: string, summary: string}) {

    const openLink = () => {
        open(link);
    };

    return(
        <div className="resultcard">
            <div className="resultcard-information">
                <h1>{title}</h1>
                <div className="source">
                    <h2 className="source-declaration">Source:&nbsp;</h2> 
                    <h2 className="source-link" onClick={openLink}>{link}</h2>
                </div>
            </div>
            <p className="resultcard-summary">{summary}</p>
        </div>
    );
}

export default ResultCard;
