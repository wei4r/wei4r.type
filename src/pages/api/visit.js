import admin from 'firebase-admin';

if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");
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

export default async (req, res) => {
  try {
    const visitsRef = db.collection('pageviews').doc('homePage');
    const doc = await visitsRef.get();

    if (!doc.exists) {
      await visitsRef.set({ count: 1 });
      res.status(200).json({ count: 1 });
    } else {
      const currentCount = doc.data().count;
      await visitsRef.update({ count: currentCount + 1 });
      res.status(200).json({ count: currentCount + 1 });
    }
  } catch (error) {
    console.error('Error updating visit count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};