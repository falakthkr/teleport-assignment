"use client";

import { useForm } from "react-hook-form";
import ProgressBar from "@/components/ProgressBar";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/context/FormContext";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number is not valid")
    .required("Phone number is required"),
  dob: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth must be in the past"),
});

const PersonalInformationForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { updateForm } = useFormContext();

  const onSubmit = (data) => {
    router.push("/form/step-two");
    updateForm(data);
  };

  return (
    <div className="container mx-auto p-4">
      <ProgressBar step={1} />
      <h1 className="text-2xl font-semibold mb-4">Personal Information</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">First Name</label>
            <input
              type="text"
              {...register("firstName")}
              className={`border p-2 rounded w-full color-black ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Last Name</label>
            <input
              type="text"
              {...register("lastName")}
              className={`border p-2 rounded w-full ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className={`border p-2 rounded w-full ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phone")}
              className={`border p-2 rounded w-full ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("dob")}
              className={`border p-2 rounded w-full ${
                errors.dob ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.dob && (
              <p className="text-red-500 text-sm">{errors.dob.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            disabled={!isValid}
            type="submit"
            className={`${
              isValid ? "bg-blue-500" : "bg-gray-500"
            } text-white px-4 py-2 rounded`}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformationForm;
