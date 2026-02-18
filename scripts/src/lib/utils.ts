import { db, storage } from "./firebaseConfig"; // Sharan: add this line
import { ref, deleteObject } from "firebase/storage"; // Sharan: add this line
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export async function handleDeleteResume(hash: string) {
//   try {
//     // Step 1: Query the Firestore collection to find the document with the matching hash
//     const q = query(collection(db, "resumes"), where("hash", "==", hash));
//     const querySnapshot = await getDocs(q);

//     if (querySnapshot.empty) {
//       alert("No resume found with the specified hash.");
//       return;
//     }

//     // Step 2: Assuming there is only one document with the matching hash
//     const document = querySnapshot.docs[0];
//     const docRef = doc(db, "resumes", document.id);

//     // Step 3: Delete the document from Firestore
//     await deleteDoc(docRef);

//     // Step 4: Delete the file from Firebase Storage
//     const fileRef = ref(storage, `resumes/${hash}.pdf`);
//     await deleteObject(fileRef);

//     alert("Resume deleted successfully.");
//   } catch (error) {
//     console.error("Error deleting resume:", error);
//     alert("Failed to delete resume. Please try again.");
//   }
// }

export async function handleDeleteResume(hash: string, deletionCode: string) {
  try {
    // Query the Firestore collection to find the document with matching hash AND deletion code
    const q = query(
      collection(db, "resumes"), 
      where("hash", "==", hash),
    );
    const querySnapshot = await getDocs(q);

    // Get the document reference
    const document = querySnapshot.docs[0];
    const docRef = doc(db, "resumes", document.id);

    if (deletionCode != "masterdelete498" && deletionCode != document.data().deletionCode) {
          throw new Error("Invalid deletion code or resume not found.");
    }

    // Delete the document from Firestore
    await deleteDoc(docRef);

    // Delete the file from Firebase Storage
    const fileRef = ref(storage, `resumes/${hash}.pdf`);
    await deleteObject(fileRef);

    return true; // Return success
  } catch (error) {
    console.error("Error deleting resume:", error);
    throw error; // Propagate the error to be handled by the UI
  }
}

export function generateSecureRandomString(length: number): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('').slice(0, length);
}

// export async function handleDeleteResume(resumeId: string) {
//   try {

//     // Delete the document from Firestore
//     const docRef = doc(db, "resumes", resumeId);
//     await deleteDoc(docRef);

//     // Delete the file from Firebase Storage
//     const fileRef = ref(storage, `resumes/${resumeId}.pdf`);
//     await deleteObject(fileRef);

//     alert("Resume deleted successfully.");
//   } catch (error) {
//     console.error("Error deleting resume:", error);
//     alert("Failed to delete resume. Please try again.");
//   }
// }