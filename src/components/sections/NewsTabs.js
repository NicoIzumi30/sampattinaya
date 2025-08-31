import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function NewsTabs({ activeCategory, onCategoryChange, categories }) {
  return (
    <Tabs value={activeCategory} onValueChange={onCategoryChange} className="w-full">
      <TabsList className="grid w-full grid-cols-5 lg:grid-cols-5 bg-[#171717] border-[#404040]">
        {categories.map((category) => (
          <TabsTrigger 
            key={category.value} 
            value={category.value}
            className="text-xs sm:text-sm text-gray-400 data-[state=active]:bg-[#15C26B] data-[state=active]:text-white hover:bg-[#404040] hover:text-white"
          >
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
