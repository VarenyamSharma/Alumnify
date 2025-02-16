import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Clerk User ID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  batch: { type: String }, // Year of passing
  course: { type: String }, // Field of study
  industryPreference: { type: String }, // Optional preference
  rolePreference: { type: String } // Optional preference
});

export default mongoose.models.Student || mongoose.model("Student", StudentSchema);
