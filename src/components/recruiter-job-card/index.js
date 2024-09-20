"use client";
import { useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import JobApplicants from "../job-applicants";

const RecruiterJobCard = ({ jobItem, jobApplications }) => {
  console.log(jobApplications, "job Application");
  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
  const [
    showCurrentCandidateDetailsModel,
    setShowCurrentCandidateDetailsModel,
  ] = useState(false);

  return (
    <div>
      <CommonCard
        icon={<JobIcon />}
        title={jobItem.title}
        description={jobItem.description}
        footerContent={
          <Button
            onClick={() => setShowApplicantsDrawer(true)}
            className="flex h-11 items-center justify-center px-5 disabled:opacity-65"
            disabled={
              jobApplications.filter((item) => item.jobID === jobItem?._id)
                .length === 0
            }
          >
            {
              jobApplications.filter((item) => item.jobID === jobItem?._id)
                .length
            }{" "}
            Applicants
          </Button>
        }
      />
      <JobApplicants
        showApplicantsDrawer={showApplicantsDrawer}
        setShowApplicantsDrawer={setShowApplicantsDrawer}
        showCurrentCandidateDetailsModel={showCurrentCandidateDetailsModel}
        setShowCurrentCandidateDetailsModel={
          setShowCurrentCandidateDetailsModel
        }
        currentCandidateDetails={currentCandidateDetails}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        jobItem={jobItem}
        jobApplications={jobApplications.filter(
          (jobApplicantItem) => jobApplicantItem.jobID == jobItem?._id
        )}
      />
    </div>
  );
};

export default RecruiterJobCard;
