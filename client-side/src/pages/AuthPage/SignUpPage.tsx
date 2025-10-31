import { SignUp } from "@clerk/clerk-react";

export const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp
        forceRedirectUrl="/auth-callback"
        signInUrl="/sign-in"
        signInForceRedirectUrl="/auth-callback"
      />
    </div>
  );
};
