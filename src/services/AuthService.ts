// @ts-ignore
import * as firebaseAuth from 'firebase/auth';
// @ts-ignore
import { auth } from '../services/FirebaseConfig';

export default class AuthService {
  login(email: string, password: string) {
    return firebaseAuth.signInWithEmailAndPassword(auth, email, password);
    //      .then((user: any) => {
    //       console.log(user);
    //        return user;
    //      })
    //      .catch((error: any) => {
    //       console.log('error', error);
    //        return Promise.reject(error);
    //      });
  }
}
