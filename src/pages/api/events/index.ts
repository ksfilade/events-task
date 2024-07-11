import { collection, getDocs } from 'firebase/firestore/lite';
import { db, app, auth } from '../../../lib/firebaseConfig';

export default async function handler(req:any, res: any) {
  if (req.method === 'GET') {
    try {
      const citiesCol = collection(db, 'events');
      const citySnapshot = await getDocs(citiesCol);
      const cityList = citySnapshot.docs.map(doc => doc.data());
      return cityList;
      // const snapshot = await db.collection('events').get();
      // const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  }
  //  else if (req.method === 'POST') {
  //   const { title, date, location, description } = req.body;
  //   if (!title || !date || !location || !description) {
  //     return res.status(400).json({ error: 'Missing required fields' });
  //   }

  //   try {
  //     const event = { title, date, location, description };
  //     const docRef = await db.collection('events').add(event);
  //     res.status(201).json({ id: docRef.id, ...event });
  //   } catch (error) {
  //     res.status(500).json({ error: 'Failed to create event' });
  //   }
  // } else {
  //   res.status(405).json({ error: 'Method not allowed' });
  // }
}