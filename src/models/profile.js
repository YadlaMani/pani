import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  userId: String,
  role: String,
  email: String,
  isPremimumUser: Boolean,
  memberShipType: String,
  memberShipStartData: String,
  memberShipEndData: String,
  recruiterInfo: {
    name: String,
    companyName: String,
    companyRole: String,
  },
  candidateInfo: {
    name: String,
    currentCompany: String,
    currentJobLocation: String,
    prefferedJobLocation: String,
    currentSalary: Number,
    noticePeriod: Number,
    skills: String,
    previousComapanies: String,
    totalExperience: Number,
    college: String,
    collegeLocation: String,
    graduatedYear: Number,
    linkedinProfile: String,
    githubProfile: String,
    resume: String,
  },
});
const Profile =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
export default Profile;
