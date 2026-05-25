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
    const res = await axios.get(`${BASE_URL}/books/fav/favorites`, authHeaders());
    return res.data.length;
};

export const getReadingHistoryCount = async () => {
    const res = await axios.get(`${BASE_URL}/user/get_my_history`, authHeaders());
    return res.data.length;
};

export const getMyFines = async () => {
    const token = getToken();
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const userId = decoded.id;
    const res = await axios.get(`${BASE_URL}/books/fines`, {
        params: { userID: userId },
        ...authHeaders()
    });
    return res.data;
};

export const updateName = async (name) => {
    const res = await axios.put(`${BASE_URL}/user/update`, { name }, authHeaders());
    return res.data;
};

export const changePassword = async (oldPassword, newPassword) => {
    const res = await axios.put(`${BASE_URL}/user/password`, { oldPassword, newPassword }, authHeaders());
    return res.data;
};

export const updateProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    const res = await axios.put(`${BASE_URL}/user/update`, formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return res.data;
};