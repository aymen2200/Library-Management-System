import { useState, useRef, useEffect } from 'react'
import image from '../../../images/Profile_default.jpg'
import ProfileModal from './ProfileModal'
import '../../../Css/WebsiteCuts/NavBarCss/Profile_Card.css'

const Profile_Card = ({ name }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const cardRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (cardRef.current && !cardRef.current.contains(e.target)) {
                setIsModalOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className='profile_card_wrapper' ref={cardRef}>
            <div className='profile_card' onClick={() => setIsModalOpen(!isModalOpen)}>
                <img src={image} alt='profile' />
                <p className='profile-name'>{name}</p>
            </div>
            {isModalOpen && <ProfileModal onClose={() => setIsModalOpen(false)} />}
        </div>
    )
}

export default Profile_Card