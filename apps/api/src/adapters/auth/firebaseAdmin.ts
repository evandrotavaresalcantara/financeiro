import * as admin from "firebase-admin";

const serviceAccount: admin.ServiceAccount = {
  projectId: process.env.FIREBASE_ADMIN_ID || "",
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || "",
  privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export { admin };
