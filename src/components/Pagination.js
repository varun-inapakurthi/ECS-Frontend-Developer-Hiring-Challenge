import './../App.css'
const Pagination = ({ paginate, prev, next }) => {
    return (
        <div className="App" style={{
            display: "flex",
            flexDirectionD: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
        }}>
            <nav >
                <ul className='pagination'>
                    <li className='page-item'>
                        <button className="btn btn-dark" style={{ marginRight: "5px" }} disabled={prev === 1} onClick={() => paginate(-10)} >Prev</button>
                        <button className="btn btn-dark" style={{ marginLeft: "5px" }} disabled={next} onClick={() => paginate(10)}  >Next</button>
                    </li>

                </ul>
            </nav>
        </div >
    );
};

export default Pagination