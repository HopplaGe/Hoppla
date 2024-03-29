import React from "react";
import AuthBtn from "@/components/shared/AuthBtn";
import UserDropdownMenu from "@/components/shared/UserDropdownMenu";

type AuthBlockProps = {
  isLoggedIn: boolean;
  user: any;
  t: any;
};

const AuthBlock = ({ isLoggedIn, user, t }: AuthBlockProps) => {
  return (
    <>
      {isLoggedIn ? <UserDropdownMenu user={user} t={t} /> : <AuthBtn t={t} />}
    </>
  );
};

export default AuthBlock;
