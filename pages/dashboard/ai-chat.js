import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { MessageCircle, Send, Bot, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardNav from '@/components/common/DashboardNav';

export default function AiChatPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem('sampattinaya_demo_user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }
    setUser(JSON.parse(userData));

    // Initialize with welcome message
    setMessages([
      {
        id: 1,
        text: "Halo! Saya adalah AI Assistant SampattiNaya. Saya siap membantu Anda dengan pertanyaan seputar literasi finansial, perencanaan keuangan, investasi, dan topik keuangan lainnya. Ada yang ingin ditanyakan?",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  }, [router]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: generateAIResponse(userMessage.text),
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay 1-3 seconds
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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

      <div className="min-h-screen bg-background">
        <DashboardNav />
        
        <main className="md:ml-64 pt-16 pb-20 md:pb-8">
          <div className="container mx-auto px-4 py-6 max-w-4xl h-[calc(100vh-8rem)]">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                AI Financial Assistant
              </h1>
              <p className="text-muted-foreground">
                Konsultasi gratis dengan AI untuk pertanyaan literasi finansial Anda
              </p>
            </div>

            <Card className="h-[calc(100vh-16rem)] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat Session
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${
                        message.sender === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>
                      
                      <div className={`flex flex-col max-w-[70%] ${
                        message.sender === 'user' ? 'items-end' : 'items-start'
                      }`}>
                        <div className={`rounded-lg px-4 py-2 text-sm ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}>
                          {message.text}
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="bg-muted rounded-lg px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Container */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ketik pertanyaan Anda tentang keuangan..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      size="icon"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                    <p className="text-xs text-yellow-800 dark:text-yellow-200">
                      <strong>Demo Mode:</strong> Ini adalah simulasi AI Assistant. 
                      Response dibuat berdasarkan kata kunci sederhana untuk demonstrasi.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
