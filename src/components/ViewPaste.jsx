import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

function ViewPaste() {

  const {id}=useParams();

  const allPastes=useSelector((state)=>state.paste.pastes);
  const paste=allPastes.filter((p)=>p._id===id)[0]
  return (
    <div>
            <div className='flex flew-row gap-20 place-content-between'>
                <input className='p-1 rounded-2xl  mt-2 bg-gray-300 w-[55%] pl-4 border border-black'
                    type='text'
                    placeholder='Enter Title Here....'
                    value={paste.title}
                    disabled
                    //onChange={(e) => setTitle(e.target.value)}
                />

                {/* <button
                    onClick={createPaste}
                    className='p-2 rounded-2xl border border-black mt-2  bg-gray-300'>
                    {
                        pasteId ? "Update My Paste"
                            : "Create My Paste"
                    }
                </button> */}
            </div>
            <div className='mt-8'>
                <textarea className='rounded-2xl mt-1 min-w-[500px] p-4 border border-black  bg-violet-100'
                    value={paste.content}
                    placeholder='enter content here'
                    //onChange={(e) => setValue(e.target.value)}
                    rows={20}
                    disabled />
            </div>
        </div>
  )
}

export default ViewPaste