// import React, { useContext, useEffect, useState } from "react";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import OrderContext from "@/context/OrderProvider";

// const DeliveryDetails = () => {
//   const [profileDetails, setProfileDetails] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     confirmAddress: "",
//   });

//   const { setProfile } = useContext(OrderContext);

//   useEffect(() => {
//     const { firstName, lastName, email, phoneNumber, confirmAddress } =
//       profileDetails;
//     setProfile({ firstName, lastName, email, phoneNumber, confirmAddress });
//     //
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     profileDetails.firstName,
//     profileDetails.lastName,
//     profileDetails.email,
//     profileDetails.phoneNumber,
//     profileDetails.confirmAddress,
//   ]);

//   return (
//     <form className="md:w-[60%] mx-auto py-8 flex flex-col space-y-6">
//       <div className="flex gap-4">
//         <div className="flex flex-col gap-4 w-full">
//           <Label>First Name</Label>
//           <Input
//             type="text"
//             placeholder="First Name"
//             required
//             onChange={(e) =>
//               setProfileDetails((prev) => ({
//                 ...prev,
//                 firstName: e.target.value,
//               }))
//             }
//           />
//         </div>
//         <div className="flex flex-col gap-4 w-full">
//           <Label>Last Name</Label>
//           <Input
//             type="text"
//             placeholder="Last Name"
//             required
//             onChange={(e) =>
//               setProfileDetails((prev) => ({
//                 ...prev,
//                 lastName: e.target.value,
//               }))
//             }
//           />
//         </div>
//       </div>
//       <div className="flex gap-4">
//         <div className="flex flex-col gap-4 w-full">
//           <Label>Email</Label>
//           <Input
//             type="email"
//             placeholder="Email Address"
//             required
//             onChange={(e) =>
//               setProfileDetails((prev) => ({
//                 ...prev,
//                 email: e.target.value,
//               }))
//             }
//           />
//         </div>
//         <div className="flex flex-col gap-4 w-full">
//           <Label>Phone Number</Label>
//           <Input
//             type="text"
//             placeholder="Phone Number"
//             required
//             onChange={(e) =>
//               setProfileDetails((prev) => ({
//                 ...prev,
//                 phoneNumber: e.target.value,
//               }))
//             }
//           />
//         </div>
//       </div>
//       <div className="flex flex-col gap-4 w-full">
//         <Label>Confirm Address</Label>
//         <Input
//           type="text"
//           placeholder="Confirm Address"
//           required
//           onChange={(e) =>
//             setProfileDetails((prev) => ({
//               ...prev,
//               confirmAddress: e.target.value,
//             }))
//           }
//         />
//       </div>
//     </form>
//   );
// };

// export default DeliveryDetails;

import React, { useContext, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import OrderContext from "@/context/OrderProvider";

const DeliveryDetails = () => {
  const [profileDetails, setProfileDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    confirmAddress: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    confirmAddress: "",
  });

  const { setProfile } = useContext(OrderContext);

  useEffect(() => {
    const { firstName, lastName, email, phoneNumber, confirmAddress } =
      profileDetails;
    setProfile({ firstName, lastName, email, phoneNumber, confirmAddress });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    profileDetails.firstName,
    profileDetails.lastName,
    profileDetails.email,
    profileDetails.phoneNumber,
    profileDetails.confirmAddress,
  ]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  const validateField = (fieldName, value) => {
    if (value.length < 3) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: `${fieldName} should be at least 3 characters long.`,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  };

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;

    if (fieldName === "email") {
      validateEmail(value);
    } else validateField(fieldName, value);

    setProfileDetails((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <form className="w-[95%] md:w-[60%] mx-auto py-8 flex flex-col space-y-6">
      <div className="flex gap-4 sm:flex-row flex-col">
        <div className="flex flex-col gap-4 w-full">
          <Label>First Name</Label>
          <div className="h-[45px] flex flex-col gap-[5px]">
            <Input
              type="text"
              placeholder="First Name"
              required
              value={profileDetails.firstName}
              onChange={(e) => handleInputChange(e, "firstName")}
            />
            {errors.firstName && (
              <span className="text-red-500 text-[11px]">
                {errors.firstName}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Label>Last Name</Label>
          <div className="h-[45px] flex flex-col gap-[5px]">
            <Input
              type="text"
              placeholder="Last Name"
              required
              value={profileDetails.lastName}
              onChange={(e) => handleInputChange(e, "lastName")}
            />
            {errors.lastName && (
              <span className="text-red-500 text-[11px]">
                {errors.lastName}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-4 sm:flex-row flex-col">
        <div className="flex flex-col gap-4 w-full">
          <Label>Email</Label>
          <div className="h-[45px] flex flex-col gap-[5px]">
            <Input
              type="email"
              placeholder="Email Address"
              required
              value={profileDetails.email}
              onChange={(e) => handleInputChange(e, "email")}
            />
            {errors.email && (
              <span className="text-red-500  text-[12px]">{errors.email}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Label>Phone Number</Label>
          <div className="h-[30px] flex flex-col gap-[5px]">
            <Input
              type="text"
              placeholder="Phone Number"
              required
              value={profileDetails.phoneNumber}
              onChange={(e) => handleInputChange(e, "phoneNumber")}
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-[11px]">
                {errors.phoneNumber}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <Label>Confirm Address</Label>
        <div className="h-[45px] flex flex-col gap-[5px]">
          <Input
            type="text"
            placeholder="Confirm Address"
            required
            value={profileDetails.confirmAddress}
            onChange={(e) => handleInputChange(e, "confirmAddress")}
          />
          {errors.confirmAddress && (
            <span className="text-red-500 text-[11px]">
              {errors.confirmAddress}
            </span>
          )}
        </div>
      </div>
    </form>
  );
};

export default DeliveryDetails;
