import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  Home, 
  BookOpen, 
  Calculator, 
  Brain, 
  MessageCircle, 
  LogOut,
  Menu,
  X,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const NAV_ITEMS = [
  { 
    href: '/dashboard', 
    icon: Home, 
    label: 'Dashboard',
    shortLabel: 'Home'
  },
  { 
    href: '/dashboard/learning', 
    icon: BookOpen, 
    label: 'Learning',
    shortLabel: 'Learn'
  },
  { 
    href: '/dashboard/simulasi', 
    icon: Calculator, 
    label: 'Simulasi',
    shortLabel: 'Sim'
  },
  { 
    href: '/dashboard/kuis', 
    icon: Brain, 
    label: 'Kuis',
    shortLabel: 'Quiz'
  },
  { 
    href: '/dashboard/ai-chat', 
    icon: MessageCircle, 
    label: 'AI Chat',
    shortLabel: 'Chat'
  }
];

export function MobileBottomNav() {
  const router = useRouter();
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        {NAV_ITEMS.map(({ href, icon: Icon, shortLabel }) => {
          const isActive = router.pathname === href;
          return (
            <Link key={href} href={href}>
              <div className={`flex flex-col items-center p-2 min-w-[44px] ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}>
                <Icon className="h-5 w-5" />
                <span className="text-xs mt-1 font-medium">{shortLabel}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function DesktopSidebar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('sampattinaya_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sampattinaya_user');
    router.push('/auth/login');
  };

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-background border-r border-border">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-border">
          <Link href="/" className="flex items-center">
            <span className="ml-2 text-lg font-semibold">SampattiNaya</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
            const isActive = router.pathname === href;
            return (
              <Link key={href} href={href}>
                <div className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}>
                  <Icon className="h-5 w-5 mr-3" />
                  {label}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Menu */}
        <div className="p-4 border-t border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-2">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src="/assets/u/avatar-placeholder.svg" />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">
                    {user?.name || 'Demo User'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email || 'demo@sampattinaya.com'}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export function DashboardHeader() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('sampattinaya_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sampattinaya_user');
    router.push('/auth/login');
  };

  return (
    <header className="md:ml-64 bg-background border-b border-border">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Avatar className="h-7 w-7 mr-2">
                  <AvatarImage src="/assets/u/avatar-placeholder.svg" />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden lg:inline">
                  {user?.name || 'Demo User'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default function DashboardNav({ className = '' }) {
  return (
    <div className={className}>
      <DesktopSidebar />
      <DashboardHeader />
      <MobileBottomNav />
    </div>
  );
}

