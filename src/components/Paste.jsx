import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  const [search, setSeach] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(search.toLowerCase())
  );
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId))
  }
  const handleShare = (paste) => {
  if (navigator.share) {
    navigator.share({
      title: paste.title,
      text: paste.content,
      url: window.location.href,
    });
    toast.success('Content shared successfully');
  } else {
    navigator.clipboard.writeText(`${paste.title}\n${paste.content}\n${window.location.href}`);
    toast.success('Copied to clipboard as fallback!');
  }
};


  return (
    <div>
      <input className='p-2 rounded-2xl min-w-[600px] mt-5 border border-black'
        type='search'
        placeholder='search here'
        value={search}
        onChange={(e) => setSeach(e.target.value)} />
      <div className='flex flex-col gap-5 mt-5 text-center '>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
                <div className='border border-gray-400' key={paste?._id}>
                  <div>
                    {paste.title}
                  </div>
                  <div>
                    {paste.content}
                  </div>
                  <div className='flex flex-row gap-4 place-content-evenly'>
                    <button>
                      <a href={`/?pasteId=${paste._id}`}>Edit</a></button>
                    <button>
                      <a href={`/pastes/${paste?._id}`}>View</a></button>
                    <button onClick={() => handleDelete(paste?._id)}>Delete</button>
                    <button onClick={handleShare}>Share</button>
                    <button onClick={() => {
                      navigator.clipboard.writeText(paste.content)
                      toast.success('Copied to clipboard')
                    }}>Copy</button>
                  </div>
                  <div>
                    {paste.createdAt}
                  </div>
                </div>
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default Paste