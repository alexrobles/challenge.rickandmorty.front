import axios from 'axios'

const apiUrl = process.env.REACT_APPI_RICKANDMORTY ?? 'http://localhost:3000/api/rickandmorty';

export const getFavoritesCharactersIds = async () => {  
    return await axios.get(apiUrl + "/getFavoritesCharactersIds");
}

export const postCreateCharacters = async (payload : any) => {  
    return await axios.post(apiUrl + "/createCharacters",payload);
}

export const getCharacters = async (data: any) => {  
    const { page, gender, species } = data;
    return await axios.get(apiUrl + `/getCharacters?page=${page}&gender=${gender}&species=${species}`);
}


