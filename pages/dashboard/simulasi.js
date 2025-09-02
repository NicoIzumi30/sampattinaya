import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Calculator, DollarSign, PieChart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DashboardNav from '@/components/common/DashboardNav';
import { SimulationSkeleton } from '@/components/common/SkeletonLoading';

export default function SimulasiPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [budgetData, setBudgetData] = useState({
    income: '',
    needs: '',
    wants: '',
    savings: ''
  });
  const [results, setResults] = useState(null);


  useEffect(() => {
    const userData = localStorage.getItem('sampattinaya_user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }
    
    // Simulate loading delay
    setTimeout(() => {
      setUser(JSON.parse(userData));
      setIsLoading(false);
    }, 600);
  }, [router]);

  const handleInputChange = (field, value) => {
    setBudgetData(prev => ({ ...prev, [field]: value }));
  };

  const calculateBudget = () => {
    const income = parseFloat(budgetData.income) || 0;
    const needs = parseFloat(budgetData.needs) || 0;
    const wants = parseFloat(budgetData.wants) || 0;
    const savings = parseFloat(budgetData.savings) || 0;

    const total = needs + wants + savings;
    const remaining = income - total;

    const needsPercentage = income > 0 ? (needs / income) * 100 : 0;
    const wantsPercentage = income > 0 ? (wants / income) * 100 : 0;
    const savingsPercentage = income > 0 ? (savings / income) * 100 : 0;

    setResults({
      total,
      remaining,
      percentages: {
        needs: needsPercentage,
        wants: wantsPercentage,
        savings: savingsPercentage
      },
      recommendations: generateRecommendations(needsPercentage, wantsPercentage, savingsPercentage, remaining)
    });
  };

  const generateRecommendations = (needs, wants, savings, remaining) => {
    const recommendations = [];

    if (needs > 60) {
      recommendations.push({
        type: 'warning',
        message: 'Pengeluaran kebutuhan pokok terlalu tinggi (>60%). Coba kurangi pengeluaran yang tidak penting.'
      });
    }

    if (wants > 30) {
      recommendations.push({
        type: 'warning',
        message: 'Pengeluaran keinginan terlalu tinggi (>30%). Pertimbangkan untuk mengurangi pengeluaran hiburan.'
      });
    }

    if (savings < 20) {
      recommendations.push({
        type: 'warning',
        message: 'Tabungan terlalu rendah (<20%). Tingkatkan alokasi untuk tabungan dan investasi.'
      });
    }

    if (remaining < 0) {
      recommendations.push({
        type: 'error',
        message: 'Pengeluaran melebihi pendapatan! Segera revisi anggaran Anda.'
      });
    }

    if (needs <= 50 && wants <= 30 && savings >= 20) {
      recommendations.push({
        type: 'success',
        message: 'Anggaran Anda sudah sangat baik! Pertahankan pola ini.'
      });
    }

    return recommendations;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <main className="md:ml-64 pt-16 pb-20 md:pb-8">
          <div className="container mx-auto px-4 py-6 max-w-6xl">
            <SimulationSkeleton />
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Simulasi Budget - SampattiNaya</title>
        <meta name="description" content="Simulasi perencanaan anggaran keuangan pribadi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-background">
        <DashboardNav />
        
        <main className="md:ml-64 pt-16 pb-20 md:pb-8">
          <div className="container mx-auto px-4 py-6 max-w-6xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Simulasi Budget
              </h1>
              <p className="text-muted-foreground">
                Gunakan kalkulator ini untuk merencanakan anggaran bulanan Anda
              </p>
            </div>

            {/* Input Form */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Input Anggaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="income">Pendapatan Bulanan</Label>
                    <Input
                      id="income"
                      type="number"
                      placeholder="Masukkan pendapatan bulanan"
                      value={budgetData.income}
                      onChange={(e) => handleInputChange('income', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="needs">Kebutuhan Pokok (50%)</Label>
                    <Input
                      id="needs"
                      type="number"
                      placeholder="Makanan, sewa, transportasi"
                      value={budgetData.needs}
                      onChange={(e) => handleInputChange('needs', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Sewa, listrik, air, makanan pokok
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="wants">Keinginan (30%)</Label>
                    <Input
                      id="wants"
                      type="number"
                      placeholder="Hiburan, makan luar, hobi"
                      value={budgetData.wants}
                      onChange={(e) => handleInputChange('wants', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Hiburan, makan di luar, shopping
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="savings">Tabungan & Investasi (20%)</Label>
                    <Input
                      id="savings"
                      type="number"
                      placeholder="Dana darurat, investasi"
                      value={budgetData.savings}
                      onChange={(e) => handleInputChange('savings', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Dana darurat, investasi
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button onClick={calculateBudget} className="px-8">
                    <Calculator className="h-4 w-4 mr-2" />
                    Hitung Anggaran
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {results && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Ringkasan Anggaran
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground">Total Pengeluaran</div>
                      <div className="font-bold">{formatCurrency(results.total)}</div>
                    </div>
                    <div className={`text-center p-3 rounded-lg ${
                      results.remaining >= 0 
                        ? 'bg-green-50 dark:bg-green-900/20' 
                        : 'bg-red-50 dark:bg-red-900/20'
                    }`}>
                      <TrendingUp className={`h-6 w-6 mx-auto mb-2 ${
                        results.remaining >= 0 ? 'text-green-600' : 'text-red-600'
                      }`} />
                      <div className="text-sm text-muted-foreground">Sisa</div>
                      <div className="font-bold">{formatCurrency(results.remaining)}</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Percentages */}
                <Card>
                  <CardHeader>
                    <CardTitle>Persentase Alokasi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Kebutuhan Pokok</span>
                        <span>{results.percentages.needs.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{width: `${Math.min(results.percentages.needs, 100)}%`}}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Keinginan</span>
                        <span>{results.percentages.wants.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full"
                          style={{width: `${Math.min(results.percentages.wants, 100)}%`}}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Tabungan & Investasi</span>
                        <span>{results.percentages.savings.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{width: `${Math.min(results.percentages.savings, 100)}%`}}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Rekomendasi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {results.recommendations.length > 0 ? (
                      results.recommendations.map((rec, index) => (
                        <div 
                          key={index}
                          className={`p-3 rounded-lg text-sm ${
                            rec.type === 'success' 
                              ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800'
                              : rec.type === 'warning'
                              ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800'
                              : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
                          }`}
                        >
                          {rec.message}
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground text-center py-4">
                        Masukkan data anggaran untuk mendapat rekomendasi
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Budget Rule Info */}
            <Card>
              <CardHeader>
                <CardTitle>Aturan 50/30/20</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span><strong>50% Kebutuhan:</strong> Pengeluaran wajib seperti sewa, makanan, transportasi</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <span><strong>30% Keinginan:</strong> Hiburan, hobi, dan pengeluaran tidak wajib</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span><strong>20% Tabungan:</strong> Dana darurat, investasi, dan tabungan masa depan</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}

