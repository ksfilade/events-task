
import { admin } from "./firebaseAdmin";
export const verifyToken = async (token: string) => {
    try {
        let response = await admin.auth().verifyIdToken(token ?? '')
        return true
    } catch (error) {
      return false
    }
  };