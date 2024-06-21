
// import { useState, useEffect } from "react";
// import * as ApiClient from "../API/ApiClient";
// import { useForm } from "react-hook-form";
// import { useAppContext } from "../contexts/AppContext";
// import { useMutation } from "react-query";

// export type UserInfoForm = {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   gender: string;
//   date: string;
//   phone: string;
//   hometown: string;
//   role: string;
// };

// const InfoUser = () => {
//   const [userInfo, setUserInfo] = useState<UserInfoForm | null>(null);
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<UserInfoForm>();

//   const { showToast } = useAppContext();

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const info = await ApiClient.viewInfo();
//         setUserInfo(info);
//         setValue("firstName", info.firstName);
//         setValue("lastName", info.lastName);
//         setValue("gender", info.gender);
//         setValue("phone", info.phone);
//         setValue('date', info.date ? new Date(info.date).toISOString().split('T')[0] : '');
//         setValue("hometown", info.hometown);
//       } catch (error) {
//         showToast({ message: "Error fetching user info", type: "ERROR" });
//       }
//     };

//     fetchUserInfo();
//   }, [setValue, showToast]);

//   const mutation = useMutation(ApiClient.updateInfo, {
//     onSuccess: () => {
//       showToast({ message: "Updated Info successfully", type: "SUCCESS" });
//     },
//     onError: () => {
//       showToast({ message: "Error updating info", type: "ERROR" });
//       console.error(onmessage);
//     },
//   });

//   const onSubmit = (data: UserInfoForm) => {
//     mutation.mutate(data);
//   };

//   if (!userInfo) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <body className="h-screen flex justify-center items-center bg-cover bg-center">
//       <form
//         className="max-w-md w-full bg-white bg-opacity-85 rounded-lg shadow-md p-8 ml-28 "
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <h2 className="text-3xl font-bold mb-5">Update Your Info</h2>
//         <div className="flex flex-col md:flex-row gap-5">
//           <div className="relative z-0 w-full mb-5 group">
//             <input
//               className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//               {...register("firstName")}
//               defaultValue={userInfo.firstName}
//             />
//             <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
//               {errors.firstName && (
//                 <span className="text-red-500">
//                   {" "}
//                   {errors.firstName.message}
//                 </span>
//               )}
//               First Name
//             </label>
//           </div>
//           <div className="relative z-0 w-full mb-5 group">
//             <input
//               className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//               {...register("lastName")}
//               defaultValue={userInfo.lastName}
//             />
//             <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
//               {errors.lastName && (
//                 <span className="text-red-500"> {errors.lastName.message}</span>
//               )}
//               Last Name
//             </label>
//           </div>
//         </div>
//         <div className="relative z-0 w-full mb-5 group">
//           <input
//             type="text"
//             className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//             {...register("phone")}
//             defaultValue={userInfo.phone}
//           />
//           <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
//             {errors.phone && (
//               <span className="text-red-500"> {errors.phone.message}</span>
//             )}
//             Phone
//           </label>
//         </div>
//         <div className="relative z-0 w-full mb-5 group">
//           <select
//             className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//             {...register("gender")}
//             defaultValue={userInfo.gender}
//           >
//             <option value="male">Nam</option>
//             <option value="female">Nữ</option>
//             <option value="other">Khác</option>
//             <option value=""></option>
//           </select>
//           <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
//             {errors.gender && (
//               <span className="text-red-500"> {errors.gender.message}</span>
//             )}
//             Gender
//           </label>
//         </div>
//         <div className="relative z-0 w-full mb-5 group">
//           <input
//             type="date"
//             className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//             {...register('date')}
//             defaultValue={userInfo.date ? new Date(userInfo.date).toISOString().split('T')[0] : ''}
//           />
//           <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
//             {errors.date && (
//               <span className="text-red-500">{errors.date.message}</span>
//             )}
//             Date of Birth
//           </label>
//         </div>

//         <div className="relative z-0 w-full mb-5 group">
//           <input
//             type="text"
//             className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//             {...register("hometown")}
//             defaultValue={userInfo.hometown}
//           />
//           <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
//             {errors.hometown && (
//               <span className="text-red-500"> {errors.hometown.message}</span>
//             )}
//             Hometown
//           </label>
//         </div>

//         <span className="flex justify-center">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white rounded p-2 font-bold hover:bg-blue-500 text-xl my-5 "
//           >
//             Update Info
//           </button>
//         </span>
//       </form>
//     </body>
//   );
// };

// export default InfoUser;