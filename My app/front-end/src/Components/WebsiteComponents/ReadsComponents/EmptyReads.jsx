import emptyHistory from "../../../images/Website-images/Empty-Reads-img.png";
import "../../../Css/WebsiteCss/ReadsCss/EmptyReads.css"
import { useNavigate } from "react-router-dom";

const EmptyReads = () => {
    const navigate = useNavigate();
    return (
        <div className="empty-history-wrapper">
            <img src={emptyHistory} alt="no history" className="empty-history-img" />
            <h2 className="empty-history-title">No Reading History Yet?</h2>
            <p className="empty-history-subtitle">
                Start your reading journey today!
            </p>
            <button className="hero-btn" onClick={() => navigate("/AllBooks")}>
                Explore Books
            </button>
        </div>
    );
};

export default EmptyReads;