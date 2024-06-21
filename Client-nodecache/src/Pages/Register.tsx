import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import * as ApiClient from "../API/ApiClient";
import { useAppContext } from "../contexts/AppContext"; 

export type RegisterForm = {
    id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};
const Register = () => {
  const QueryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();
  const mutation = useMutation(ApiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      await QueryClient.invalidateQueries("validateToken");
      navigate("/");
    },
  });
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <body
      className="h-screen flex justify-start items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/image/Booking Hotel.png')" }}
    >
      <form
        className="max-w-md w-full bg-white bg-opacity-85 rounded-lg shadow-md p-8 ml-28 "
        onSubmit={onSubmit}
      >
        <h2 className="text-3xl font-bold mb-5">Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="relative z-0 w-full mb-5 group">
            <input
              className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              {...register("firstName", { required: "This field is required" })}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              {errors.firstName && (
                <span className="text-red-500">
                  {" "}
                  {errors.firstName.message}
                </span>
              )}
              First Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              {...register("lastName", { required: "This field is required" })}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              {errors.lastName && (
                <span className="text-red-500"> {errors.lastName.message}</span>
              )}
              Last Name
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            {...register("email", { required: "This field is required" })}
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            {errors.email && (
              <span className="text-red-500"> {errors.email.message}</span>
            )}
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            {...register("confirmPassword", {
              validate: (val) => {
                if (!val) {
                  return "This field is required";
                } else if (watch("password") !== val) {
                  return "Your password do no match";
                }
              },
            })}
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {errors.confirmPassword && (
              <span className="text-red-500">
                {" "}
                {errors.confirmPassword.message}
              </span>
            )}
            Password
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {errors.password && (
              <span className="text-red-500"> {errors.password.message}</span>
            )}
            Confirm Password
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <select
            className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
            {...register("role", { required: "This field is required" })}
          >
            <option value="">Select role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            {errors.role && (
              <span className="text-red-500"> {errors.role.message}</span>
            )}
            Role
          </label>
        </div>
        <span className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white rounded p-2 font-bold hover:bg-blue-500 text-xl my-5 "
          >
            Create Account
          </button>
        </span>
      </form>
    </body>
  );
};

export default Register;