"use client"

import Image from "next/image";
import DeleteImage from '../icons/delete.svg';
import EditImage from '../icons/edit.svg';
import AttendImage from '../icons/attend.svg';

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { Event } from "@/types/types";

interface EventDto {
  event: Event,
  index: number,
  onDelete: Function
  onAttend: Function
}

export default function EventComponent({ event, onAttend, onDelete }: EventDto) {
  const router = useRouter()
  const auth = useAuth()
  return (
    <div className="flex max-w-xl flex-col items-start justify-between min-w-[150px]" >
      <div className="flex items-center gap-x-4 text-xs">
        <time  className="text-gray-500">
        {event.location}, {event.date}
        </time>
        {auth.user && <div className="group relative  flex justify-center">
          <Image className="cursor-pointer" src={EditImage} width={15} height={15} alt="edit" onClick={() => { router.push('/edit-event/' + event.id) }} />
          <span className="z-10 absolute top-[-60px] scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Edit Event!</span>
        </div>}
        {auth.user && <div className="group relative  flex justify-center">
          <Image data-ripple-light="true" data-tooltip-target="tooltip-top" className="cursor-pointer" src={DeleteImage} width={15} height={15} alt="edit" onClick={() => { onDelete(event.id) }} />
          <span className="absolute top-[-60px] scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Delete Event!</span>
        </div>}
        {auth.user && <div className="group relative  flex justify-center">
          <Image data-ripple-light="true" data-tooltip-target="tooltip-top" className="cursor-pointer" src={AttendImage} width={15} height={15} alt="edit" onClick={() => { onAttend(event) }} />
          <span className="absolute top-[-60px] scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Attend Event!</span>
        </div>}
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a >
            <span className=" inset-0" />
            {event.eventName}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 min-h-[150px] overflow-y-auto">{event.description}</p>
        <h3 className="mt-3 text-sm font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            Attending Users:
        </h3>
        <ul className="list-decimal	">
          {
            event.attendingUsers?.map((elem, index) =>(
              <li key={index} className="mt-1 line-clamp-3 text-sm leading-6 text-gray-600">- {elem?.name}</li>
            ))
          }
        </ul>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        {/* <img alt="" src={event.author.imageUrl} className="h-10 w-10 rounded-full bg-gray-50" /> */}
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <a >
              <span className="absolute inset-0" />
              {/* {event.author.name} */}
            </a>
          </p>
        </div>
      </div>
    </div>

  );
}
