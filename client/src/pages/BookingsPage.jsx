import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";
export default function BookingsPage(){
    const [bookings,setBookings]=useState([]);
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        });
    },[]);
    return(
        <div>
        <AccountNav/>
        <div>
        {bookings?.length > 0 && bookings.map(booking =>(
            <Link to={`/account/bookings/${booking._id}`} className="flex gap-2 items-center bg-gray-200 rounded-2xl overflow-hidden">
                <div className="w-48">
                    <PlaceImg place={booking.place} />
                </div>
                <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{booking.place.title}</h2>
                <div className="text-xl">
                  <BookingDates booking={booking} className="mt-4 mb-2 text-sm  text-gray-500"/>
                <div className="flex gap-1 items-center ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-2xl">
                Total price: ${booking.price}
                </span>
                </div>
                </div>
                </div>
            </Link>
        ))}
        </div>
        </div>
    )
}