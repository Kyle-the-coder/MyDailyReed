import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";

export const uploadImageToFirebase = async (file, folder = "blogFolder") => {
  if (!file) throw new Error("No file provided");

  const fileRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
  await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(fileRef);

  return downloadURL;
};
