import React, { useState, useEffect } from "react";
import { getBookDescription } from "../../APICalls/BooksAPICalls";
import "../../Css/WebsiteCss/MainCss/BookDetailsModal.css";

const BookDetailsModal = ({ book, onClose }) => {
    const [description, setDescription] = useState("Loading...");
    const [publishedDate, setPublishedDate] = useState("");

    const title = book.volumeInfo?.title;
    const author = book.volumeInfo?.authors?.[0];
    const coverImg = book.volumeInfo?.imageLinks?.thumbnail;

    useEffect(() => {
        const fetchDesc = async () => {
            const result = await getBookDescription(title, author);
            console.log("result:", result);
            setDescription(result.description);
            setPublishedDate(result.publishedDate);
        };
        fetchDesc();
    }, [title, author]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>
                <img src={coverImg} alt={title} className="modal-cover" />
                <div className="modal-info">
                    <h2 className="modal-title">{title}</h2>
                    <p className="modal-author">{author}</p>
                    <p className="modal-date">📅 {publishedDate}</p>
                    <p className="modal-description">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsModal;