import decode from "jwt-decode";

// creating a new JavaScript class called AuthService that we instantiate a
// new version of for every component that imports it. This isn't always necessary,
// but it does ensure we are using a new version of the functionality and takes some
// of the risk out of leaving remnant data hanging around.
class AuthService {
  // retrieve data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // check if{ the user is still logged in
  loggedIn() {
    // check if there is a saved token and its still valid
    const token = this.getToken(); // getting token from localstorage
    // use type coersion to check if token is NOT undefined and the token is NOT expired
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }
  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        // umber of seconds since January 1, 1970
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }
  // set token to localStorage and reload page to homepage
  login(idToken) {
    // saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }
  // clear token from localStorage and force logout with reload
  logout() {
    // clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // this will reload the page and reset the state of the application
    window.location.assign("/");
  }
}

export default new AuthService();
