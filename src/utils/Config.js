const baseUrl = "http://127.0.0.1:8082";
const login = `${baseUrl}/v1/login`;
const register = `${baseUrl}/v1/signup`;
const createMovie = `${baseUrl}/v1/create`;
const readMovie = `${baseUrl}/v1/read`;
const readMovieById = `${baseUrl}/v1/read-by-id`;
const updateMovie = `${baseUrl}/v1/update`;
const deleteMovie = `${baseUrl}/v1/delete`;

export {
    login,
    register,
    createMovie,
    readMovie,
    readMovieById,
    updateMovie,
    deleteMovie
}
