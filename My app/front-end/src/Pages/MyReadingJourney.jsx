import { useUserContext } from "../Contexts/User";
import AuthRequiredCard from "../Components/WebsiteComponents/AuthentificationRequestCard";

const MyReadingJourney = () => {
    const {isAuthenticated} = useUserContext();

    return (
        <>
            { !isAuthenticated ? (
                <AuthRequiredCard/>
            ) : {}}
        </>
    )
}

export default MyReadingJourney;