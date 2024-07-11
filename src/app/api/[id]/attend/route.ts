import { db } from "@/lib/firebaseConfig"
import { verifyToken } from "@/lib/verifyToken"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore/lite"

export async function PUT(request: Request) {
    try {
        let token = request.headers.get('authorization')
        let isVerified = await verifyToken(token ?? '')

        if (!isVerified) {
            return Response.json({ error: 'not authorized' }, { status: 401 })
        }
        let docId = request.url.split('/')[request.url.split('/').length - 2]
        const eventRef = doc(db, 'events', docId)
        const eventSnapshot = await getDoc(eventRef);
        const eventData = eventSnapshot.data()
        if (eventData) {
            let data = await request.json()
            let newUsersArray = [...eventData.attendingUsers.filter((elem: any) => elem.userId !== data.userId), data]
            const eventsSnapshot = await updateDoc(eventRef, {
                attendingUsers: newUsersArray
            });
        }
        
        return Response.json({ success: true })
    } catch (e) {
        return Response.json({ error: e }, { status: 500 })
    }
}