import { Separator } from "@/components/kit/separator";
import { SingInGoogleButton } from "@/features/SingInButton/SingInGoogleButton";
import { SignUp } from "@clerk/clerk-react";

export const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <div className="w-full max-w-[402px] flex flex-col items-center gap-5">
        <SingInGoogleButton />
        <div className="flex items-center w-full gap-3">
          <Separator className="flex-1 bg-zinc-700" />
          <span className="text-zinc-400 text-sm whitespace-nowrap">or</span>
          <Separator className="flex-1 bg-zinc-700" />
        </div>
        <SignUp fallbackRedirectUrl="/auth-callback" signInUrl="/sign-in" />
      </div>
    </div>
  );
};
