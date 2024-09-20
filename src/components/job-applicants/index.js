"use client";
import React from "react";
import { Drawer, DrawerContent } from "../ui/drawer";
import CandidateList from "../candidate-list";
import { ScrollArea } from "../ui/scroll-area";
const JobApplicants = ({
  showApplicantsDrawer,
  setShowApplicantsDrawer,
  showCurrentCandidateDetailsModel,
  setShowCurrentCandidateDetailsModel,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  jobItem,
  jobApplications,
}) => {
  return (
    <Drawer open={showApplicantsDrawer} onOpenChange={setShowApplicantsDrawer}>
      <DrawerContent className="max-h-[50vh]">
        <ScrollArea className="h-auto overflow-y-auto">
          <CandidateList
            currentCandidateDetails={currentCandidateDetails}
            setCurrentCandidateDetails={setCurrentCandidateDetails}
            jobApplications={jobApplications}
            showCurrentCandidateDetailsModel={showCurrentCandidateDetailsModel}
            setShowCurrentCandidateDetailsModel={
              setShowCurrentCandidateDetailsModel
            }
          />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default JobApplicants;
