"use client";
import { Button } from "@/components/ui/button";
import {
  auth,
  currentUser,
  RedirectToSignIn,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
export default function Home() {
  const { isLoaded, userId, sessionId, getToken, signOut } = useAuth();
  //console.log( signOut())
  return (
    <div className="">
      <UserButton />
    </div>
  );
}
