import axios from 'axios';

const api = axios.create({
    baseURL: 'https://apirestramoncara.up.railway.app/users'
});

export const getUsers = async () => {
    const response = await api.get(`/`);
    return response.data;
}

export const createUser = async (user) => {
    const response = await api.post(`/`, user);
    return response.data;
}

export const updateUser = async (user) => {    
    const response = await api.patch(`/${user.id}`, {...user, active: user.active === 'Yes' ? 1 : 0});
    return response.data;
}

export const deleteUsers = async (ids) => {
    console.log({ids});
    console.log(ids);
    const response = await api.delete(`/`, {data: {ids}});
    return response.data;
}