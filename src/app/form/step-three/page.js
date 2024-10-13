"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useFormContext } from "../../../context/FormContext";
import ProgressBar from "@/components/ProgressBar";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  communicationPreference: Yup.string().required(
    "Please select a communication preference."
  ),
  contactTime: Yup.string().required(
    "Please select your preferred contact time."
  ),
  newsletterSubscription: Yup.boolean(),
  comments: Yup.string().optional(),
});

const PreferencesForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const { updateForm } = useFormContext();
  const router = useRouter();

  const communicationPreference = watch("communicationPreference");
  const formData = useFormContext();

  const onSubmit = async (data) => {
    updateForm(data);
    router.push("/form/completed");
    // API Integration -
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    alert(result.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ProgressBar step={3} />
      <h2 className="text-2xl font-semibold mb-4">User Preferences</h2>
      <div>
        <label className="block text-lg mb-2">Communication Preference</label>
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              {...register("communicationPreference")}
              value="email"
              className="form-radio h-5 w-5 text-blue-600 border-gray-300"
            />
            <span className="ml-2">Email</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              {...register("communicationPreference")}
              value="sms"
              className="form-radio h-5 w-5 text-blue-600 border-gray-300"
            />
            <span className="ml-2">SMS</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              {...register("communicationPreference")}
              value="push"
              className="form-radio h-5 w-5 text-blue-600 border-gray-300"
            />
            <span className="ml-2">Push Notifications</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              {...register("communicationPreference")}
              value="other"
              className="form-radio h-5 w-5 text-blue-600 border-gray-300"
            />
            <span className="ml-2">Other</span>
          </label>
        </div>
        {errors.communicationPreference && (
          <p className="text-red-500">
            {errors.communicationPreference.message}
          </p>
        )}
        {communicationPreference === "other" && (
          <div>
            <label className="block text-md mb-2 mt-2">Please specify:</label>
            <input
              type="text"
              {...register("otherPreference", {
                required: "Please specify your preference.",
              })}
              className={`border p-2 rounded w-full ${
                errors.otherPreference ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.otherPreference && (
              <p className="text-red-500">{errors.otherPreference.message}</p>
            )}
          </div>
        )}
      </div>
      <div>
        <label className="block text-lg mb-2">Preferred Contact Time</label>
        <select
          {...register("contactTime")}
          className="border p-2 rounded w-full"
        >
          <option value="">Select a time</option>
          <option value="morning">Morning (8 AM - 12 PM)</option>
          <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
          <option value="evening">Evening (4 PM - 8 PM)</option>
        </select>
        {errors.contactTime && (
          <p className="text-red-500">{errors.contactTime.message}</p>
        )}
      </div>
      <div>
        <label className="block text-lg mb-2">Newsletter Subscription</label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            {...register("newsletterSubscription")}
            className="form-checkbox h-5 w-5 text-blue-600 border-gray-300"
          />
          <span className="ml-2">Subscribe to our newsletter</span>
        </label>
      </div>
      <div>
        <label htmlFor="comments" className="block text-lg mb-2">
          Additional Comments
        </label>
        <textarea
          {...register("comments")}
          id="comments"
          rows="4"
          className="border p-2 rounded w-full"
          placeholder="Any additional preferences or comments..."
        />
      </div>
      <div className="flex justify-end">
        <button
          disabled={!isValid}
          type="submit"
          className={`mt-4 ${
            isValid ? "bg-blue-500" : "bg-gray-500"
          } text-white p-2 rounded hover:bg-blue-600 transition duration-200`}
        >
          Submit Preferences
        </button>
      </div>
    </form>
  );
};

export default PreferencesForm;
