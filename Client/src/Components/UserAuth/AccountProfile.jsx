import { ClerkLoaded, UserProfile } from "@clerk/clerk-react";
import React from "react";
import { Fade } from "react-awesome-reveal";

export default function AccountProfile() {
  return (
    <ClerkLoaded>
      <Fade delay={200} className="flex justify-center my-5">
        <UserProfile />
      </Fade>
    </ClerkLoaded>
  );
}
