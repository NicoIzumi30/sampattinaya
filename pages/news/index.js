import Head from 'next/head';

export default function NewsPage() {
  return (
    <>
      <Head>
        <title>Berita - sampattinaya</title>
        <meta name="description" content="Berita dan artikel terbaru tentang literasi finansial" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className="min-h-screen bg-sampattinaya-light-bg dark:bg-sampattinaya-dark-bg text-sampattinaya-light-text dark:text-sampattinaya-dark-text">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">
              📰 <span className="text-sampattinaya-accent">News</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Berita dan artikel terbaru tentang literasi finansial
            </p>
            <div className="sampattinaya-gradient-bg rounded-lg p-8 max-w-md mx-auto">
              <p className="text-sampattinaya-accent font-semibold">
                🚧 Under Development
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
