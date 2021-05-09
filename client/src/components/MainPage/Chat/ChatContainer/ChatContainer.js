import React from 'react'
import { useSelector } from "react-redux";
import ScrollToBottom from 'react-scroll-to-bottom';

import ChatElement from '../ChatElement/ChatElement'
import './Style.css'

const ChatContainer = () => {

  const messages = useSelector((state) => state.chat)

  return (
    <ScrollToBottom className="messages">
      {messages.map(message => <ChatElement name={message.user?.fullName} message={message.message} />)}
    </ScrollToBottom >
  )
}

export default ChatContainer