import { db } from "@/lib/firebaseConfig";
import { verifyToken } from "@/lib/verifyToken";
import { addDoc, collection, getDocs } from "firebase/firestore/lite";
export async function GET(request: Request) {
    try {
        const citiesCol = collection(db, 'events');
        const eventsSnapshot = await getDocs(citiesCol);
        const eventsList = eventsSnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        });
        return Response.json(eventsList)
    } catch (e) {
        return Response.json({ error: e }, { status: 500 })
    }
}
export async function POST(request: Request) {
    try {
        let token = request.headers.get('authorization')
        let isVerified = await verifyToken(token ?? '')

        if (!isVerified) {
            return Response.json({ error: 'not authorized' }, { status: 401 })
        }
        let data = await request.json()
        const citiesCol = collection(db, 'events');
        let res = await addDoc(citiesCol, data)

        return Response.json(res ? { success: true } : { success: false })
    } catch (e) {
        return Response.json({ error: e }, { status: 500 })
    }
}