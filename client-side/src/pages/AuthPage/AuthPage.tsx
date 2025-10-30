import { SignIn, SignUp } from "@clerk/clerk-react";
import { useState } from "react";

export const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="flex mb-6 bg-zinc-900 rounded-lg p-1 w-full">
          <button
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              isSignIn
                ? "bg-emerald-500 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              !isSignIn
                ? "bg-emerald-500 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>

        {isSignIn ? (
          <SignIn fallbackRedirectUrl="/auth-callback" signUpUrl="/auth" />
        ) : (
          <SignUp fallbackRedirectUrl="/auth-callback" signInUrl="/auth" />
        )}
      </div>
    </div>
  );
};
