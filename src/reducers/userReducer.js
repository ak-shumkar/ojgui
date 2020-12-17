const initialState = {
    isAuthenticated: localStorage.getItem('access_token') !== null,
    username: localStorage.getItem('username')
}

const userReducer = (state = initialState, action) => {
    switch (action.type){
        case 'SET_USER':
            return {
                isAuthenticated: true,
                username: action.username
            }
        case "LOGOUT":
            localStorage.clear();
            return {
                isAuthenticated: false,
                username: ''
            }
        default:
            return state;
    }

}


export default userReducer;