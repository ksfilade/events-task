"use client"
import EventFormComponent from "@/components/EventFormComponents";
import { useAuth } from "@/lib/AuthContext";
import { AttendingUser, Event } from "@/types/types";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditEvent() {
  const auth = useAuth()
  const router = useRouter()
  const pathName = usePathname()
  const [event, setEvent] = useState<Event | null>(null)
  const [eventId, setEventId] = useState(pathName?.split('/')[pathName?.split('/').length - 1])
  const handleSubmit = async (eventName: string, date: string, location: string, description: string, attendingUsers: AttendingUser) => {
    if (!auth.user)
      return
    let res = await axios.put('/api/' + eventId, {
      eventName,
      date,
      location,
      description,
      attendingUsers: attendingUsers ?? []
    }, {
      headers: {
        authorization: auth.user.accessToken
      }
    })
    router.push('/')
  }
  const getEvent = async () => {
    let { data } = await axios.get('/api/' + eventId, {
      headers: {
        authorization: auth.user.accessToken
      }
    })
    setEvent(data)
  }
  useEffect(() => {
    getEvent()
  }, [])
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create Event</h2>
      </div>
      <EventFormComponent onSubmit={handleSubmit} event={event} edit />

    </div>
  );
}