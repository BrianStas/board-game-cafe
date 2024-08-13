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
        console.log("signup returns user and token: ", user," ", token);
        console.log("uid is: ", user.uid)
        localStorage.setItem("uid", user.uid);
       
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
        
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(errorMessage);

    }
  };