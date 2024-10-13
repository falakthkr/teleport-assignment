"use client";

import React, { useContext } from "react";
import { useFormContext } from "../../../context/FormContext";
import { useRouter } from "next/navigation";

const SummaryPage = () => {
  const router = useRouter();
  const { formData } = useFormContext();
  const handleSubmit = () => {
    alert("Thank you!");
    router.push("/");
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Submission Successful!</h2>
      <p className="text-lg mb-4">
        Thank you for submitting your information. Below is a summary of what
        you've provided:
      </p>

      <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
      <p>
        <strong>First Name:</strong> {formData.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {formData.lastName}
      </p>
      <p>
        <strong>Email:</strong> {formData.email}
      </p>
      <p>
        <strong>Phone:</strong> {formData.phone}
      </p>

      <h3 className="text-xl font-semibold mt-5 mb-2">Account Details</h3>
      <p>
        <strong>Username:</strong> {formData.username}
      </p>
      <p>
        <strong>Password:</strong> {formData.password}
      </p>

      <h3 className="text-xl font-semibold mt-5 mb-2">Preferences</h3>
      <p>
        <strong>Communication Preference:</strong>{" "}
        {formData.communicationPreference}
      </p>
      <p>
        <strong>Preferred Contact Time:</strong> {formData.contactTime}
      </p>
      <p>
        <strong>Newsletter Subscription:</strong>{" "}
        {formData.newsletterSubscription ? "Yes" : "No"}
      </p>
      <p>
        <strong>Additional Comments:</strong> {formData.comments || "N/A"}
      </p>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default SummaryPage;
