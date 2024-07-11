import { db } from "@/lib/firebaseConfig";
import { verifyToken } from "@/lib/verifyToken";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore/lite";
export async function GET(request: Request) {
    try {
        let token = request.headers.get('authorization')
        let isVerified = await verifyToken(token ?? '')

        if (!isVerified) {
            return Response.json({ error: 'not authorized' }, { status: 401 })
        }
        let docId = request.url.split('/')[request.url.split('/').length - 1]
        const eventRef = doc(db, 'events', docId)
        const eventsSnapshot = await getDoc(eventRef);
        const data = eventsSnapshot.data()

        return Response.json({ id: docId, ...data })
    } catch (e) {
        return Response.json({ error: e }, { status: 500 })

    }
}
export async function DELETE(request: Request) {
    try {
        let token = request.headers.get('authorization')
        let isVerified = await verifyToken(token ?? '')

        if (!isVerified) {
            return Response.json({ error: 'not authorized' }, { status: 401 })
        }
        let docId = request.url.split('/')[request.url.split('/').length - 1]
        const eventRef = doc(db, 'events', docId)
        const eventsSnapshot = await deleteDoc(eventRef);
        return Response.json({ success: true })
    } catch (e) {
        return Response.json({ error: e }, { status: 500 })

    }
}

export async function PUT(request: Request) {
    try {
        let token = request.headers.get('authorization')
        let isVerified = await verifyToken(token ?? '')
        
        if (!isVerified) {
            return Response.json({ error: 'not authorized' }, { status: 401 })
        }
        let data = await request.json()
        let docId = request.url.split('/')[request.url.split('/').length - 1]
        const eventRef = doc(db, 'events', docId)
        const eventsSnapshot = await setDoc(eventRef, data);
        return Response.json({ success: true })
    } catch (e) {
        return Response.json({ error: e }, { status: 500 })
    }
}