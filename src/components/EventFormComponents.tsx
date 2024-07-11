"use client"

import { Event } from "@/types/types";
import { useEffect, useState } from "react";

interface EventFormDto{
    onSubmit: Function
    event?: Event | null
    edit?:boolean
}
export default function EventFormComponent({ onSubmit, event, edit }: EventFormDto) {
    const [eventName, setEventName] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    useEffect(() => {
        setEventName(event?.eventName ?? "")
        setDate(event?.date ?? "")
        setLocation(event?.location ?? "")
        setDescription(event?.description ?? "")
    }, [event])
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" action="#" method="POST">
      <div>
        <label htmlFor="eventname" className="block text-sm font-medium leading-6 text-gray-900">Event Name</label>
        <div className="mt-2">
          <input value={eventName} id="eventname" name="eventname" type="text" onChange={(e) => { setEventName(e.target.value) }} required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">Date</label>
        <div className="mt-2">
          <input value={date} id="date" name="date" type="text" onChange={(e) => { setDate(e.target.value) }} required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">Location</label>
        <div className="mt-2">
          <input value={location} id="location" name="location" type="location" onChange={(e) => { setLocation(e.target.value) }} required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <label htmlFor="desc" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
        <div className="mt-2">
          <textarea value={description} id="desc" name="desc" onChange={(e) => { setDescription(e.target.value) }} required className="px-2 h-[10rem] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
        onClick={(e) =>{e.preventDefault(); onSubmit(eventName,date,location,description, event?.attendingUsers)}}>{edit ? 'Update Event' : 'Create Event'}</button>
      </div>
    </form>


  </div>

  );
}
