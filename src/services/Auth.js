import App from "./firebase";
class Auth {
  signUp = (email, password) =>
    App.auth().createUserWithEmailAndPassword(email, password);
  createUser = (uid, data) =>
    App.firestore().collection("Users").doc(uid).set(data);
}

export default new Auth();
