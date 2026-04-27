import image from '../../../images/Profile_default.jpg'
import '../../../Css/WebsiteCss/NavBarCss/Profile_Card.css'

const Profile_Card = ({name}) => {
    return (
        <div className='profile_card'>
            <img src={image}/>
            <p className='profile-name'>{name}</p>
        </div>
    )
}

export default Profile_Card;