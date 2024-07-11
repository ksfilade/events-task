"use client"
import EventComponent from "@/components/EventComponent";
import { useAuth } from "@/lib/AuthContext";
import { Event } from "@/types/types";
import axios from "axios";
import { headers } from "next/headers";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [events, setEvents] = useState([])
  const auth = useAuth()
  const attendEvent = async(event:Event) =>{
    if(!auth.user)
      return
    let res = await axios.put('/api/'+event.id+ '/attend', {
      userId: auth.user.uid,
      name: auth.user.displayName
    },{
      headers:{
        authorization: auth.user.accessToken
      }
    })
    getEvents()

    // router.push('/')
  }
  const getEvents = async () => {
    
    let res = await axios.get('/api')
    setEvents(res.data)
  }

  const deleteEvent = async (id: string) =>{
    if(!auth.user)
    return
    await axios.delete(`api/${id}`,{
      headers:{
        authorization: auth.user.accessToken
      }
    })
    getEvents()
  }
  useEffect(() => {
    getEvents()
  }, [auth])
  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="bg-white ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Current Events:</h2>

          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {events.map((post, index) => (
              <EventComponent event={post} index={index} key={index} onDelete={(id:string) =>{deleteEvent(id)}} onAttend={(id: Event) =>{attendEvent(id)}}/>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
