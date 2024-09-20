import { fetchProfileAction } from "@/actions";
import OnBoard from "@/components/on-board";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import React from "react";

const OnBoardPage = async () => {
  //get the auth user from the clerk
  const user = await currentUser();
  //fetch profile info
  const profileInfo = await fetchProfileAction(user?.id);

  if (profileInfo?._id) {
    if (profileInfo?.role === "recruiter" && !profileInfo.isPremimumUser)
      redirect("/membership");
    else redirect("/");
  } else return <OnBoard />;
};

export default OnBoardPage;
