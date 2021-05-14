import React from 'react'
import { useSelector } from "react-redux";
//@ts-ignore
import ScrollToBottom from 'react-scroll-to-bottom';
import { AppStateType } from '../../../../redux/store/store';

import ChatElement from '../ChatElement/ChatElement'
import './Style.css'

const ChatContainer: React.FC = () => {

  const messages = useSelector((state: AppStateType) => state.chat)

  return (
    <ScrollToBottom className="messages">
      {messages.map(message => <ChatElement name={message.user?.fullName} message={message.message} />)}
    </ScrollToBottom >
  )
}

export default ChatContainer
