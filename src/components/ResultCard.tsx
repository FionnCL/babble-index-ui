import './ResultCard.css'

function ResultCard
({title, link, summary}: {title: string, link: string, summary: string}) {
    return(
        <div className='resultcard'>
            <div className='resultcard-information'>
                <h1>{title}</h1>
                <h2>{link}</h2>
            </div>
            <p className='resultcard-summary'>{summary}</p>
        </div>
    );
}

export default ResultCard;
