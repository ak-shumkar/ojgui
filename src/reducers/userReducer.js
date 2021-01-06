
const userState = {
    isAuthenticated: localStorage.getItem('access_token') !== null,
    username: localStorage.getItem('username'),
    user: JSON.parse(localStorage.getItem('user'))
}

const userReducer = (state = userState, action) => {
    switch (action.type){
        case 'SET_USER':
            return {
                ...state,
                isAuthenticated: true,
                username: action.username,
                user: action.user
            }
        case "LOGOUT":
            console.log('Clearing local storage')
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
