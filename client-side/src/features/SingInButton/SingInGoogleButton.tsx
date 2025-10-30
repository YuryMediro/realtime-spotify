import { Button } from "@/components/kit/button";
import { useSignIn } from "@clerk/clerk-react";
import { FcGoogle } from "react-icons/fc";

export const SingInGoogleButton = () => {
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();

  const handleGoogleSignIn = () => {
    if (!isSignInLoaded) return;

    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };
  return (
    <Button
      onClick={handleGoogleSignIn}
      variant={"some"}
      className="w-full h-11"
    >
      <FcGoogle className="mr-2 size-5" />
      Continue with Google
    </Button>
  );
};
