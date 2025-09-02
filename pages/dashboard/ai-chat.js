import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { MessageCircle, Send, Bot, User, Plus, Menu, Trash2, Edit, MoreVertical, History, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardNav from '@/components/common/DashboardNav';
import { AIChatSkeleton } from '@/components/common/SkeletonLoading';

export default function AiChatPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem('sampattinaya_user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }
    
    // Simulate loading delay
    setTimeout(() => {
      setUser(JSON.parse(userData));
      
      // Load chat history from localStorage
      const savedHistory = localStorage.getItem('sampattinaya_chat_history');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      
      // Convert string timestamps back to Date objects
      const restoredHistory = parsedHistory.map(chat => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
        messages: chat.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
      
      setChatHistory(restoredHistory);
      
      // Load the most recent chat or create new one
      if (restoredHistory.length > 0) {
        const mostRecentChat = restoredHistory[0];
        setCurrentChatId(mostRecentChat.id);
        setMessages(mostRecentChat.messages);
      } else {
        createNewChat([]);
      }
    } else {
      createNewChat([]);
    }
      
      setIsLoading(false);
    }, 900);
  }, [router]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const createNewChat = (existingHistory = null) => {
    const newChatId = Date.now().toString();
    const welcomeMessage = {
      id: 1,
      text: "Halo! Saya adalah AI Assistant SampattiNaya. Saya siap membantu Anda dengan pertanyaan seputar literasi finansial, perencanaan keuangan, investasi, dan topik keuangan lainnya. Ada yang ingin ditanyakan?",
      sender: 'ai',
      timestamp: new Date()
    };

    const newChat = {
      id: newChatId,
      title: 'Chat Baru',
      messages: [welcomeMessage],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setCurrentChatId(newChatId);
    setMessages([welcomeMessage]);
    
    const currentHistory = existingHistory || chatHistory;
    const updatedHistory = [newChat, ...currentHistory];
    setChatHistory(updatedHistory);
    saveChatHistory(updatedHistory);
    
    return newChat;
  };

  const saveChatHistory = (history) => {
    localStorage.setItem('sampattinaya_chat_history', JSON.stringify(history));
  };

  const updateCurrentChat = (newMessages) => {
    if (!currentChatId) return;

    const updatedHistory = chatHistory.map(chat => {
      if (chat.id === currentChatId) {
        // Auto-generate title from first user message
        let title = chat.title;
        if (title === 'Chat Baru' && newMessages.length > 1) {
          const firstUserMessage = newMessages.find(msg => msg.sender === 'user');
          if (firstUserMessage) {
            title = firstUserMessage.text.slice(0, 30) + (firstUserMessage.text.length > 30 ? '...' : '');
          }
        }

        return {
          ...chat,
          title,
          messages: newMessages,
          updatedAt: new Date()
        };
      }
      return chat;
    });

    setChatHistory(updatedHistory);
    saveChatHistory(updatedHistory);
  };

  const selectChat = (chatId) => {
    const selectedChat = chatHistory.find(chat => chat.id === chatId);
    if (selectedChat) {
      setCurrentChatId(chatId);
      setMessages(selectedChat.messages);
      setShowHistoryModal(false);
    }
  };

  const deleteChat = (chatId) => {
    const updatedHistory = chatHistory.filter(chat => chat.id !== chatId);
    setChatHistory(updatedHistory);
    saveChatHistory(updatedHistory);

    if (chatId === currentChatId) {
      if (updatedHistory.length > 0) {
        selectChat(updatedHistory[0].id);
      } else {
        createNewChat();
      }
    }
  };

  const startEditingTitle = (chatId, currentTitle) => {
    setEditingChatId(chatId);
    setEditingTitle(currentTitle);
  };

  const saveEditedTitle = () => {
    if (!editingChatId || !editingTitle.trim()) return;

    const updatedHistory = chatHistory.map(chat => {
      if (chat.id === editingChatId) {
        return { ...chat, title: editingTitle.trim() };
      }
      return chat;
    });

    setChatHistory(updatedHistory);
    saveChatHistory(updatedHistory);
    setEditingChatId(null);
    setEditingTitle('');
  };

  const cancelEditingTitle = () => {
    setEditingChatId(null);
    setEditingTitle('');
  };

  const generateAIResponse = (userMessage) => {
    const responses = {
      'anggaran': "Untuk membuat anggaran yang efektif, Anda bisa menggunakan aturan 50/30/20: 50% untuk kebutuhan pokok, 30% untuk keinginan, dan 20% untuk tabungan. Apakah Anda ingin saya jelaskan lebih detail tentang masing-masing kategori?",
      'investasi': "Investasi yang cocok untuk pemula antara lain reksa dana, deposito, dan obligasi pemerintah. Untuk jangka panjang, Anda juga bisa mempertimbangkan saham blue chip. Berapa lama jangka waktu investasi yang Anda rencanakan?",
      'dana darurat': "Dana darurat sebaiknya 3-6 kali pengeluaran bulanan Anda. Simpan di instrumen yang mudah dicairkan seperti tabungan atau deposito berjangka pendek. Apakah Anda sudah memiliki dana darurat?",
      'tabungan': "Tips menabung yang efektif: 1) Buat tujuan yang spesifik, 2) Otomatisasi transfer ke rekening tabungan, 3) Kurangi pengeluaran tidak perlu, 4) Cari sumber penghasilan tambahan. Mau saya bantu buat rencana menabung?",
      'utang': "Untuk mengelola utang, prioritaskan melunasi utang dengan bunga tertinggi terlebih dahulu. Buat daftar semua utang, buat anggaran khusus untuk pelunasan, dan hindari menambah utang baru. Apakah Anda punya utang yang ingin dibahas strateginya?",
      'default': "Terima kasih atas pertanyaannya! Sebagai demo AI Assistant, saya dapat membantu dengan topik dasar seputar literasi finansial. Coba tanyakan tentang: anggaran, investasi, dana darurat, tabungan, atau pengelolaan utang."
    };

    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return responses.default;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage('');
    setIsTyping(true);

    // Update chat history with user message
    updateCurrentChat(newMessages);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: generateAIResponse(userMessage.text),
        sender: 'ai',
        timestamp: new Date()
      };

      const finalMessages = [...newMessages, aiResponse];
      setMessages(finalMessages);
      setIsTyping(false);
      
      // Update chat history with AI response
      updateCurrentChat(finalMessages);
    }, 1000 + Math.random() * 2000); // Random delay 1-3 seconds
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    // Handle both Date objects and string timestamps
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return new Date().toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
    
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <main className="md:ml-64 pt-16 pb-20 md:pb-0" style={{ height: 'calc(100vh - 4rem)', minHeight: 'calc(100vh - 4rem)' }}>
          <div className="h-full flex flex-col p-4">
            <AIChatSkeleton />
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>AI Chat - SampattiNaya</title>
        <meta name="description" content="Chat dengan AI Assistant untuk konsultasi literasi finansial" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-zinc-900 text-white">
        <DashboardNav />
        
        {/* Main Chat Container */}
        <div className="md:ml-64 flex flex-col overflow-hidden  pb-20 md:pb-0" style={{ height: 'calc(100vh - 4rem)', minHeight: 'calc(100vh - 4rem)' }}>
          
          {messages.length === 0 ? (
            /* Empty State - Welcome Screen */
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <div className="text-center max-w-2xl mx-auto space-y-8">
                
                {/* Header with Actions */}
                <div className="flex items-center justify-between mb-8">
                  <div></div> {/* Spacer */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowHistoryModal(true)}
                    className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                  >
                    <History className="h-5 w-5" />
                  </Button>
                </div>

                {/* Welcome Title */}
                <h1 className="text-3xl md:text-4xl font-medium text-center">
                  Where should we begin?
                </h1>

                {/* Input Area */}
                <div className="relative max-w-2xl mx-auto">
                  <div className="flex items-center bg-zinc-800 rounded-2xl border border-zinc-700 p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 text-zinc-400 hover:text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <textarea
                      ref={textareaRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask anything"
                      className="flex-1 bg-transparent border-0 px-4 py-3 resize-none focus:outline-none text-white placeholder-zinc-400 max-h-32"
                      rows={1}
                      disabled={isTyping}
                      style={{
                        height: 'auto',
                        minHeight: '44px'
                      }}
                      onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
                      }}
                    />
                    <div className="flex items-center gap-2 mr-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-zinc-400 hover:text-white"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-zinc-400 hover:text-white"
                      >
                        <Menu className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Quick Start Suggestions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl mx-auto">
                  {[
                    'Bagaimana cara membuat anggaran bulanan?',
                    'Tips investasi untuk pemula',
                    'Berapa dana darurat yang ideal?',
                    'Cara mengelola utang dengan baik'
                  ].map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white text-sm p-3 h-auto text-left justify-start"
                      onClick={() => {
                        setInputMessage(suggestion);
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Chat Mode */
            <>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Bot className="h-6 w-6 text-green-500" />
                    <div>
                      <h1 className="font-semibold">AI Financial Assistant</h1>
                      <p className="text-xs text-zinc-400">SampattiNaya</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => createNewChat()}
                    className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowHistoryModal(true)}
                    className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                  >
                    <History className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto pb-4">
                <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-4 ${
                        message.sender === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-green-600 text-white'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>
                      
                      <div className={`flex-1 space-y-2 ${
                        message.sender === 'user' ? 'text-right' : ''
                      }`}>
                        <div className={`${
                          message.sender === 'user' ? 'text-zinc-400' : 'font-semibold text-white'
                        } text-sm`}>
                          {message.sender === 'user' ? 'Anda' : 'AI Assistant'}
                        </div>
                        <div className={`prose prose-sm max-w-none ${
                          message.sender === 'user' 
                            ? 'bg-blue-600 text-white p-3 rounded-lg inline-block max-w-[80%] ml-auto' 
                            : 'text-zinc-200'
                        }`}>
                          {message.text}
                        </div>
                        <div className="text-xs text-zinc-500">
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="font-semibold text-sm text-white">AI Assistant</div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Container */}
              <div className="border-t border-zinc-800 bg-zinc-900 flex-shrink-0">
                <div className="max-w-4xl mx-auto p-4">
                  <div className="relative">
                    <div className="flex items-center bg-zinc-800 rounded-2xl border border-zinc-700 p-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 text-zinc-400 hover:text-white"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <textarea
                        ref={textareaRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Message AI Assistant..."
                        className="flex-1 bg-transparent border-0 px-4 py-3 resize-none focus:outline-none text-white placeholder-zinc-400 max-h-32"
                        rows={1}
                        disabled={isTyping}
                        style={{
                          height: 'auto',
                          minHeight: '44px'
                        }}
                        onInput={(e) => {
                          e.target.style.height = 'auto';
                          e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
                        }}
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isTyping}
                        size="sm"
                        className="mr-2 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-600 disabled:text-zinc-400"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div> {/* Close flex container */}

        {/* History Modal */}
        {showHistoryModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-700">
                <h2 className="text-lg font-semibold text-white">Chat History</h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => createNewChat()}
                    className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowHistoryModal(false)}
                    className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Chat History List */}
              <div className="flex-1 overflow-y-auto p-4">
                {chatHistory.length === 0 ? (
                  <div className="text-center text-zinc-400 py-8">
                    <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Belum ada chat history</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {chatHistory.map((chat) => (
                      <div
                        key={chat.id}
                        className={`group relative p-3 rounded-lg cursor-pointer transition-colors hover:bg-zinc-800 ${
                          currentChatId === chat.id ? 'bg-zinc-800' : ''
                        }`}
                        onClick={() => selectChat(chat.id)}
                      >
                        {editingChatId === chat.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              value={editingTitle}
                              onChange={(e) => setEditingTitle(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') saveEditedTitle();
                                if (e.key === 'Escape') cancelEditingTitle();
                              }}
                              className="text-sm h-6 p-1 bg-zinc-700 border-zinc-600 text-white"
                              autoFocus
                            />
                            <Button size="sm" variant="ghost" onClick={saveEditedTitle} className="text-green-500">
                              ✓
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="text-sm font-medium truncate pr-8 text-white">
                              {chat.title}
                            </div>
                            <div className="text-xs text-zinc-400 mt-1">
                              {new Date(chat.updatedAt).toLocaleDateString('id-ID')}
                            </div>
                            
                            {/* Chat Actions */}
                            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0 text-zinc-400 hover:text-white"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  startEditingTitle(chat.id, chat.title);
                                }}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0 text-zinc-400 hover:text-red-400"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (confirm('Hapus chat ini?')) {
                                    deleteChat(chat.id);
                                  }
                                }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

