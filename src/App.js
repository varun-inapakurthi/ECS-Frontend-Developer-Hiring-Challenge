import './App.css';
import { useEffect, useState } from 'react';
import Dexie from 'dexie'
import Books from './components/Books';
import Pagination from './components/Pagination';
// import 
function App() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [booksPerPage, setBookPerPage] = useState(10)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      let data = await fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json');
      let tempdata = await data.json()
      setBooks(tempdata)
      var db = new Dexie("BooksDatabase");
      await db.version(1).stores({
        booksCollection: "bookID,authors,average_rating,isbn,language_code,price,ratings_count,title"
      });
      let deleteData = books.map(i => i.bookID)
      await db.booksCollection.bulkDelete(deleteData)
      await db.booksCollection.bulkAdd(books)
      setLoading(false)
    }
    getData()
  }, [])

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currenBooks = books.slice(indexOfFirstBook, indexOfLastBook)

  const paginate = pageNumber => setCurrentPage(currentPage + pageNumber);
  return (
    <div className="App container mt-5 mb-5">
      <h1>Books Store</h1>
      <table className="table table-straped table-responsive" >
        <thead className="table-dark">
          <tr >
            <th>ID</th>
            <th>TITLE</th>
            <th>AUTHORS</th>
            <th>RATING</th>
            <th>ISBN</th>
            <th>LANGUAGE</th>
            <th>TOTAL RATING</th>
            <th>PRICE</th>
          </tr>

        </thead>
        <tbody>
          <Books loading={loading} books={currenBooks} />
        </tbody>
      </table>
      { currenBooks.length && books.length && <Pagination
        booksPerPage={booksPerPage}
        totalbooks={books.length}
        paginate={paginate}
        prev={currenBooks[0].bookID}
        next={currenBooks[currenBooks.length - 1].bookID === books[books.length - 1].bookID}
      />}
    </div>
  );
}

export default App;
