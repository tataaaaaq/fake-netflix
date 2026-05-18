import axios from 'axios';

const API_KEY = "a774835ede9b3da98f8db391eab3b4dc";

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});



export async function getMovies(search = "") {

  try{

    const endpoint = search.trim() === "" ? "/movie/popular" : "/search/movie";

    const response = await api.get(endpoint,{
      params:{
        api_key : API_KEY,
        language: 'pt-BR',
        query: search
      }
    });
    return response.data.results;

  } catch (error) {
    console.log("Erro:", error.message);

    return []; //caso dê pau não fica um erro horroroso
  }
}