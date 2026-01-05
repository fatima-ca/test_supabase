'use client'
import "./Bookcard.css"

interface Book {
    titleBook: string;
    descBook: string;
    authBook: string;
}

interface BookProps {
    bookData: Book;
}

const Bookcard: React.FC<BookProps> = ({bookData}) => {
    return(
        <div className="costum-card">
            <h1 className="title-book"> Title: {bookData.titleBook}</h1>
            <h1 className="desc-book"> Author: {bookData.authBook}</h1>
            <h1 className="desc-book"> Description: {bookData.descBook}</h1>
            
        </div>
    )
}

export default Bookcard;