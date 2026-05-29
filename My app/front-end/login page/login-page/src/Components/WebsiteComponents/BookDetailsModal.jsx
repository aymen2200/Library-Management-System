import "../../Css/WebsiteCss/MainCss/BookDetailsModal.css";

const BookDetailsModal = ({ book, onClose }) => {
    const title = book.Title;
    const author = book.Authors;
    const coverImg = `https://covers.openlibrary.org/b/isbn/${book.ISBN}-L.jpg`;
    const description = book.AdditionalDetails || "No description available.";
    const publishedDate = book.PublicationDate 
    ? new Date(book.PublicationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : "Unknown";

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