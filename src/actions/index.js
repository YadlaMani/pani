"use server";

import connectToDB from "@/database";
import { revalidatePath } from "next/cache";
import Profile from "@/models/profile";
import Job from "@/models/job";
import Application from "@/models/application";
import { NextResponse } from "next/server";

//create profile action
export async function createProfileAction(formData, pathToRevalidate) {
  await connectToDB();
  await Profile.create(formData);
  revalidatePath(pathToRevalidate);
}
export async function fetchProfileAction(id) {
  await connectToDB();
  const profile = await Profile.findOne({ userId: id });
  return JSON.parse(JSON.stringify(profile));
}
//job section
//create job
export async function createJobAction(formData, pathToRevalidate) {
  await connectToDB();
  await Job.create(formData);
  revalidatePath(pathToRevalidate);
}
//fetch job
//for recrutier
export async function fetchJobsForRecuriterAction(id) {
  await connectToDB();
  const res = await Job.find({ recuriterId: id });
  return JSON.parse(JSON.stringify(res));
}
//for candidate
export async function fetchJobsForCandidateAction() {
  await connectToDB();
  const res = await Job.find({});
  return JSON.parse(JSON.stringify(res));
}
//create job application
export async function createJobApplicationAction(data, pathToRevalidate) {
  await connectToDB();
  await Application.create(data);
  revalidatePath(pathToRevalidate);
}

//fetch job application-candidate
export async function fetchJobApplicationsForCandidate(candidateID) {
  await connectToDB();

  const res = await Application.find({
    candidateUserID: candidateID,
  });
  return JSON.parse(JSON.stringify(res));
}
//fetch job application-recuriter
export async function fetchJobApplicationsForRecuriter(recuriterID) {
  await connectToDB();
  const res = await Application.find({ recuriterUserID: recuriterID });
  return JSON.parse(JSON.stringify(res));
}
//update job application

//get candidate Details by candidateId
export async function getCandidateDetailsByIDAction(currCandidateID) {
  await connectToDB();

  const res = await Profile.findOne({ userId: currCandidateID });
  const data = JSON.parse(JSON.stringify(res));

  return data;
}
