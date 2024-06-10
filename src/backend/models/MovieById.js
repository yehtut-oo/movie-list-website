import axios from "axios";

export const getMovieById = async (movieIds) => {
    const data = [];

    try {
        movieIds.map( async (id) => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
            params: {
                language: "en-US",
            },
        })
        data.push(response.data);
        })
        
        
        return data;
    }
    catch (e) {
        throw e;
    }
}