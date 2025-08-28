// import { useRouter } from "next/router"; // Next.js Pages Router
// import { useState } from "react";

// const SubscribePage = () => {
//   const router = useRouter();
//   const { plan } = router.query;
//   const [phone, setPhone] = useState("");

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#161848] to-[#1b204e]">
//       <div className="bg-[#110e2e] rounded-xl p-8 w-full max-w-md shadow-2xl text-center border border-[#382eb1]">
//         <div className="rounded-t-xl bg-gradient-to-r from-[#8760ff] to-[#48d2ff] py-4 mb-6 text-white text-xl font-bold">
//           Subscribe {plan || "Power"} (30D)
//         </div>
//         <p className="text-white text-lg font-medium mb-4">
//           Help us with a few details to start your entertainment journey.
//         </p>
//         <p className="text-gray-400 mb-6">
//           Your number will act as the primary method for login.
//         </p>
//         <input
//           type="text"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           placeholder="9999999999"
//           className="w-full px-4 py-2 rounded bg-transparent text-white border border-[#382eb1] mb-6 focus:outline-none focus:border-[#8760ff] placeholder:text-gray-400 text-lg"
//           maxLength={10}
//         />
//         <button className="w-full py-3 rounded bg-gradient-to-r from-[#8760ff] to-[#48d2ff] text-white font-semibold text-lg tracking-wide hover:opacity-90 transition">
//           CONTINUE
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SubscribePage;
