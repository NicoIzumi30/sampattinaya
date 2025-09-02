import Head from 'next/head';
import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Calendar, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function RegisterPage() {
  const router = useRouter();
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    country: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.dob) {
      newErrors.dob = 'Tanggal lahir wajib diisi';
    } else {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13) {
        newErrors.dob = 'Usia minimal 13 tahun';
      }
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Negara wajib diisi';
    }

    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      alert('Registrasi berhasil!');
      
      // Redirect to login
      router.push('/auth/login');
    } catch (error) {
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    // Simulate Google registration and login
    localStorage.setItem('sampattinaya_user', JSON.stringify({
      email: 'user@google.com',
      name: 'Google User',
      loginTime: new Date().toISOString(),
      provider: 'google'
    }));
    
    // Redirect langsung ke dashboard
    router.push('/dashboard');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <>
      <Head>
        <title>Daftar - SampattiNaya</title>
        <meta name="description" content="Daftar akun SampattiNaya untuk mengakses platform literasi finansial" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-5xl mx-auto">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">SampattiNaya</h1>
            <p className="text-muted-foreground">Platform Literasi Finansial</p>
          </div>

          <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-foreground mb-2">
                Bergabung dengan Kami
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Mulai perjalanan literasi finansial Anda hari ini
              </p>
            </CardHeader>
              
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Grid - 2 Columns only on desktop */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                        <User className="h-4 w-4 text-muted-foreground" />
                        Nama Lengkap
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Masukkan nama lengkap"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className={`h-12 transition-all duration-200 ${
                          errors.name ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <span className="text-red-500">⚠</span>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="nama@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={`h-12 transition-all duration-200 ${
                          errors.email ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <span className="text-red-500">⚠</span>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Date of Birth Field */}
                    <div className="space-y-2">
                      <Label htmlFor="dob" className="flex items-center gap-2 text-sm font-medium">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        Tanggal Lahir
                      </Label>
                      <Input
                        id="dob"
                        type="date"
                        value={formData.dob}
                        onChange={(e) => handleInputChange('dob', e.target.value)}
                        onFocus={() => setFocusedField('dob')}
                        onBlur={() => setFocusedField(null)}
                        className={`h-12 transition-all duration-200 ${
                          errors.dob ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'
                        }`}
                      />
                      {errors.dob && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <span className="text-red-500">⚠</span>
                          {errors.dob}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Country Field */}
                    <div className="space-y-2">
                      <Label htmlFor="country" className="flex items-center gap-2 text-sm font-medium">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        Negara
                      </Label>
                      <Input
                        id="country"
                        type="text"
                        placeholder="Indonesia"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        onFocus={() => setFocusedField('country')}
                        onBlur={() => setFocusedField(null)}
                        className={`h-12 transition-all duration-200 ${
                          errors.country ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'
                        }`}
                      />
                      {errors.country && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <span className="text-red-500">⚠</span>
                          {errors.country}
                        </p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Minimal 6 karakter"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          onFocus={() => setFocusedField('password')}
                          onBlur={() => setFocusedField(null)}
                          className={`h-12 pr-12 transition-all duration-200 ${
                            errors.password ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <span className="text-red-500">⚠</span>
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium">Konfirmasi Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Ulangi password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          onFocus={() => setFocusedField('confirmPassword')}
                          onBlur={() => setFocusedField(null)}
                          className={`h-12 pr-12 transition-all duration-200 ${
                            errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <span className="text-red-500">⚠</span>
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                  </div>
                </div>

                {/* Submit Buttons - Side by Side */}
                <div className="flex gap-4 pt-8">
                  <Button 
                    type="submit" 
                    className="flex-1 h-12 text-base font-semibold bg-primary hover:bg-primary/90 transition-all duration-200" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Mendaftar...
                      </div>
                    ) : (
                      'Daftar Sekarang'
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1 h-12 text-base border-2 hover:bg-muted/50 transition-all duration-200" 
                    onClick={handleGoogleSignUp}
                    type="button"
                    style={{ border: '1px solid #eaeaea' }}
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                </div>
              </form>

              {/* Login Link */}
              <div className="text-center mt-8 pt-6 border-t border-muted-foreground/10">
                <p className="text-sm text-muted-foreground">
                  Sudah punya akun?{' '}
                  <Link href="/auth/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                    Masuk di sini
                  </Link>
                </p>
              </div>

              </CardContent>
            </Card>
        </div>
      </main>
    </>
  );
}

