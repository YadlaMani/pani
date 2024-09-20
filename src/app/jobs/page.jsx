import {
  fetchJobsForRecuriterAction,
  fetchProfileAction,
  fetchJobsForCandidateAction,
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecuriter,
} from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const JobPage = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  const profileInfo = await fetchProfileAction(user?.id);

  const jobList =
    profileInfo.role === "recruiter"
      ? await fetchJobsForRecuriterAction(user?.id)
      : await fetchJobsForCandidateAction();
  const applicationList =
    profileInfo.role === "recruiter"
      ? await fetchJobApplicationsForRecuriter(profileInfo?.userId)
      : await fetchJobApplicationsForCandidate(profileInfo?.userId);
  console.log(profileInfo?.userId);
  console.log(applicationList);
  return (
    <JobListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      jobList={jobList}
      jobApplications={applicationList}
    />
  );
};

export default JobPage;
