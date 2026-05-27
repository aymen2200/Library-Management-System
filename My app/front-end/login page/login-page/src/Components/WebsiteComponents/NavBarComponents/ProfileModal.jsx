import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../../Contexts/User'
import { Heart, BookOpen, LogOut, Camera, X, KeyRound, Eye, EyeOff, AlertCircle } from 'lucide-react'
import defaultImage from '../../../images/Profile_default.jpg'
import '../../../Css/WebsiteCss/NavBarCss/ProfileModal.css'
import { getMe, updateName, changePassword, getFavoritesCount, getReadingHistoryCount, getMyFines, updateProfilePicture } from '../../../api/userApi'
import { getPfp } from '../../../APICalls/ProfileModalAPICalls'

const ProfileModal = ({ onClose }) => {
    const { currentUser, logout, UserInfo } = useUserContext()
    const navigate = useNavigate()

    const [isEditingName, setIsEditingName] = useState(false)
    const [name, setName] = useState(currentUser.name || 'User')
    const [showPasswordForm, setShowPasswordForm] = useState(false)
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [favoritesCount, setFavoritesCount] = useState(0)
    const [readingHistoryCount, setReadingHistoryCount] = useState(0)
    const [memberSince, setMemberSince] = useState('...')
    const [fines, setFines] = useState([])
    const [passwordError, setPasswordError] = useState('')
    const [passwordSuccess, setPasswordSuccess] = useState('')
    const [pfp, setPfp] = useState(null)

    const fileInputRef = useRef(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const me = await getMe()
                if (me.CreatedAt || me.createdAt) {
                    const date = new Date(me.CreatedAt || me.createdAt)
                    setMemberSince(date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }))
                }
            } catch (err) {
                console.error('Failed to fetch user info:', err)
            }

            try {
                const favCount = await getFavoritesCount()
                setFavoritesCount(favCount)
            } catch (err) {
                console.error('Failed to fetch favorites:', err)
            }

            try {
                const historyCount = await getReadingHistoryCount()
                setReadingHistoryCount(historyCount)
            } catch (err) {
                console.error('Failed to fetch reading history:', err)
            }

            try {
                const myFines = await getMyFines()
                setFines(myFines)
            } catch (err) {
                console.error('Failed to fetch fines:', err)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchPfp = async () => {
            const url = await getPfp()
            setPfp(url)
        }
        fetchPfp()
    }, [])

    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        if (file) {
            try {
                const data = await updateProfilePicture(file)
                setPfp(data.profilePicture)
            } catch (err) {
                console.error('Failed to update profile picture:', err)
            }
        }
    }

    const handleNameSave = async () => {
        try {
            await updateName(name)
            UserInfo(name, currentUser.email, currentUser.id)
            setIsEditingName(false)
        } catch (err) {
            console.error('Failed to update name:', err)
            setIsEditingName(false)
        }
    }

    const handlePasswordChange = async () => {
        setPasswordError('')
        setPasswordSuccess('')
        try {
            await changePassword(oldPassword, newPassword)
            setPasswordSuccess('Password updated successfully!')
            setOldPassword('')
            setNewPassword('')
            setTimeout(() => {
                setShowPasswordForm(false)
                setPasswordSuccess('')
            }, 2000)
        } catch (err) {
            setPasswordError(err.response?.data?.error || 'Failed to change password')
        }
    }

    const handleLogout = () => {
        logout()
        onClose()
        navigate('/')
    }

    const handleFavoritesClick = () => {
        onClose()
        navigate('/Favorites')
    }

    const handleHistoryClick = () => {
        onClose()
        navigate('/MyReadingJourney')
    }

    const pendingFines = fines.filter(f => f.PaymentStatus === 'Pending')
    const totalFines = pendingFines.reduce((sum, f) => sum + f.FineAmount, 0)

    return (
        <div className='profile-modal'>
            <div className='modal-avatar-section'>
                <div className='modal-avatar-wrapper'>
                    <img src={pfp || defaultImage} alt='profile' className='modal-avatar' />
                    <button className='modal-avatar-edit' onClick={() => fileInputRef.current.click()}>
                        <Camera size={13} />
                    </button>
                    <input type='file' accept='image/*' ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                </div>
            </div>

            <div className='modal-name-section'>
                {isEditingName ? (
                    <div className='modal-name-edit'>
                        <input value={name} onChange={(e) => setName(e.target.value)} className='modal-name-input' autoFocus />
                        <button className='modal-save-btn' onClick={handleNameSave}>Save</button>
                        <button className='modal-cancel-btn' onClick={() => setIsEditingName(false)}><X size={14} /></button>
                    </div>
                ) : (
                    <p className='modal-name' onClick={() => setIsEditingName(true)} title='Click to edit'>
                        {name} <span className='modal-edit-hint'>✎</span>
                    </p>
                )}
                <p className='modal-email'>{currentUser.email}</p>
                <p className='modal-since'>Member since {memberSince}</p>
            </div>

            <div className='modal-divider' />

            <div className='modal-stats'>
                <div className='modal-stat' onClick={handleFavoritesClick}>
                    <Heart size={16} />
                    <span className='modal-stat-value'>{favoritesCount}</span>
                    <span className='modal-stat-label'>Favorites</span>
                </div>
                <div className='modal-stat-divider' />
                <div className='modal-stat' onClick={handleHistoryClick}>
                    <BookOpen size={16} />
                    <span className='modal-stat-value'>{readingHistoryCount}</span>
                    <span className='modal-stat-label'>Books Read</span>
                </div>
            </div>

            {pendingFines.length > 0 && (
                <>
                    <div className='modal-divider' />
                    <div className='modal-fines'>
                        <AlertCircle size={15} color='#c0392b' />
                        <span className='modal-fines-text'>Outstanding fines: <strong>{totalFines} DZD</strong></span>
                    </div>
                </>
            )}

            <div className='modal-divider' />

            <div className='modal-actions'>
                <button className='modal-action-btn' onClick={() => setShowPasswordForm(!showPasswordForm)}>
                    <KeyRound size={15} />
                    Change Password
                </button>

                {showPasswordForm && (
                    <div className='modal-password-form'>
                        <div className='modal-password-input-wrapper'>
                            <input type={showOldPassword ? 'text' : 'password'} placeholder='Current password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className='modal-password-input' />
                            <span onClick={() => setShowOldPassword(!showOldPassword)}>
                                {showOldPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                            </span>
                        </div>
                        <div className='modal-password-input-wrapper'>
                            <input type={showNewPassword ? 'text' : 'password'} placeholder='New password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='modal-password-input' />
                            <span onClick={() => setShowNewPassword(!showNewPassword)}>
                                {showNewPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                            </span>
                        </div>
                        {passwordError && <p className='modal-password-error'>{passwordError}</p>}
                        {passwordSuccess && <p className='modal-password-success'>{passwordSuccess}</p>}
                        <button className='modal-password-save-btn' onClick={handlePasswordChange}>Update Password</button>
                    </div>
                )}

                <button className='modal-logout-btn' onClick={handleLogout}>
                    <LogOut size={15} />
                    Logout
                </button>
            </div>
        </div>
    )
}

export default ProfileModal;