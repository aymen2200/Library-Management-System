import { useState } from "react";
import { createPortal } from "react-dom";
import "../../Css/WebsiteCss/MainCss/BorrowModal.css";

const BorrowModal = ({ book, onClose }) => {
  const { title, available, availableFrom, pricePerDay } = book;
  const [step, setStep] = useState(available ? "borrow" : "confirm");
  const [days, setDays] = useState(1);

  const totalPrice = days * pricePerDay;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric"
    });
  };

  const modalContent = step === "confirm" ? (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Book Unavailable</h2>
        <p className="modal-message">
          This book will be available starting from
          <span className="modal-date"> {formatDate(availableFrom)}</span>.
          Would you like to reserve it from that date?
        </p>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-confirm" onClick={() => setStep("borrow")}>Yes, Reserve</button>
        </div>
      </div>
    </div>
  ) : (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{available ? "Borrow Now" : "Reserve from " + formatDate(availableFrom)}</h2>
        <p className="modal-book-title">{title}</p>

        <div className="modal-days">
          <label className="modal-label">Number of days</label>
          <div className="days-counter">
            <button className="counter-btn" onClick={() => setDays(d => Math.max(1, d - 1))}>−</button>
            <span className="counter-value">{days}</span>
            <button className="counter-btn" onClick={() => setDays(d => Math.min(30, d + 1))}>+</button>
          </div>
        </div>

        <div className="modal-price-row">
          <span className="modal-label">Price per day</span>
          <span className="modal-price-value">{pricePerDay} DZD</span>
        </div>
        <div className="modal-total-row">
          <span className="modal-label">Total</span>
          <span className="modal-total-value">{totalPrice} DZD</span>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-confirm" onClick={() => { onClose(); }}>Confirm</button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default BorrowModal;