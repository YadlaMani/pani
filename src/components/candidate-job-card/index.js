import React, { Fragment, useState } from "react";
import CommonCard from "../common-card";
import { Button } from "../ui/button";
import JobIcon from "../job-icon";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { createJobApplicationAction } from "@/actions";

const CandidateJobCard = ({ jobItem, profileInfo, jobApplications }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  async function handleJobApply() {
    await createJobApplicationAction(
      {
        recuriterUserID: jobItem?.recuriterId,
        name: profileInfo?.candidateInfo?.name,
        email: profileInfo?.email,
        candidateUserID: profileInfo?.userId,
        status: ["Applied"],
        jobID: jobItem?._id,
        jobAppliedDate: new Date().toLocaleDateString(),
      },
      "/jobs"
    );
    setOpenDrawer(false);
  }

  const isApplied = jobApplications.some((item) => item.jobID === jobItem?._id);

  return (
    <div>
      <CommonCard
        icon={<JobIcon />}
        title={jobItem?.title}
        description={jobItem?.description}
        footerContent={
          <Button
            className="flex h-11 items-center justify-center px-5 disabled:opacity-65"
            onClick={() => setOpenDrawer(true)}
          >
            View Details
          </Button>
        }
      />

      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent className="p-6">
          <DrawerHeader className="px-0">
            <div className="flex justify-between">
              <DrawerTitle className="text-4xl font-extrabold text-gray-800">
                {jobItem?.title}
              </DrawerTitle>
              <div className="flex gap-3">
                <Button
                  className="flex h-11 items-center justify-center px-5 disabled:opacity-65"
                  onClick={handleJobApply}
                  disabled={isApplied}
                >
                  {isApplied ? "Applied" : "Apply Now"}
                </Button>
                <Button
                  onClick={() => setOpenDrawer(false)}
                  className="flex h-11 items-center justify-center px-5"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DrawerHeader>
          <DrawerDescription className="text-2xl font-medium text-gray-600">
            {jobItem?.description}
            <span>{jobItem?.location}</span>
          </DrawerDescription>
          <div className="w-[150px] flex justify-center items-center h-[40px] bg-black rounded-[4px]">
            <h2 className="text-xl font-bold text-white">{jobItem?.type}</h2>
          </div>
          <h3 className="text-2xl font-medium text-black mt-3">
            Experience: {jobItem?.experience} years
          </h3>
          <div className="flex gap-4 mt-6">
            {jobItem?.skills.split(",").map((skillItem, index) => (
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
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CandidateJobCard;
