"use client"
import EventFormComponent from "@/components/EventFormComponents";
import { useAuth } from "@/lib/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateEvent() {
  const auth = useAuth()
  const router = useRouter()
  const handleSubmit = async (eventName: string, date: string, location: string, description: string) => {
    try {
      let res = await axios.post('/api', {
        eventName,
        date,
        location,
        description,
        attendingUsers: []
      },{
        headers:{
          authorization: auth.user.accessToken
        }
      })
      router.push('/')
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create Event</h2>
      </div>
      <EventFormComponent onSubmit={handleSubmit} />

    </div>
  );
}