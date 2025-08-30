import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Halaman Tidak Ditemukan - sampattinaya</title>
        <meta name="description" content="Halaman yang Anda cari tidak ditemukan" />
      </Head>
      
      <main className="min-h-screen bg-sampattinaya-light-bg dark:bg-sampattinaya-dark-bg text-sampattinaya-light-text dark:text-sampattinaya-dark-text flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-sampattinaya-accent mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Halaman Tidak Ditemukan</h2>
          <p className="text-muted-foreground mb-8">
            Halaman yang Anda cari tidak ada atau telah dipindahkan.
          </p>
          <Link href="/" className="inline-block bg-sampattinaya-accent text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    </>
  );
}
