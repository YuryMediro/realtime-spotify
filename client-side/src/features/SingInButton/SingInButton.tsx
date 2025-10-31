import { Button } from "@/components/kit/button";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SingInButton = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 w-full">
      <Button
        onClick={() => navigate("/sign-in")}
        variant={"outline"}
        className="w-full h-11"
      >
        <LogIn/>
        Sign in
      </Button>
    </div>
  );
};
