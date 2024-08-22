import './MentionCard.css'

function ResultCard
({podcast, keyword, summary}: 
 {podcast: string, keyword: string, summary: string}) {
    return(
        <div className='resultcard'>
            <div className='resultcard-information'>
                <h1>{podcast}</h1>
                <div className='source'>
                    <h2 className='source-declaration'>{keyword}</h2> 
                </div>
            </div>
            <p className='resultcard-summary'>{summary}</p>
        </div>
    );
}

export default ResultCard;
