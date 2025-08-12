import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');
    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandlord(data);
            }catch (err) {
                console.error("Failed to fetch landlord data:", err);
            }
        }
        fetchLandlord();
    },[listing.userRef])
    const onChange = (e) => {
        setMessage(e.target.value);
    }
  return (
    <>
     {landlord && (
        <div className='flex flex-col gap-2'>
            <p>Contact <span className='font-semibold'>{landlord.username} for <span className='font-semibold'>{listing.name.toLowerCase()}</span></span></p>
            <textarea className='w-full border p-3 rounded-lg' name='message' id='message' rows='2' placeholder='Enter your message here' value={message} onChange={onChange} ></textarea>
            <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className='bg-slate-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'>
                Send Message
            </Link>
        </div>
     )} 
    </>
  )
}
