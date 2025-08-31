import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function NewsSearch({ searchTerm, onSearchChange, placeholder = "Cari berita..." }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 bg-[#171717] border-[#404040] text-white placeholder:text-gray-400 focus:border-[#15C26B] focus:ring-[#15C26B]"
      />
    </div>
  );
}
