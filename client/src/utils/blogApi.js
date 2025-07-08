import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";

const auth = getAuth();

const blogsCollection = collection(db, "blogs");

// ✅ Get all blogs
export const getBlogs = async () => {
  const snapshot = await getDocs(blogsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ✅ Get blog by ID
export const getBlogById = async (id) => {
  const blogRef = doc(db, "blogs", id);
  const docSnap = await getDoc(blogRef);

  if (!docSnap.exists()) {
    throw new Error("Blog not found");
  }

  return { id: docSnap.id, ...docSnap.data() };
};

// ✅ Create a new blog (requires auth)
export const postBlogToFirestore = async (blogData) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const docRef = await addDoc(collection(db, "blogs"), {
    ...blogData,
    likes: [],
    comments: [],
    datePosted: serverTimestamp(),
  });

  return docRef.id;
};

// ✅ Update blog
export const updateBlog = async (id, blogData) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const blogRef = doc(db, "blogs", id);
  await updateDoc(blogRef, blogData);
  return { id, ...blogData };
};

// ✅ Delete blog
export const deleteBlog = async (id) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const blogRef = doc(db, "blogs", id);
  await deleteDoc(blogRef);
  return { success: true };
};

// Add current user's UID to the likes array
export const likeBlog = async (blogId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const blogRef = doc(db, "blogs", blogId);
  await updateDoc(blogRef, {
    likes: arrayUnion(user.uid),
  });

  return { success: true };
};

// Remove current user's UID to the likes array
export const removeLikeBlog = async (blogId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const blogRef = doc(db, "blogs", blogId);
  await updateDoc(blogRef, {
    likes: arrayRemove(user.uid),
  });

  return { success: true };
};

// Add a comment with name and message
export const addCommentToBlog = async (blogId, commentText, username) => {
  const blogRef = doc(db, "blogs", blogId);

  const comment = {
    name: username,
    comment: commentText,
    date: Timestamp.now(),
  };

  await updateDoc(blogRef, {
    comments: arrayUnion(comment),
  });

  return { success: true };
};
