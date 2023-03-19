import React, { useState, useEffect } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import { getComments } from '../services';
import { comment } from 'postcss'


const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug)
    .then((result)=> setComments(result))
  }, []);

  return (
    <>
      {comments.length >0 && (
        <div className='bg-white shodow-lg rounded-lg p-8 pb-12 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                {comments.length}
                {' '}
                Comments
            </h3>
            {comments.map((comment)=>(
              <div key={comment.createdAt} className='border-b border-gray-500 mb-4 pb-4 bg-black bg-opacity-10 rounded-xl'>
                <p className='mb-4'>
                    <span className='font-semibold ml-4 mr-2'>{comment.name}</span>
                    {' '}
                    on
                    {' '}
                    <span className='ml-2'>{moment(comment.createdAt).format('DD MMM YYYY')}</span>
                </p>
                <p className='whitespace-pre-line text-black-1000 w-full ml-4'>
                  {parse(comment.comment)}
                </p>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

export default Comments;
