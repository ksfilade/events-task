import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const signUp = async (email:string, password: string, displayName:string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    signOut(auth)
    if(userCredential && auth.currentUser){
    updateProfile(auth.currentUser,{
      displayName: displayName
    })
    }
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logIn = async (email:string, password:string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};