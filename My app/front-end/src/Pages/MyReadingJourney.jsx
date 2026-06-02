import { useEffect, useState } from "react";
import { useUserContext } from "../Contexts/User";
import AuthRequiredCard from "../Components/WebsiteComponents/AuthentificationRequestCard";
import EmptyReadingJourney from "../Components/WebsiteComponents/ReadsComponents/EmptyReads";
import ReadingJourney from "../Components/WebsiteComponents/ReadsComponents/FullReads";
import { getMyHistory } from "../APICalls/ReadsAPICalls";
import "../Css/WebsiteCss/ReadsCss/ReadsPage.css";

const MyReadingJourneyPage = () => {
    const { isAuthenticated } = useUserContext();
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem("token");
            const data = await getMyHistory(token);
            setHistory(data);
            setIsLoading(false);
        };
        if (isAuthenticated) fetchHistory();
    }, [isAuthenticated]);

    if (!isAuthenticated) return <AuthRequiredCard />;
    if (isLoading) return <div className="loading-spinner" />;

    return (
        <div className={`reading-journey-page ${history.length === 0 ? "empty" : ""}`}>
            {history.length === 0 ? (
                <EmptyReadingJourney />
            ) : (
                <ReadingJourney history={history} />
            )}
        </div>
    );
};

export default MyReadingJourneyPage;