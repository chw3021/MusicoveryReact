//홈화면 하단부


const ReadMoreItem = ({ id, playlistTitle,playlistComment, 
    playlistPhoto, musicCheckbox, selectedMusic, selectedConcept, playlistDate }) =>{
        return (
        <div className="ReadMoreItem">{playlistTitle}</div>
        );
    };


    export default ReadMoreItem;