import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;

function initAdmin() {
  if (!projectId || !clientEmail || !rawPrivateKey) {
    return null;
  }

  const privateKey = rawPrivateKey.replace(/\\n/g, "\n");

  if (getApps().length === 0) {
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey })
    });
  }

  return {
    db: getFirestore(),
    auth: getAuth()
  };
}

const admin = initAdmin();

export const db = admin?.db ?? null;
export const adminAuth = admin?.auth ?? null;
export { FieldValue };
