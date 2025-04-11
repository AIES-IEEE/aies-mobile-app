'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Phone, Video, MoreVertical, Send, 
  Image as ImageIcon, Paperclip, User, AlertCircle, Heart
} from 'lucide-react';

interface Message {
  id: number;
  sender: 'paramedic' | 'doctor';
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  attachment?: {
    type: 'image' | 'document' | 'vital-signs';
    content: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
  };
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  status: 'online' | 'offline';
  lastSeen?: string;
}

export default function ChatDetailPage() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params.id as string;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    // Simulate API call to get doctor and message history
    setTimeout(() => {
      setDoctor({
        id: doctorId,
        name: 'dr. Ahmad Santoso',
        specialization: 'Dokter Umum',
        status: 'online'
      });
      
      setMessages([
        {
          id: 1,
          sender: 'doctor',
          text: 'Selamat pagi, bagaimana kondisi pasien hafidz shidqi?',
          time: '10:15'
        },
        {
          id: 2,
          sender: 'paramedic',
          text: 'Pagi dok. Pasien stabil, tetapi tekanan darahnya sedikit tinggi.',
          time: '10:18',
          status: 'read'
        },
        {
          id: 3,
          sender: 'paramedic',
          text: 'Berikut data tanda vitalnya:',
          time: '10:19',
          status: 'read',
          attachment: {
            type: 'vital-signs',
            content: 'vital-signs-data',
            data: {
              heartRate: '85 bpm',
              bloodPressure: '145/95 mmHg',
              temperature: '36.8 °C',
              spo2: '97%'
            }
          }
        },
        {
          id: 4,
          sender: 'doctor',
          text: 'Terima kasih atas informasinya. Tekanan darahnya memang tinggi. Bagaimana riwayat hipertensinya?',
          time: '10:20'
        },
        {
          id: 5,
          sender: 'paramedic',
          text: 'Pasien mengaku memiliki riwayat hipertensi dan sedang dalam pengobatan, tetapi tidak teratur minum obat.',
          time: '10:22',
          status: 'read'
        },
        {
          id: 6,
          sender: 'doctor',
          text: 'Berikan captopril 25mg sublingual. Pantau tekanan darahnya 15 menit setelah pemberian obat.',
          time: '10:25'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, [doctorId]);
  
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newMessage: Message = {
      id: Date.now(),
      sender: 'paramedic',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
    
    // Simulate doctor response
    setTimeout(() => {
      const doctorResponse: Message = {
        id: Date.now() + 1,
        sender: 'doctor',
        text: 'Baik, terus pantau kondisinya dan laporkan jika ada perubahan signifikan.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prevMessages => [...prevMessages, doctorResponse]);
      
      // Update status of user's message to 'read'
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        )
      );
    }, 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen -mt-16">
        <div className="w-12 h-12 border-t-4 border-aies-primary border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
        <h2 className="text-xl font-semibold">Dokter tidak ditemukan</h2>
        <p className="text-gray-500 mt-2">Dokter dengan ID {doctorId} tidak dapat ditemukan</p>
        <button 
          onClick={() => router.push('/chat')}
          className="mt-4 px-4 py-2 bg-aies-primary text-white rounded-lg"
        >
          Kembali ke Daftar Dokter
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Chat Header */}
      <div className="bg-white rounded-xl shadow-sm p-3 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => router.back()}
            className="mr-2 p-1 text-gray-500 hover:text-aies-primary"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-white ${
              doctor.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
          </div>
          
          <div className="ml-2">
            <div className="font-medium text-gray-800">{doctor.name}</div>
            <div className="text-xs text-gray-500">
              {doctor.specialization} · {doctor.status === 'online' ? 'Online' : `Last seen ${doctor.lastSeen}`}
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <button className="p-2 text-gray-500 hover:text-aies-primary">
            <Phone className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-aies-primary">
            <Video className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-aies-primary">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-grow bg-white rounded-xl shadow-sm p-4 mb-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'paramedic' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-xl p-3 ${
                  message.sender === 'paramedic'
                    ? 'bg-aies-primary text-white rounded-tr-none'
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                {/* Handle attachment - vital signs */}
                {message.attachment?.type === 'vital-signs' && (
                  <div className="mb-2 bg-white bg-opacity-10 p-2 rounded-lg">
                    <div className="text-xs font-medium mb-1">Tanda Vital Pasien</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <Heart className={`h-3 w-3 mr-1 ${message.sender === 'paramedic' ? 'text-white' : 'text-red-500'}`} />
                        <span className="text-xs">{message.attachment.data.heartRate}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs">{message.attachment.data.bloodPressure}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs">{message.attachment.data.temperature}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs">{message.attachment.data.spo2}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <p className="text-sm">{message.text}</p>
                
                <div className="flex items-center justify-end mt-1">
                  <p
                    className={`text-xs mr-1 ${
                      message.sender === 'paramedic' ? 'text-aies-light' : 'text-gray-500'
                    }`}
                  >
                    {message.time}
                  </p>
                  
                  {message.sender === 'paramedic' && message.status && (
                    <span className="text-xs text-aies-light">
                      {message.status === 'sent' && '✓'}
                      {message.status === 'delivered' && '✓✓'}
                      {message.status === 'read' && '✓✓'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
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