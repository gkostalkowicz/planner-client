class AuthService {

    logIn(username) {
        localStorage.setItem('username', username);
    }

    logOut() {
        localStorage.removeItem('username');
    }

    isLoggedIn() {
        return localStorage.getItem('username') !== null;
    }

    getUsername() {
        return localStorage.getItem('username');
    }
}

export default new AuthService();