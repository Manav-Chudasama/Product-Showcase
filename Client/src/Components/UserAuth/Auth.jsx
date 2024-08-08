import React, { useEffect, useState } from "react";
import { ClerkLoaded, SignIn, SignUp } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";

import Illustration1 from "../../assets/illustration1.png";
import { Fade } from "react-awesome-reveal";
export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(location.pathname === "/sign-up");

  useEffect(() => {
    setIsSignUp(location.pathname === "/sign-up");
  }, [location.pathname]);

  return (
    <ClerkLoaded>
      <Fade>
        <div className="w-full h-dvh flex bg-gray-100">
          <div className="hidden w-[40%] lg:w-[50%] p-2 bg-white md:flex flex-col items-center justify-center gap-5">
            <h1 className="sm:text-2xl md:text-4xl lg:text-5xl font-bold">
              {"Lets's"} Get Started with Product Showcase
            </h1>
            <img src={Illustration1} alt="" />
          </div>
          <div className="w-full md:w-[60%] lg:w-[50%] flex items-center justify-center">
            {isSignUp ? (
              <SignUp afterSignUpUrl="/" signInUrl="/sign-in" />
            ) : (
              <SignIn afterSignInUrl="/" signUpUrl="/sign-up" />
            )}
          </div>
        </div>
      </Fade>
    </ClerkLoaded>
  );
}
