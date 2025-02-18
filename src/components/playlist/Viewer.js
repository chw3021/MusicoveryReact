//상세화면 뷰

const Viewer = ({playlistTitle,playlistComment, 
    playlistPhoto, selectedMusic, selectedConcept, playlistDate}) =>{

        return (
        <div className="Viewer">
            <section>
            <h4>{playlistTitle}</h4>
            <h5>{playlistComment}</h5>
            </section>
        </div>
    );
    }

    export default Viewer;