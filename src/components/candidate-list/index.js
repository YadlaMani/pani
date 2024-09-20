"use client";
import React from "react";
import { Button } from "../ui/button";
import { createClient } from "@supabase/supabase-js";
import { Fragment } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { getCandidateDetailsByIDAction } from "@/actions";
const supabaseUrl = "https://bhjipglmvyhjxjvcjjtf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoamlwZ2xtdnloanhqdmNqanRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyNjc2MTYsImV4cCI6MjAzNzg0MzYxNn0._iJt2eY3mBaPEnNVbSw81QOH-Py0ahVU5SWWlUlAeOY";
const supabaseClient = createClient(supabaseUrl, supabaseKey);

const CandidateList = ({
  currentCandidateDetails,
  setCurrentCandidateDetails,
  jobApplications,
  showCurrentCandidateDetailsModel,
  setShowCurrentCandidateDetailsModel,
}) => {
  async function handleFetchCandidateDetails(currCandidateID) {
    const data = await getCandidateDetailsByIDAction(currCandidateID);
    if (data) {
      setCurrentCandidateDetails(data);
      setShowCurrentCandidateDetailsModel(true);
    }
  }
  function handlePreviewResume() {
    const { data } = supabaseClient.storage
      .from("job-board-public")
      .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);
    console.log(data, "Resume");
    const a = document.createElement("a");
    a.href = data?.publicUrl;
    a.setAttribute("download", "Resume.pdf");
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
        {jobApplications && jobApplications.length > 0
          ? jobApplications.map((jobApplicantItem) => (
              <div
                key={jobApplicantItem?.candidateUserID}
                className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4"
              >
                <div className="px-4 my-6 flex justify-between items-center">
                  <h3 className="text-lg font-bold">
                    {jobApplicantItem?.name}
                  </h3>
                  <Button
                    onClick={() =>
                      handleFetchCandidateDetails(
                        jobApplicantItem?.candidateUserID
                      )
                    }
                    className="flex h-11 items-center justify-center px-5"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))
          : null}
      </div>
      <Dialog
        open={showCurrentCandidateDetailsModel}
        onOpenChange={setShowCurrentCandidateDetailsModel}
      >
        <DialogContent className="max-w-md">
          {currentCandidateDetails ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                {currentCandidateDetails?.candidateInfo?.name}
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-sm font-semibold">Email:</p>
                <p className="text-sm">{currentCandidateDetails?.email}</p>
                <p className="text-sm font-semibold">Current Company:</p>
                <p className="text-sm">
                  {currentCandidateDetails?.candidateInfo?.currentCompany}
                </p>
                <p className="text-sm font-semibold">Current Location:</p>
                <p className="text-sm">
                  {currentCandidateDetails?.candidateInfo?.currentJobLocation}
                </p>
                <p className="text-sm font-semibold">Experience:</p>
                <p className="text-sm">
                  {currentCandidateDetails?.candidateInfo?.yearsOfExperience}{" "}
                  years
                </p>

                <div className="flex gap-4 mt-6">
                  <h1>Previous Companies</h1>
                  {currentCandidateDetails?.candidateInfo?.previousComapanies
                    .split(",")
                    .map((skillItem, index) => (
                      <div
                        key={index}
                        className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]"
                      >
                        <h2 className="text-[14px] font-medium text-white">
                          {skillItem}
                        </h2>
                      </div>
                    ))}
                </div>
                <div className="flex gap-4 mt-6">
                  <h1>Skills</h1>
                  {currentCandidateDetails?.candidateInfo.skills
                    .split(",")
                    .map((skillItem, index) => (
                      <div
                        key={index}
                        className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]"
                      >
                        <h2 className="text-[14px] font-medium text-white">
                          {skillItem}
                        </h2>
                      </div>
                    ))}
                </div>
                <p className="text-sm">
                  {Array.isArray(currentCandidateDetails?.candidateInfo?.skills)
                    ? currentCandidateDetails.candidateInfo.skills.join(", ")
                    : currentCandidateDetails?.candidateInfo?.skills || "N/A"}
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={handlePreviewResume}>Resume</Button>
                <Button>Select</Button>
                <Button>Reject</Button>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default CandidateList;
