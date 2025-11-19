'use client';
import { Bot } from '@/components/animate-ui/icons/bot'
import React, { useState } from 'react'
import ChatDrawer from './chatDrawer'

const ChatHelp = ({ blogId }) => {
    const [chatOpen, setChatOpen] = useState(false);
  return (
    <div>
        <div className="fixed bottom-5 right-5 flex">
            <p onClick={() => setChatOpen(!chatOpen)} target="_blank" rel="noopener noreferrer" className="bg-secondary flex items-center gap-1 text-white px-4 py-2 shadow-lg">
                <Bot animateOnView={true} loop={true} />Chat with AI
            </p>
        </div>
        <ChatDrawer isOpen={chatOpen} blogId={blogId}/>
    </div>
  )
}

export default ChatHelp