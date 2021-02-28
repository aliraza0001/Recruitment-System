import App from "./firebase";
class Auth {

  signin = (email, password) => 
     App.auth().signInWithEmailAndPassword(email, password);

  register = (email, password) =>
     App.auth().createUserWithEmailAndPassword(email, password);

  createUser = (uid, data) =>
    App.firestore().collection("Users").doc(uid).set(data);

  createEmployee = (uid, data) =>
    App.firestore().collection("companies").doc(uid).set(data);

  createJobPost = (uid, data) =>
    App.firestore().collection("jobPosts").doc(uid).set(data);
}

export default new Auth();
