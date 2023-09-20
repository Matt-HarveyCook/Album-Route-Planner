import axios from 'axios'
const API_URL = '/api/users/'

// Attempts to update the database with a post request
// If successful it stores this data in the local storage allowing for authorisation
const register = async(userData)=>{
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Sends a post request to try and log the user in
const login = async(userData)=>{
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// If logged out then remove their authorisation key from local storage
const logout = () => {
    localStorage.removeItem('user')
}

// Used to export all the functions
const authService = {
    register,
    logout,
    login
}

export default authService