import { useState } from "react";
import "../../../Css/WebsiteCss/ReadsCss/FullReads.css";

const ReadingJourney = ({ history }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatus = (ActualReturnDate, DueDate) => {
    if (ActualReturnDate) return "returned";
    const today = new Date();
    const due = new Date(DueDate);
    return today > due ? "overdue" : "borrowed";
  };

  const filteredHistory = history.filter((record) =>
    record.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="reading-journey-content">
      <div className="reading-journey-header">
        <h1 className="reading-journey-title">My Reading Journey</h1>
        <p className="reading-journey-count">
          <strong>{history.length}</strong> Books read so far
        </p>
      </div>

      <div className="reading-journey-search-bar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9e7b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search your history..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="reading-journey-search-input"
        />
      </div>

      <div className="reading-journey-list">
        {filteredHistory.map((record, index) => {
          const status = getStatus(record.ActualReturnDate, record.DueDate);
          return (
            <div
              key={index}
              className="reading-journey-card"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="reading-journey-card-left">
                <p className="reading-journey-book-title">{record.Title}</p>
                <p className="reading-journey-book-genre">{record.Genre}</p>
              </div>
              <div className="reading-journey-card-right">
                <p className="reading-journey-date">📅 Borrowed: {new Date(record.BorrowingDate).toLocaleDateString()}</p>
                <p className="reading-journey-date">⏳ Due: {new Date(record.DueDate).toLocaleDateString()}</p>
                {record.ActualReturnDate && (
                  <p className="reading-journey-date">✅ Returned: {new Date(record.ActualReturnDate).toLocaleDateString()}</p>
                )}
                <span className={`reading-journey-status ${status}`}>
                  {status === "returned" && "🟢 Returned"}
                  {status === "borrowed" && "🔵 Borrowed"}
                  {status === "overdue" && "🔴 Overdue"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReadingJourney;