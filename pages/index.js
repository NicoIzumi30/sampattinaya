import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import ImpactMetrics from '@/components/sections/ImpactMetrics';
import About from '@/components/sections/About';
import PreviewVideo from '@/components/sections/PreviewVideo';
import Features from '@/components/sections/Features';
import ProblemsAndSolutions from '@/components/sections/ProblemsAndSolutions';
import Testimonials from '@/components/sections/Testimonials';
import News from '@/components/sections/News';
import CTA from '@/components/sections/CTA';
import MainLayout from '@/components/layout/MainLayout';
import {
  Menu,
  X,
  ChevronDown,
  Play,
  MessageCircle,
  BookOpen,
  Brain,
  Calculator,
  Target,
  Trophy,
  Shield,
  TrendingUp,
  Users,
  Clock,
  Star,
  Instagram,
  Github,
  Moon,
  Sun,
  Globe
} from 'lucide-react';

export default function HomePage() {
  const [language, setLanguage] = useState('id');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  // Content translations
  const content = {
    id: {
      // Navigation
      nav: {
        links: ['Home', 'Tentang', 'Fitur',  'Peringkat', 'News'],
        cta: 'Coba Sekarang'
      },
      // Hero section
      hero: {
        kicker: 'Platform Literasi Finansial',
        headline: 'Satu Platform Ribuan Peluang',
        subcopy: 'Apakah Anda seorang pelajar, pekerja muda, orang tua, atau pelaku usaha kecil? SampattiNaya membantu memahami dasar finansial, menyusun rencana yang jelas, dan mempraktikkan lewat simulasi interaktif.',
        ctas: ['Mulai Belajar', 'Lihat Peringkat'],
      },
      // Impact metrics
      impact: {
        stats: [
          { value: '1.200+', label: 'orang telah mencoba modul pembelajaran' },
          { value: '73%', label: 'berhasil menyisihkan dana darurat pertama dalam 1 bulan' },
          { value: '30 detik', label: 'rata-rata waktu cek kesehatan finansial' }
        ]
      },
      // Other sections...
      sponsors: {
        title: 'Dipercaya oleh Komunitas & Mitra',
        lead: 'Dipercaya oleh berbagai institusi dan komunitas'
      },
      about: {
        title: 'Kenapa SampattiNaya Hadir?',
        body: 'SampattiNaya lahir dari satu kenyataan: banyak orang ingin mengatur uang, tetapi bingung harus mulai dari mana. Visi kami: platform yang ramah bagi pemula dan relevan bagi yang berpengalaman. Dengan pendekatan interaktif, desain sederhana, dan bantuan teknologi pintar, SampattiNaya membantu Anda mengambil langkah kecil yang konsisten menuju kondisi finansial lebih sehat.'
      },
      preview: {
        title: 'Lihat Cara Kerjanya dalam 1 Menit',
        body: 'Daripada hanya membaca teori, lihat bagaimana SampattiNaya bekerja: dashboard intuitif, simulasi interaktif, dan alur belajar yang jelas.'
      },
      features: {
        title: 'Fitur Utama SampattiNaya',
        lead: 'Kami merancang fitur untuk memudahkan belajar, membantu keputusan, dan menjaga motivasi.',
        items: [
          { title: 'Materi Pembelajaran Ringkas', desc: 'Belajar dasar keuangan dengan bahasa sederhana dan contoh nyata.' },
          { title: 'AI Mentor Personal', desc: 'Asisten virtual yang memberi rekomendasi sesuai progress Anda.' },
          { title: 'Simulasi Budget', desc: 'Uji strategi pengeluaran dan lihat dampaknya secara langsung.' },
          { title: 'Goal Planner', desc: 'Tetapkan target dan hitung tabungan per bulan.' },
          { title: 'Kuis & Peringkat', desc: 'Uji pemahaman dan lihat posisi Anda di leaderboard.' },
          { title: 'Anti-Scam Checker', desc: 'Pelajari tanda investasi berisiko dan langkah aman.' }
        ]
      },
      problems: {
        title: 'Masalah Umum, Solusi Praktis',
        lead: 'Kami mengatasi hambatan yang paling sering ditemui.',
        problems: ['Uang bulanan habis sebelum waktunya', 'Sulit menyisihkan dana darurat', 'Tidak tahu cara menilai investasi aman', 'Terjebak cicilan konsumtif'],
        solutions: ['Simulasi sederhana untuk mengontrol pengeluaran', 'Rencana tabungan sesuai kemampuan', 'Edukasi cek legalitas investasi', 'Alat menghitung risiko cicilan & BNPL']
      },
      testimonials: {
        title: 'Cerita Pengguna Kami',
        lead: 'Pengalaman nyata dari berbagai latar belakang.',
        items: [
          { name: 'A.', role: 'Pelajar', quote: 'Simulasinya membuka mataku soal kebocoran pengeluaran.' },
          { name: 'R.', role: 'Pekerja', quote: 'AI Mentornya membantu menyusun rencana 30 hari yang realistis.' },
          { name: 'S.', role: 'Orang Tua', quote: 'Bagian keamanan digitalnya sangat bermanfaat.' }
        ]
      },
      news: {
        title: 'Berita & Artikel Terbaru',
        lead: 'Ikuti update literasi finansial dan kabar terbaru dari SampattiNaya.'
      },
      faq: {
        title: 'Pertanyaan yang Sering Ditanyakan',
        lead: 'Masih ada yang belum jelas? Berikut jawabannya.',
        items: [
          { q: 'Apakah aplikasi ini gratis?', a: 'Ya, fitur dasar dapat digunakan gratis.' },
          { q: 'Apakah saya perlu login?', a: 'Ya, login diperlukan untuk menyimpan progress dan skor.' },
          { q: 'Data saya disimpan di mana?', a: 'Data dasar disimpan aman di server, sementara sebagian progres juga tersimpan di perangkat Anda.' },
          { q: 'Apakah ada fitur AI?', a: 'Ya, AI hadir sebagai asisten virtual di landing dan mentor personal ringan di dashboard.' },
          { q: 'Apakah cocok untuk pemula?', a: 'Sangat cocok. Materi ringkas, contoh nyata, dan simulasi interaktif.' }
        ]
      },
      footer: {
        note: 'SampattiNaya adalah proyek edukasi non-komersial untuk meningkatkan literasi keuangan masyarakat.',
        columns: {
          'Produk': ['Fitur', 'Modul', 'Dashboard'],
          'Resource': ['FAQ', 'Berita', 'Kebijakan'],
          'Tentang': ['Visi & Misi', 'Kontak'],
          'Social': ['Instagram', 'GitHub']
        }
      },
      chat: {
        tooltip: 'Asisten Virtual',
        headline: 'Asisten Virtual SampattiNaya',
        placeholder: 'Tanyakan apa saja tentang aplikasi ini...'
      }
    }
  };



  const currentContent = content[language] || content.id;
  const featureIcons = [BookOpen, Brain, Calculator, Target, Trophy, Shield];

  return (
    <MainLayout>
      <Head>
        <title>SampattiNaya — Belajar Keuangan Lebih Mudah</title>
        <meta name="description" content="Platform literasi finansial dengan modul ringkas, simulasi interaktif, dan pengalaman modern ala Supabase." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


        {/* Hero Section */}
        <section className="py-16 lg:pt-40 pt-32 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                  {currentContent.hero.headline}
                </h1>

                <p className="text-lg lg:text-xl text-gray-400 max-w-2xl">
                  {currentContent.hero.subcopy}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/auth/register">
                  <Button size="lg" className="bg-[#15C26B] hover:bg-[#10A558] text-white w-full sm:w-auto">
                    {currentContent.hero.ctas[0]}
                  </Button>
                </a>
                <a href="/leaderboard">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-[#404040] text-white hover:border-[#15C26B]">
                    {currentContent.hero.ctas[1]}
                  </Button>
                </a>
              </div>

            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-fit">
                <div className="absolute inset-0 sampattinaya-gradient-bg rounded-full blur-3xl scale-110"></div>
                <img
                  src="images/mockup.png"
                  alt="sampattinaya dashboard"
                  className="relative z-10 w-xs md:w-md lg:w-lg mx-auto"
                />
              </div>
            </div>
          </div>
          <div className="max-w-md md:max-w-lg lg:max-w-3xl mx-auto mt-16">
            <div className="relative w-full mx-auto max-w-4xl opacity-90 dark:opacity-70 overflow-hidden before:content[''] before:absolute before:inset-0 before:w-full before:bg-[linear-gradient(to_right,hsl(var(--background-default))_0%,transparent_10%,transparent_90%,hsl(var(--background-default))_100%)] before:z-10 flex flex-nowrap px-5 lg:px-12 justify-center gap-4 lg:gap-8">
              {/* First marquee group */}
              <div className="gap-4 lg:gap-8 flex flex-nowrap w-fit animate-[marquee_90000ms_linear_both_infinite] will-change-transform motion-reduce:animate-none motion-reduce:will-change-none">
                <div className="h-12 lg:h-12 w-max !inline-block">
                  <img src="https://supabase.com/images/logos/publicity/mozilla.svg" alt="mozilla" className="h-12 lg:h-12 !min-h-12 lg:!min-h-12 w-auto block" draggable="false" />
                </div>
                <div className="h-12 lg:h-12 w-max !inline-block">
                  <img src="https://supabase.com/images/logos/publicity/github.svg" alt="github" className="h-12 lg:h-12 !min-h-12 lg:!min-h-12 w-auto block" draggable="false" />
                </div>
                <div className="h-12 lg:h-12 w-max !inline-block">
                  <img src="https://supabase.com/images/logos/publicity/1password.svg" alt="1password" className="h-12 lg:h-12 !min-h-12 lg:!min-h-12 w-auto block" draggable="false" />
                </div>
                <div className="h-12 lg:h-12 w-max !inline-block">
                  <img src="https://supabase.com/images/logos/publicity/pwc.svg" alt="pwc" className="h-12 lg:h-12 !min-h-12 lg:!min-h-12 w-auto block" draggable="false" />
                </div>
                <div className="h-12 lg:h-12 w-max !inline-block">
                  <img src="https://supabase.com/images/logos/publicity/pika.svg" alt="pika" className="h-12 lg:h-12 !min-h-12 lg:!min-h-12 w-auto block" draggable="false" />
                </div>
                <div className="h-12 lg:h-12 w-max !inline-block">
                  <img src="https://supabase.com/images/logos/publicity/humata.svg" alt="humata" className="h-12 lg:h-12 !min-h-12 lg:!min-h-12 w-auto block" draggable="false" />
                </div>
                <div className="h-12 lg:h-12 w-max !inline-block">
                  <img src="https://supabase.com/images/logos/publicity/udio.svg" alt="udio" className="h-12 lg:h-12 !min-h-12 lg:!min-h-12 w-auto block" draggable="false" />
                </div>
                <div className="h-12 lg:h-12 w-max !inline-block">
                  <img src="https://supabase.com/images/logos/publicity/langchain.svg" alt="langchain" className="h-12 lg:h-12 !min-h-12 lg:!min-h-12 w-auto block" draggable="false" />
                </div>
                <div className="h-12 lg:h-12 w-max !inline-block">
                  <img src="https://supabase.com/images/logos/publicity/resend.svg" alt="resend" className="h-12 lg:h-12 !min-h-12 lg:!min-h-12 w-auto block" draggable="false" />
                </div>
              </div>
              {/* Second marquee group (duplicate for seamless loop) */}
              <div className="gap-4 lg:gap-8 flex flex-nowrap w-fit animate-[marquee_90000ms_linear_both_infinite] will-change-transform motion-reduce:animate-none motion-reduce:will-change-none">
                <div className="h-12 lg:h-12 w-max !inline-block">
                  <img src="https://supabase.com/images/logos/publicity/mozilla.svg" alt="mozilla" className="h-12 lg:h-12 !min-h-12 lg:!min-h-12 w-auto block" draggable="false" />
                </div>
                <div className="h-12 lg:h-12 w-max !inline-block">
                  <img src="https://supabase.com/images/logos/publicity/github.svg" alt="github" className="h-12 lg:h-12 !min-h-12 lg:!min-h-12 w-auto block" draggable="false" />
                </div>
                <div className="h-12 lg:h-12 w-max !inline-block">
                  <img src="https://supabase.com/images/logos/publicity/1password.svg" alt="1password" className="h-12 lg:h-12 !min-h-12 lg:!min-h-12 w-auto block" draggable="false" />
                </div>
                <div className="h-12 lg:h-12 w-max !inline-block">
                  <img src="https://supabase.com/images/logos/publicity/pwc.svg" alt="pwc" className="h-12 lg:h-12 !min-h-12 lg:!min-h-12 w-auto block" draggable="false" />
                </div>
                <div className="h-12 lg:h-12 w-max !inline-block">
                  <img src="https://supabase.com/images/logos/publicity/pika.svg" alt="pika" className="h-12 lg:h-12 !min-h-12 lg:!min-h-12 w-auto block" draggable="false" />
                </div>
                <div className="h-12 lg:h-12 w-max !inline-block">
                  <img src="https://supabase.com/images/logos/publicity/humata.svg" alt="humata" className="h-12 lg:h-12 !min-h-12 lg:!min-h-12 w-auto block" draggable="false" />
                </div>
                <div className="h-12 lg:h-12 w-max !inline-block">
                  <img src="https://supabase.com/images/logos/publicity/udio.svg" alt="udio" className="h-12 lg:h-12 !min-h-12 lg:!min-h-12 w-auto block" draggable="false" />
                </div>
                <div className="h-12 lg:h-12 w-max !inline-block">
                  <img src="https://supabase.com/images/logos/publicity/langchain.svg" alt="langchain" className="h-12 lg:h-12 !min-h-12 lg:!min-h-12 w-auto block" draggable="false" />
                </div>
                <div className="h-12 lg:h-12 w-max !inline-block">
                  <img src="https://supabase.com/images/logos/publicity/resend.svg" alt="resend" className="h-12 lg:h-12 !min-h-12 lg:!min-h-12 w-auto block" draggable="false" />
                </div>
              </div>
            </div>
            <p className="text-muted-foreground mb-8 text-center mt-10">
              {currentContent.sponsors.lead}
            </p>
          </div>
        </section>
           {/* Impact Metrics */}

        <Separator />
        <ImpactMetrics language={language} />


     

        {/* Sponsors */}


        <Separator />

        {/* About */}
        <About language={language} />

        <Separator />

        {/* Preview Video */}
        <PreviewVideo language={language} />

        <Separator />

        {/* Features */}
        <Features language={language} />

        <Separator />

        {/* Problems & Solutions */}
        <ProblemsAndSolutions language={language} />

        <Separator />

        {/* Testimonials */}
        <Testimonials language={language} />

        <Separator />

        {/* News */}
        <News language={language} />

        <Separator />

        {/* FAQ */}
        <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {currentContent.faq.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {currentContent.faq.lead}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {currentContent.faq.items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <Separator />

        {/* CTA */}
        <CTA language={language} />

        <Separator />

        {/* Floating Chat */}
        <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-sampattinaya-accent hover:opacity-90 text-white sampattinaya-shadow"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{currentContent.chat.headline}</DialogTitle>
              <DialogDescription>
                {currentContent.chat.tooltip}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <ScrollArea className="h-[200px] w-full rounded border p-4">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-sampattinaya-dark-muted w-fit">
                    <p className="text-sm">Halo! Ada yang bisa saya bantu tentang sampattinaya?</p>
                  </div>
                </div>
              </ScrollArea>
              <div className="flex space-x-2">
                <Textarea
                  placeholder={currentContent.chat.placeholder}
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="min-h-[60px]"
                />
                <Button className="bg-sampattinaya-accent hover:opacity-90 text-white">
                  Kirim
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
    </MainLayout>
  );
}
