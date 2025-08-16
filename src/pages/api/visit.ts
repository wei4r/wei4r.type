import admin from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

interface VisitCountResponse {
  count: number;
}

interface ErrorResponse {
  error: string;
}

interface FirebaseDocData {
  count: number;
}

if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  
  if (!privateKey || !process.env.NEXT_PUBLIC_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL) {
    throw new Error('Missing required Firebase environment variables');
  }
  
  const cert = admin.credential.cert({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey
  });
  
  admin.initializeApp({
    credential: cert,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  });
}

const db = admin.firestore();

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<VisitCountResponse | ErrorResponse>
): Promise<void> {
  try {
    const visitsRef = db.collection('pageviews').doc('homePage');
    const doc = await visitsRef.get();

    if (!doc.exists) {
      await visitsRef.set({ count: 1 });
      res.status(200).json({ count: 1 });
    } else {
      const data = doc.data() as FirebaseDocData;
      const currentCount = data?.count || 0;
      await visitsRef.update({ count: currentCount + 1 });
      res.status(200).json({ count: currentCount + 1 });
    }
  } catch (error) {
    console.error('Error updating visit count:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    res.status(500).json({ error: errorMessage });
  }
}