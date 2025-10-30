import { Button } from "@/components/kit/button";
import { Separator } from "@/components/kit/separator";
import { SingInGoogleButton } from "@/features/SingInButton/SingInGoogleButton";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { useState } from "react";

export const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <div className="w-full max-w-[402px] flex flex-col items-center gap-5">
        <SingInGoogleButton />
        <div className="flex items-center w-full gap-3">
          <Separator className="flex-1 bg-zinc-700" />
          <span className="text-zinc-400 text-sm whitespace-nowrap">or</span>
          <Separator className="flex-1 bg-zinc-700" />
        </div>
        {isSignIn ? (
          <SignIn fallbackRedirectUrl="/auth-callback" signUpUrl="/auth" />
        ) : (
          <SignUp fallbackRedirectUrl="/auth-callback" signInUrl="/auth" />
        )}
        <div className="flex  bg-zinc-800 rounded-lg p-1 w-full">
          <Button
            variant={"some"}
            className={` py-2 px-4  transition-colors ${
              isSignIn ? "bg-emerald-500 text-white" : ""
            }`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </Button>
          <Button
            variant={"some"}
            className={`py-2 px-4    ${
              !isSignIn ? "bg-emerald-500 text-white" : ""
            }`}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};