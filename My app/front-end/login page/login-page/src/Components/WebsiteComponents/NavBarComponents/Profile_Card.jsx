import { useState, useRef, useEffect } from 'react'
import image from '../../../images/Profile_default.jpg'
import ProfileModal from './ProfileModal'
import { getPfp } from '../../../APICalls/ProfileModalAPICalls'
import '../../../Css/WebsiteCss/NavBarCss/Profile_Card.css'
import { useUserContext } from '../../../Contexts/User'

const Profile_Card = ({ name }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cardRef = useRef(null);
    const {pfp} = useUserContext();

    useEffect(() => {
        const fetchPfp = async () => {
            const url = await getPfp();
            setPfp(url);
        };
        fetchPfp();
    }, []);

    return (
        <div className='profile_card_wrapper' ref={cardRef}>
            <div className='profile_card' onClick={() => setIsModalOpen(!isModalOpen)}>
                <img src={pfp || image} alt='profile' />
                <p className='profile-name'>{name}</p>
            </div>
            {isModalOpen && <ProfileModal onClose={() => setIsModalOpen(false)} />}
        </div>
    )
}

export default Profile_Card;