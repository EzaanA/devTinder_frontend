import React, { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { createSocketConnection } from '../utils/sockets'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Chat = () => {

    const {targetUserId} = useParams() ;
    const[messageArray , setMessageArray] = useState([]);
    const[newMessage , setNewMessage] = useState("");

    const user = useSelector((store)=>{
        return store.user
    })

    const userId = user?._id;
    const name = user?.firstName;

    useEffect(()=>{
      if(!userId){
        return
      }
        // as soon as the page is loaded,the socket connection is made & joinChat event is emitted
        const socket = createSocketConnection();
        //we're sending event (needs the user id or room where i can join  (need to send some data to the backend ))
        console.log(name);
        socket.emit("joinChat" , {name ,userId , targetUserId});


      socket.on("newMessage" , ({name , text})=>{
        console.log(name + "++++" + text);
        setMessageArray((newMessage) => [...newMessage , {name , text}]);
        setNewMessage('');

      })


        return ()=>{
            //disconnecting our socket is very importnat always close open sockets , as 
            socket.disconnect();
        };
    },[userId , targetUserId]);


    const handleSendMessage = () =>{
      const socket = createSocketConnection();
      socket.emit("sendMessage" , {name , userId , targetUserId , text : newMessage })
    }



  return (
    <>
    <div className='flex justify-center'>
    <div className='flex flex-col w-1/2 justify-center items-start border '>
        <div className='border w-full '>Chat</div>
        <div className='h-80'>
     { messageArray.map((msg , index)=>{
      return(
        user.firstName == name ? 

        <div className="chat chat-start" key={index}>
          <div className="chat-bubble chat-bubble-primary">

          {msg.text}
          </div>
        </div>
          :
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-info">{msg.text}</div>
          </div>
      );
     })}
<div className="chat chat-start ">
</div>
        </div>
        <div className='w-full'>
            <input
            value={newMessage}
            onChange={(e)=> setNewMessage(e.target.value)}
                placeholder='type something here'
                className='w-[90%] h-16 p-5'
            />
            <button className='w-[10%] h-16 bg-secondary text-blue-950'
            onClick={handleSendMessage}
            >Send</button>
        </div>
    </div>
    </div>
    </>
  )
}

export default Chat
