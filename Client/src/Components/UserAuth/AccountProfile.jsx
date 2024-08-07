import { ClerkLoaded, UserProfile } from "@clerk/clerk-react";
import React from "react";

export default function AccountProfile() {
  return (
    <ClerkLoaded>
      <div className="flex justify-center my-5">
        <UserProfile />
      </div>
    </ClerkLoaded>
  );
}
