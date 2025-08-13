import { set } from 'mongoose';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm:'',
        type: 'all',
        offer: false,
        parking: false,
        furnished: false,
        sort: 'createdAt',
        order:'desc',
    })
    // console.log(sidebardata);
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    console.log(listings);
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTerm = urlParams.get('searchTerm') ;
        const type = urlParams.get('type') ;
        const offer = urlParams.get('offer');
        const parking = urlParams.get('parking');
        const furnished = urlParams.get('furnished');
        const sort = urlParams.get('sort') ;
        const order = urlParams.get('order') ;
        if(
            searchTerm || type || offer || parking || furnished || sort || order
        ) {
            setSidebardata({
                searchTerm: searchTerm || '',
                type: type || 'all',
                offer: offer === 'true' || false,
                parking: parking === 'true' || false,
                furnished: furnished === 'true' || false,
                sort: sort || 'createdAt',
                order: order || 'desc',
            });
        }

        const fetchListings = async () => {
            setLoading(true);
            const searchQuery =urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            setListings(data);
            setLoading(false);
        };
        fetchListings(); 

    },[location.search]);
    const handleChange = (e) => {
        if(e.target.id ==='all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSidebardata({
                ...sidebardata,
                type: e.target.id,
            });
        }
        if(e.target.id==='searchTerm') {
            setSidebardata({
                ...sidebardata,
                searchTerm: e.target.value,
            });
        }
        if(e.target.id==='parking' || e.target.id==='furnished' || e.target.id==='offer') {
            setSidebardata({
                ...sidebardata,
                [e.target.id]: 
                    e.target.checked ||e.target.checked === 'true'? true : false,
            });
        }
        if(e.target.id === 'sort_order') {
            const sort= e.target.value.split('_')[0] || 'created_at';
            const order= e.target.value.split('_')[1] || 'desc';
            setSidebardata({
                ...sidebardata,
                sort: sort,
                order: order,
            });
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen '>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap font-semibold'>Search Term</label>
                <input type='text' 
                    id='searchTerm' 
                    placeholder='Search...' 
                    className='border rounded-lg p-3 w-full' 
                    value={sidebardata.searchTerm} 
                    onChange={handleChange}
                />
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
                <label className='font-semibold'>Type:</label>
                <div className='flex gap-2 '>
                    <input type='checkbox' 
                        id='all' 
                        className='w-5'
                        checked={sidebardata.type === 'all'}
                        onChange={handleChange} 
                    />
                    <span>Rent & Sale</span>
                </div>
                <div className='flex gap-2 '>
                    <input type='checkbox' 
                        id='rent' 
                        className='w-5'
                        checked={sidebardata.type === 'rent'}
                        onChange={handleChange}
                    />
                    <span>Rent</span>
                </div>
                <div className='flex gap-2 '>
                    <input type='checkbox' 
                        id='sale' 
                        className='w-5'
                        checked={sidebardata.type === 'sale'}
                        onChange={handleChange}
                    />
                    <span>Sale</span>
                </div>
                <div className='flex gap-2 '>
                    <input type='checkbox' 
                        id='offer' 
                        className='w-5'
                        checked={sidebardata.offer}
                        onChange={handleChange}
                    />
                    <span>Offer</span>
                </div>
            </div>

            <div className='flex gap-2 flex-wrap items-center'>
                <label className='font-semibold'>Amenities:</label>
                <div className='flex gap-2 '>
                    <input type='checkbox' 
                        id='parking' 
                        className='w-5'
                        checked={sidebardata.parking}
                        onChange={handleChange}
                    />
                    <span>Parking</span>
                </div>
                <div className='flex gap-2 '>
                    <input type='checkbox' 
                        id='furnished' 
                        className='w-5'
                        checked={sidebardata.furnished}
                        onChange={handleChange}
                    />
                    <span>Furnished</span>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <label className='font-semibold'>Sort:</label>
                <select onChange={handleChange} defaultValue={'created_at_desc'} id='sort_order' className='border rounded-lg p-3'>
                    <option value='regularPrice_desc'>Price high to low</option>
                    <option value='regularPrice_aesc'>Price low to high</option>
                    <option value='createdAt_desc'>Latest</option>
                    <option value='createdAt_asc'>Oldest</option>
                </select>
            </div>
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
        </form>
      </div>
      <div className=''>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing results</h1>
      </div>
    </div>
  )
}
