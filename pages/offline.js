import Head from 'next/head';
import { WifiOff, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function OfflinePage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <Head>
        <title>Offline - SampattiNaya</title>
        <meta name="description" content="Anda sedang offline. Periksa koneksi internet Anda." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <WifiOff className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Anda Sedang Offline</h1>
              <p className="text-muted-foreground">
                Koneksi internet tidak tersedia. Periksa koneksi Anda dan coba lagi.
              </p>
            </div>

            <div className="space-y-4">
              <Button onClick={handleRefresh} className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Coba Lagi
              </Button>
              
              <Link href="/" passHref>
                <Button variant="outline" className="w-full">
                  <Home className="h-4 w-4 mr-2" />
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Mode Demo:</strong> Karena ini adalah aplikasi frontend-only, 
                beberapa fitur mungkin terbatas saat offline. Data tersimpan secara lokal 
                di browser Anda.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

