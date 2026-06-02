import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const getToken = () => localStorage.getItem('token');

const authHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getMe = async () => {
    const res = await axios.get(`${BASE_URL}/user/get_user`, authHeaders());
    return res.data;
};

export const getFavoritesCount = async () => {
    const res = await axios.get(`${BASE_URL}/books/fav/getFav`, authHeaders());
    return res.data.length;
};

export const getReadingHistoryCount = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/user/get_my_history`, authHeaders());
        return res.data.length;
    } catch (err) {
        if (err.response?.status === 404) return 0; 
        throw err;
    }
};

export const getMyFines = async () => {
    const res = await axios.get(`${BASE_URL}/user/fines`, authHeaders());
    return res.data;
};

export const updateName = async (name) => {
    const res = await axios.put(`${BASE_URL}/user/change-name`, { newName: name }, authHeaders());
    return res.data;
};

export const changePassword = async (oldPassword, newPassword) => {
    const res = await axios.put(`${BASE_URL}/user/change-password`, { oldPassword, newPassword }, authHeaders());
    return res.data;
};

export const updateProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'pfp_upload'); 

    const cloudRes = await axios.post(
        'https://api.cloudinary.com/v1_1/dqtzw2l1y/image/upload',
        formData
    );

    const imageUrl = cloudRes.data.secure_url;

    const res = await axios.put(
        `${BASE_URL}/user/pfp`,
        { profilePicture: imageUrl },
        authHeaders()
    );
    return res.data;
};

export const getPfp = async () => {
    const res = await axios.get(`${BASE_URL}/user/get_user`, authHeaders());
    console.log('user data:', res.data) // check the exact field name
    return res.data.ProfilePicture || res.data.profilePicture || null;
};