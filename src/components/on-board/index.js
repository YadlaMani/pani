"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import CommonForm from "../common-form";
import {
  initialCandidateFromData,
  recruiterOnboardFromControls,
  initialRecruiterFromData,
  candidateOnboardFormControls,
} from "@/utils";
import { createProfileAction } from "@/actions";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://bhjipglmvyhjxjvcjjtf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoamlwZ2xtdnloanhqdmNqanRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyNjc2MTYsImV4cCI6MjAzNzg0MzYxNn0._iJt2eY3mBaPEnNVbSw81QOH-Py0ahVU5SWWlUlAeOY";
const supabaseClient = createClient(supabaseUrl, supabaseKey);

function OnBoard() {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFromData
  );
  const [candidateFormData, setCandidateFromData] = useState(
    initialCandidateFromData
  );
  const [file, setFile] = useState(null);
  const [isRecruiterButtonDisabled, setIsRecruiterButtonDisabled] =
    useState(true);
  const [isCandidateButtonDisabled, setIsCandidateButtonDisabled] =
    useState(true);
  const currentAuthUser = useUser();
  const { user } = currentAuthUser;

  function handleFileChange(event) {
    event.preventDefault();
    setFile(event.target.files[0]);
  }

  async function handleUploadPdfToSupabase() {
    const { data, error } = await supabaseClient.storage
      .from("job-board-public")
      .upload(`/public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log(data, error);
    if (data) {
      setCandidateFromData({
        ...candidateFormData,
        resume: data.path,
      });
    }
  }

  useEffect(() => {
    if (file) handleUploadPdfToSupabase();
  }, [file]);

  function handleTabChange(value) {
    setCurrentTab(value);
  }

  async function createProfile() {
    const data =
      currentTab === "recruiter"
        ? {
            recruiterInfo: recruiterFormData,
            role: "recruiter",
            isPremimumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          }
        : {
            role: "candidate",
            isPremimumUser: false,
            userId: user?.id,
            candidateInfo: candidateFormData,
            email: user?.primaryEmailAddress?.emailAddress,
          };
    await createProfileAction(data, "/onboard");
  }

  useEffect(() => {
    function handleRecuriterFormValid() {
      return (
        recruiterFormData &&
        recruiterFormData.name.trim() !== "" &&
        recruiterFormData.companyName.trim() !== "" &&
        recruiterFormData.companyRole.trim() !== ""
      );
    }
    setIsRecruiterButtonDisabled(!handleRecuriterFormValid());
  }, [recruiterFormData]);

  useEffect(() => {
    function handleCandidateFormValid() {
      return (
        candidateFormData &&
        Object.values(candidateFormData).every((value) => value.trim() !== "")
      );
    }
    setIsCandidateButtonDisabled(!handleCandidateFormValid());
    console.log(candidateFormData);
  }, [candidateFormData]);

  return (
    <div className="bg-white">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="w-full">
          <div className="flex items-baseline justify-between border-b pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Welcome to Onboarding
            </h1>
            <TabsList>
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="candidate">
          <CommonForm
            formControls={candidateOnboardFormControls}
            buttonText={"Onboard as a candidate"}
            formData={candidateFormData}
            setFromData={setCandidateFromData}
            handleFileChange={handleFileChange}
            isButtonDisabled={isCandidateButtonDisabled}
            action={createProfile}
          />
        </TabsContent>
        <TabsContent value="recruiter">
          <CommonForm
            formControls={recruiterOnboardFromControls}
            buttonText={"Onboard as a recruiter"}
            formData={recruiterFormData}
            setFromData={setRecruiterFormData}
            isButtonDisabled={isRecruiterButtonDisabled}
            action={createProfile}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default OnBoard;
