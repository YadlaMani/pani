import { fetchProfileAction } from "@/actions";
import NavBar from "@/components/Navbar";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const CommonLayout = async ({ children }) => {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
      {/* Header */}
      <NavBar
        profileInfo={profileInfo}
        user={JSON.parse(JSON.stringify(user))}
      />
      {/* Header  Component */}

      {/* Main Content */}
      <main> {children}</main>
    </div>
  );
};

export default CommonLayout;
