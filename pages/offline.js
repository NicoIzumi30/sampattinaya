import Head from 'next/head';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <>
      <Head>
        <title>Offline - SampattiNaya</title>
        <meta name="description" content="Anda sedang offline" />
      </Head>
      
      <main className="min-h-screen bg-sampattinaya-dark-bg text-sampattinaya-dark-text flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">📶</div>
          <h1 className="text-3xl font-bold mb-4">Anda Sedang Offline</h1>
          <p className="text-sampattinaya-light-text mb-8 max-w-md mx-auto">
            Untuk menggunakan SampattiNaya, Anda perlu terhubung ke internet. Silakan periksa koneksi Anda dan coba lagi.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-sampattinaya-accent text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Coba Lagi
          </Link>
        </div>
      </main>
    </>
  );
}