// // src/redux/actions/authActions.js
// import { auth } from '../../../../firebaseConfig';
// import Cookies from 'js-cookie';


// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

// const loginSuccess = (user) => ({
//     type: LOGIN_SUCCESS,
//     payload: user,
// });

// const logoutSuccess = () => ({
//     type: LOGOUT_SUCCESS,
// });

// export const login = (email, password) => async (dispatch) => {
//     try {
//         const userCredential = await auth.signInWithEmailAndPassword(email, password);
//         const user = userCredential.user;
//         const token = await user.getIdToken();
//         Cookies.set('token', token, { expires: 7 }); // Store JWT in cookie for 7 days
//         dispatch(loginSuccess(user));
//     } catch (error) {
//         console.error("Login error", error);
//     }
// };

// export const logout = () => async (dispatch) => {
//     try {
//         await auth.signOut();
//         Cookies.remove('token');
//         dispatch(logoutSuccess());
//     } catch (error) {
//         console.error("Logout error", error);
//     }
// };

// // import { auth } from '../../../../firebaseConfig';
// // import { signInWithEmailAndPassword } from 'firebase/auth';
// // import Cookies from 'js-cookie';

// // export const login = (email, password) => async (dispatch) => {
// //   try {
// //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
// //     const token = await userCredential.user.getIdToken();
    
// //     Cookies.set('token', token, { expires: 1 });

// //     dispatch({
// //       type: 'LOGIN_SUCCESS',
// //       payload: { token },
// //     });
// //   } catch (error) {
// //     dispatch({
// //       type: 'LOGIN_FAILURE',
// //       payload: error.message,
// //     });
// //   }
// // };

// // export const logout = () => (dispatch) => {
// //   Cookies.remove('token');
// //   dispatch({ type: 'LOGOUT' });
// // };
