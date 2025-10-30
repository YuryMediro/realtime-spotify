import { SignIn, SignUp } from "@clerk/clerk-react";

export const SignInPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <SignUp fallbackRedirectUrl="/auth-callback" />
    </div>
  );
};
