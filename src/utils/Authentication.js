import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";



export const SignUpWithGoogle = async () => {

    try {
        const provider = new GoogleAuthProvider();

    const result=await signInWithPopup(auth, provider)
     
       
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential){
            console.error("Error in user Credential")
            return
        }
        const token = credential.accessToken;
        const user = result.user;
        console.log(user,token)
       
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
        
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

    }
  };