const Books = ({ loading, books }) => {
    if (loading) {
        return <h2>Loading...</h2>
    }

    return (<>
        {books.map((book, inx) => (
            <tr >
                <td>{inx + 1}</td>
                <td>{book.title}</td>
                <td>{book.authors}</td>
                <td>{"⭐".repeat(book.average_rating)}</td>
                <td>{book.isbn}</td>
                <td>{book.language_code}</td>
                <td>{book.ratings_count}</td>
                <td>{book.price}</td>
            </tr>
        ))}
    </>);

}

export default Books;