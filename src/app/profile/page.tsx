"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { SignOutButton } from "@clerk/nextjs";

const ProfilePage = () => {
  return (
    <div>
      ProfilePage
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
    </div>
  );
};

export default ProfilePage;
