import { SignIn } from "@clerk/clerk-react";

export const SignInPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn
        forceRedirectUrl="/auth-callback"
        signUpUrl="/sign-up"
        signUpForceRedirectUrl="/auth-callback"
      />
    </div>
  );
};
