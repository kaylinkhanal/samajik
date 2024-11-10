'use client'
import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { UserIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import UserAvatar from '../avatar';
import { Button } from '../ui/button';
import axios from 'axios';

const PostEditor = ({ placeholder }) => {









	const editor = useRef(null);
	const [content, setContent] = useState('');
    const handleSubmit =async ()=>{
        const { data } = await axios.post(`http://localhost:8080/posts`, {content: content})
        
    }



	const config = useMemo(() => ({
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			placeholder: placeholder || 'Whats on your mind?'
		}),
		[placeholder]
	);
    const {userDetails} = useSelector(state=>state.user)
	return (
        <>
          <div className='flex flex-col bg-orange-500 rounded-lg'>
           <span className='text-black font-bold ml-4'> CREATE POST</span>
            <div className='flex'>
            <UserAvatar disabled/>
          {userDetails?.user?.fullName}
            </div>
  
            </div>  
        	<JoditEditor
			ref={editor}
			value={content}
			config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {}}
		/>
        <Button  onClick={handleSubmit} className="bg-orange-500 m-2">POST</Button>

        </>
	
	);
};

export default PostEditor