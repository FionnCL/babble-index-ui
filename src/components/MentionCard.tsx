import './MentionCard.css'

function ResultCard
({podcast, keyword, summary}: 
 {podcast: string, keyword: string, summary: string}) {
    return(
        <div className='mentioncard'>
            <div className='mentioncard-information'>
                <h1>{podcast}</h1>
                    <h2 className='mentioncard-keyword'>{keyword}</h2> 
            </div>
            <p className='mentioncard-summary'>{summary}</p>
        </div>
    );
}

export default ResultCard;
