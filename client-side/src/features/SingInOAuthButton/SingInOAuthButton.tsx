import { SignIn, SignUp, useSignIn, useSignUp } from "@clerk/clerk-react";
import { Button } from "@/components/kit/button";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export const SingInOAuthButton = () => {
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    if (!isSignInLoaded) return;

    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  const handleEmailSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Button
        onClick={handleGoogleSignIn}
        variant={"secondary"}
        className="w-full h-11"
      >
        <FcGoogle className="mr-2 size-5" />
        Continue with Google
      </Button>

      <Button
        onClick={handleEmailSignUp}
        variant={"outline"}
        className="w-full h-11"
      >
        Sign up with Email
      </Button>
    </div>
  );
};
