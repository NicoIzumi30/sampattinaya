import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Trophy, Crown, Medal, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import MainLayout from '@/components/layout/MainLayout';

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('id');

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/data/leaderboard.json');
        const data = await response.json();
        
        // Sort by score descending, then by updatedAt ascending (earlier is higher)
        const sorted = data.sort((a, b) => {
          if (b.score !== a.score) {
            return b.score - a.score;
          }
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        });
        
        setLeaderboardData(sorted);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <Trophy className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getRankBadge = (rank) => {
    if (rank <= 3) {
      const colors = {
        1: "bg-yellow-500",
        2: "bg-gray-400", 
        3: "bg-amber-600"
      };
      return (
        <Badge className={`${colors[rank]} text-white border-0`}>
          #{rank}
        </Badge>
      );
    }
    return <span className="font-semibold text-muted-foreground">#{rank}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <MainLayout language={language} onLanguageChange={handleLanguageChange}>
        <div className="min-h-screen bg-[#121212] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#15C26B] mx-auto mb-4"></div>
            <p className="text-white">Memuat leaderboard...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout language={language} onLanguageChange={handleLanguageChange}>
      <Head>
        <title>Peringkat - SampattiNaya</title>
        <meta name="description" content="Lihat peringkat Top 10 pengguna SampattiNaya berdasarkan skor pembelajaran" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen bg-[#121212]">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="h-8 w-8 text-[#15C26B]" />
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Leaderboard
              </h1>
            </div>
            <p className="text-lg text-gray-400">
              Top 10 Pengguna dengan Skor Tertinggi
            </p>
          </div>

          {/* Top 3 Highlight - Mobile Cards */}
          <div className="md:hidden mb-8">
            <div className="grid gap-4">
              {leaderboardData.slice(0, 3).map((user) => (
                <Card key={user.userId} className="relative overflow-hidden bg-[#171717] border-[#404040]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {getRankIcon(user.rank)}
                      </div>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getRankBadge(user.rank)}
                          <h3 className="font-semibold truncate text-white">{user.name}</h3>
                        </div>
                        <p className="text-sm text-gray-400">
                          {user.score.toLocaleString()} poin
                        </p>
                        <p className="text-xs text-gray-500">
                          Terakhir aktif: {formatDate(user.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <Card className="bg-[#171717] border-[#404040]">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#404040]">
                      <TableHead className="w-16 text-gray-400">Rank</TableHead>
                      <TableHead className="text-gray-400">User</TableHead>
                      <TableHead className="text-center text-gray-400">Score</TableHead>
                      <TableHead className="text-center text-gray-400">Last Active</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboardData.map((user) => (
                      <TableRow key={user.userId} className="border-[#404040] hover:bg-[#404040]/20">
                        <TableCell>
                          <div className="flex items-center justify-center">
                            {getRankIcon(user.rank)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatarUrl} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                {getRankBadge(user.rank)}
                                <span className="font-semibold text-white">{user.name}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-white">
                          {user.score.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-center text-gray-400">
                          {formatDate(user.updatedAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Table for ranks 4-10 */}
          <div className="md:hidden">
            <h3 className="text-lg font-semibold mb-4 text-center text-white">Peringkat 4-10</h3>
            <div className="space-y-2">
              {leaderboardData.slice(3).map((user) => (
                <Card key={user.userId} className="bg-[#171717] border-[#404040]">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {getRankIcon(user.rank)}
                          <span className="font-semibold text-gray-400">#{user.rank}</span>
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatarUrl} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-white">{user.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">{user.score.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">
                          {formatDate(user.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
