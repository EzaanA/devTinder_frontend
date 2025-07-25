import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';
import { BASE_URL } from '../utils/constants';

const UserCard = ({ user }) => {
  const cardRef = useRef(null);
  const [buttonClicked, setButtonClicked] = useState(null);
  const dispatch = useDispatch();

  const { _id, firstName, lastName, age, gender, skills, photoURL, about } = user;

  const handleSendRequest = async (status) => {
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, {}, { withCredentials: true });

      // Animation before removing from UI
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          x: status === 'ignored' ? -1000 : 1000,
          y:-200,
          opacity: 0,
          duration: 0.7,
          onComplete: () => {
            dispatch(removeFeed(_id));
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div
      ref={cardRef}
      className="transition-all ease-in-out duration-300   border w-fit flex justify-center relative"
    >
      <div className="card bg-base-300 w-96 shadow-sm  ">
        <figure className="aspect-[2/4] w-96 overflow-hidden opacity-40 rounded-2xl">
          <img src={photoURL} alt="Profile pic" className="h-full w-full "/>
        </figure>
        <div className="card-body bg-yellow-50 bg-transparent bg-opacity-0 rounded-2xl absolute bottom-0 w-full ">
          <h2 className="card-title">{firstName + ' ' + lastName}</h2>
          <p>{`${age} ${gender}`}</p>
          <p className='max-h-40 overflow-hidden'>{about}</p>
          <div className="flex flex-wrap gap-3">
            {skills.map((e, i) => (
              <div key={i} className="badge badge-success">
                {e}
              </div>
            ))}
          </div>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => {
                setButtonClicked('ignored');
                handleSendRequest('ignored');
              }}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest('interested')}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
