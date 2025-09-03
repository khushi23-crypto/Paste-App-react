import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

function Home() {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch()
    
    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId ||
                Date.now().toString(36),
                createdAt: new Date().toISOString(),
        }
        if (pasteId) {
            dispatch(updateToPastes(paste));
        }
        else {
            dispatch(addToPastes(paste));
        }

        setTitle(' ')
        setValue(' ')
        setSearchParams({});
    }

    return (
        <div>
            <div className='flex flew-row gap-20 place-content-between'>
                <input className='p-1 rounded-2xl  mt-2 bg-gray-300 w-[55%] pl-4 border border-black'
                    type='text'
                    placeholder='Enter Title Here....'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button
                    onClick={createPaste}
                    className='p-2 rounded-2xl border border-black mt-2  bg-gray-300'>
                    {
                        pasteId ? "Update My Paste"
                            : "Create My Paste"
                    }
                </button>
            </div>
            <div className='mt-8'>
                <textarea className='rounded-2xl mt-1 min-w-[500px] p-4 border border-black  bg-violet-100'
                    value={value}
                    placeholder='enter content here'
                    onChange={(e) => setValue(e.target.value)}
                    rows={20} />
            </div>
        </div>

    )
}

export default Home