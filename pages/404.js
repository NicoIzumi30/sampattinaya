import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Halaman Tidak Ditemukan - SampattiNaya</title>
        <meta name="description" content="Halaman yang Anda cari tidak ditemukan" />
      </Head>
      
      <main className="min-h-screen bg-sampattinaya-dark-bg text-sampattinaya-dark-text flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">404</div>
          <h1 className="text-3xl font-bold mb-4">Halaman Tidak Ditemukan</h1>
          <p className="text-sampattinaya-light-text mb-8 max-w-md mx-auto">
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-sampattinaya-accent text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    </>
  );
}