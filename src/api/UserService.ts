import { useContext } from "react";
import { UserRegistrationData } from "../components/UserContext";


const API = "https://0588ed3a337e.ngrok-free.app/Flow";

export const createNewAccount = async (
  userRegistrationData: UserRegistrationData
) => {
  console.log("[createNewAccount] Starting account creation", userRegistrationData);
  
  let formData = new FormData();
  formData.append("firstName", userRegistrationData.firstName);
  formData.append("lastName", userRegistrationData.lastName);
  formData.append("countryCode", userRegistrationData.countryCode);
  formData.append("contactNo", userRegistrationData.phoneNumber);
  formData.append("profileImage", {
    uri: userRegistrationData.profileImage,
    name: "profile.png",
    type: "image/png",
  } as any);

  console.log("[createNewAccount] Sending request to:", API + "/UserController");
  const response = await fetch(API + "/UserController", {
    method: "POST",
    body: formData,
  });

  console.log("[createNewAccount] Response status:", response.status);
  
  if (response.ok) {
    const json = await response.json();
    console.log("[createNewAccount] Success:", json);
    return json;
  } else {
    console.error("[createNewAccount] Failed with status:", response.status);
    return "OOPS! Account creation failed!";
  }
};

export const uploadProfileImage = async (userId:string, imageUri: string) => {
  console.log("[uploadProfileImage] Starting upload for user:", userId);
  
  let formData = new FormData();
  formData.append("userId", userId);
  formData.append("profileImage", {
    uri: imageUri,
    type: "image/png", // change if PNG
    name: "profile.png",
  } as any);

  console.log("[uploadProfileImage] Sending request to:", API + "/ProfileController");
  const response = await fetch(API + "/ProfileController", {
    method: "POST",
    body: formData,
  });
  
  console.log("[uploadProfileImage] Response status:", response.status);
  
  if (response.ok) {
    const result = await response.json();
    console.log("[uploadProfileImage] Success:", result);
    return result;
  } else {
    console.warn("[uploadProfileImage] Profile image uploading failed!");
  }
};
