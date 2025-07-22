import React, { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { createSocketConnection } from "../utils/sockets";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addChat } from "../utils/chatSlice";

const Chat = () => {
    // const {urlRoomId} = useParams();
    const { targetUserId } = useParams();
    // const[targetUserId ,setTargetUserId] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const dispatch = useDispatch();
    const socketRef = useRef(null);

    const chat = useSelector((store) => {
        return store.chat;
    });
    console.log("chat:");
    console.log(chat);
    const endOfMessagesRef = useRef(null);

    const user = useSelector((store) => store.user);
    const userId = user?._id;
    const name = user?.firstName;

    const fetchChat = async () => {
        try {
            const userId = user?._id;

            console.log("uId" + userId);
            console.log("tId" + targetUserId);
            // console.log(targetUserId);

            if (userId == targetUserId) {
                console.log("object");
            } else {
                const chat = await axios.get(
                    BASE_URL + "/chat/" + targetUserId,
                    { withCredentials: true }
                );
                console.log(chat);

                const chatMessages = chat?.data?.messages?.map((msg) => {
                    const time = new Date(msg.updatedAt);
                    const inLocalTime = time.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    });
                    return {
                        senderId: msg.senderId._id,
                        fName: msg.senderId.firstName,
                        message: msg.textMessage,
                        time: inLocalTime,
                    };
                });
                dispatch(addChat(chatMessages));
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        console.log(" componenet mounted");
        fetchChat();
    }, []);

    useEffect(() => {
        if (!userId) return;

        const socket = createSocketConnection();
        socketRef.current = socket; // Store socket in ref

        socket.emit("joinChat", { name, userId, targetUserId });
        // setTargetUserId(targetUserId);

        //here the roomJoinedId---->


        socket.on(
            "newMessage",
            ({ name, text, userId, targetUserId, time }) => {
                dispatch(
                    addChat({
                        name,
                        text,
                        userId,
                        targetUserId,
                        time,
                    })
                );
            }
        );

        return () => {
            socket.disconnect();
        };
    }, [userId, targetUserId]);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        if (!socketRef.current) return;

        socketRef.current.emit("sendMessage", {
            name,
            userId,
            targetUserId,
            text: newMessage,
        });

        // dispatch(addChat({
        //   name,
        //   text: newMessage,
        //   userId,
        //   targetUserId,
        //   time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),}))

        setNewMessage("");
    };

    return (
        <div className="flex justify-center">
            <div className="flex flex-col w-1/2 justify-center items-start border mt-8">
                <div className="border w-full flex justify-center font-bold text-accent text-xl"></div>
                <div className="h-96 flex flex-col w-full overflow-y-scroll">
                    {chat.map((msg, index) =>
                        msg.senderId === targetUserId ? (
                            <div key={index} className="chat chat-start">
                                <div className="chat-header">{msg.fName}</div>
                                <div className="chat-bubble chat-bubble-secondary">
                                    {msg.message}
                                </div>
                                <div className="chat-footer">{msg.time}</div>
                            </div>
                        ) : (
                            <div key={index} className="chat chat-end">
                                <div className="chat-bubble chat-bubble-info">
                                    {msg.message}
                                </div>
                            </div>
                        )
                    )}
                    {/* 👇 This invisible div will help scroll to the bottom */}
                    <div ref={endOfMessagesRef}></div>
                </div>
                <div className="w-full">
                    <input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="type your message here"
                        className="w-[90%] h-16 p-5"
                    />
                    <button
                        className="w-[10%] h-16 bg-secondary text-blue-950"
                        onClick={handleSendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
