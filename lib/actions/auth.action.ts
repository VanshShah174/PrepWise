"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
import { success } from "zod";

const ONE_WEEK = 60 * 60 * 24 * 7; // 7 days in seconds

/**
 * Creates a new user account in the Firebase database
 * @param params - Object containing uid, name, and email of the user
 * @returns Object with success status and message
 * @throws Error if user creation fails
 */

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in instead.",
      };
    }

    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return{
        success: true,
        message: "Account created successfully, please sign in.",
    }

  } catch (e: any) {
    console.error("Error creating a user:", e);

    if (e.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use",
      };
    }

    return {
      success: false,
      message: "Failed to create an account",
    };
  }
}

/**
 * Authenticates a user and creates a session
 * @param params - Object containing email and idToken
 * @returns Object with success status and message
 * @throws Error if authentication fails
 */

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User not found. Please sign up first.",
      };
    }
    await setSessionCookie(idToken);
  } catch (e: any) {
    console.error("Error signing in:", e);
    return {
      success: false,
      message: "Failed to sign in",
    };
  }
}

/**
 * Creates and sets a secure HTTP-only session cookie
 * @param idToken - Firebase authentication token
 * @throws Error if session cookie creation fails
 */

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000, // Convert seconds to milliseconds
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

/**
 * Retrieves the current authenticated user from the session
 * @returns Promise<User | null> Returns user object if authenticated, null otherwise
 * @description
 * 1. Checks for session cookie
 * 2. Verifies the session token
 * 3. Fetches user data from Firestore
 * 4. Returns formatted user object or null if any step fails
 */

export async function getCurrentUser() : Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    
    const userRecord = await db.
        collection("users")
        .doc(decodedClaims.uid)
        .get();

    if (!userRecord.exists) return null;

    return {
        ...userRecord.data(),
        id: userRecord.id,

    } as User;

  } catch (e: any) {
    console.error("Error verifying session cookie:", e);
    return null;
  }
}

/**
 * Checks if there is an authenticated user session
 * @returns Promise<boolean> True if user is authenticated, false otherwise
 * @description Simple wrapper around getCurrentUser to check authentication status
 */

export async function isAuthenticated() {
    const user =  await getCurrentUser()

    return !!user;
}

export async function getInterviewByUserId(userId : string): Promise<Interview[] | null> {
    const interviews = await db
    .collection('interviews')
    .where('userId',"==", userId)
    .orderBy('createdAt','desc')
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as Interview[]

}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}