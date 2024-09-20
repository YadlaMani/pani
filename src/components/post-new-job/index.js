"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "../ui/dialog";
import CommonForm from "../common-form";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import { createJobAction } from "@/actions";

const PostNewJob = ({ profileInfo, user }) => {
  const [showJobDialog, setShowJobDialog] = useState(false);
  console.log(profileInfo);
  const [jobFormData, setJobFormData] = useState({
    ...initialPostNewJobFormData,
    companyName: profileInfo?.recruiterInfo?.companyName,
  });
  async function createNewJob() {
    await createJobAction(
      {
        ...jobFormData,
        recuriterId: user?.id,
        applicants: [],
      },
      "/job"
    );
    setJobFormData({
      ...initialPostNewJobFormData,
      companyName: profileInfo?.recruiterInfo?.companyName,
    });
    setShowJobDialog(false);
  }
  return (
    <div>
      <Button onClick={() => setShowJobDialog(true)}>Post A Job</Button>
      <Dialog
        open={showJobDialog}
        onOpenChange={() => {
          setShowJobDialog(false);
          setJobFormData({
            ...initialPostNewJobFormData,
            companyName: profileInfo?.recruiterInfo?.companyName,
          });
        }}
      >
        <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
            <div className="grid gap-4 py-4">
              <CommonForm
                buttonText={"Add"}
                formData={jobFormData}
                setFromData={setJobFormData}
                formControls={postNewJobFormControls}
                action={createNewJob}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostNewJob;
