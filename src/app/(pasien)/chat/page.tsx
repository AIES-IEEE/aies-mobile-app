'use client';

import { useState } from 'react';
import { MessageSquare, Send, User, Image as ImageIcon, Paperclip } from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'doctor';
  text: string;
  time: string;
}

export default function ChatPage() {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'doctor',
      text: 'Selamat siang, bagaimana kondisi Anda hari ini?',
      time: '11:30'
    },
    {
      id: 2,
      sender: 'user',
      text: 'Siang dok, saya merasa sedikit pusing sejak tadi pagi',
      time: '11:32'
    },
    {
      id: 3,
      sender: 'doctor',
      text: 'Apakah Anda sudah mengukur tekanan darah? Data terakhir menunjukkan tekanan darah Anda normal.',
      time: '11:33'
    },
    {
      id: 4,
      sender: 'user',
      text: 'Belum dok, saya akan mengukurnya sekarang',
      time: '11:34'
    }
  ]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
    
    // Simulasi respons dokter setelah beberapa detik
    setTimeout(() => {
      const doctorResponse: Message = {
        id: messages.length + 2,
        sender: 'doctor',
        text: 'Terima kasih atas informasinya. Mohon tetap pantau tanda vital Anda dan beritahu saya hasilnya.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prevMessages => [...prevMessages, doctorResponse]);
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center mb-4">
        <MessageSquare className="h-6 w-6 text-aies-primary mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">Chat</h1>
      </div>

      {/* Dokter Info */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex items-center">
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <User className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="font-medium text-gray-800">dr. Ahmad Santoso</h2>
          <p className="text-xs text-gray-500">Dokter Umum • Online</p>
        </div>
      </div>

      {/* Chat Box */}
      <div className="flex-grow bg-white rounded-xl shadow-sm p-4 mb-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-xl p-3 ${
                  message.sender === 'user'
                    ? 'bg-aies-primary text-white rounded-tr-none'
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-aies-light' : 'text-gray-500'
                  }`}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="bg-white rounded-xl shadow-sm p-3 flex items-center">
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
          <Paperclip className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 mr-1">
          <ImageIcon className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ketik pesan..."
          className="flex-grow border-0 focus:ring-0 focus:outline-none text-sm p-2"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <button
          onClick={handleSendMessage}
          className={`p-2 rounded-full ${
            inputMessage.trim() === ''
              ? 'text-gray-400 bg-gray-100'
              : 'text-white bg-aies-primary'
          }`}
          disabled={inputMessage.trim() === ''}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}