

const ReadMoreList = ({data}) =>{
    return (
    <div className="ReadMoreList">
        <div className="ListArray">
        <input
                  type="text"
                  className="form-control"
                  name="searchList"
                  placeholder="플레이리스트 검색"
                />
            </div>
        <div className="ListArray_section">
            <select></select>
        </div>
        
    </div>);
}

export default ReadMoreList;