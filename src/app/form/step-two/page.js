"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useFormContext } from "../../../context/FormContext";
import ProgressBar from "../../../components/ProgressBar";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const AccountDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { updateForm } = useFormContext();
  const router = useRouter();

  const onSubmit = (data) => {
    updateForm(data);
    router.push("/form/step-three");
  };

  return (
    <div className="container mx-auto p-6">
      <ProgressBar step={2} />
      <h1 className="text-3xl font-bold mb-6">Account Details</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className={`border rounded p-2 w-full  color-black ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium mb-1">Username</label>
          <input
            type="text"
            {...register("username")}
            className={`border rounded p-2 w-full  color-black ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Choose a username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            className={`border rounded p-2 w-full  color-black ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Create a password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            disabled={!isValid}
            type="submit"
            className={`mt-4 ${
              isValid ? "bg-blue-500" : "bg-gray-500"
            } text-white font-semibold py-2 px-6 rounded-md shadow transition duration-300`}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
