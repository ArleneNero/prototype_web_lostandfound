import React from 'react';
import { MapPin, Calendar, Bookmark } from 'lucide-react';
import { Item } from '../types';
import { StatusBadge } from './StatusBadge';
import { useApp } from '../store/AppContext';

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { navigateTo, toggleBookmark, isBookmarked } = useApp();
  const bookmarked = isBookmarked(item.id);

  return (
    <div 
      onClick={() => navigateTo('item-detail', { itemId: item.id })}
      className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden hover:shadow-card-hover transition-all duration-200 flex flex-col cursor-pointer group text-left"
    >
      {/* Image container */}
      <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
        <img
          src={item.images[0] || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=400&q=80'}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Bookmark button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(item.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${
            bookmarked 
              ? 'bg-primary text-white' 
              : 'bg-white/90 text-gray-600 hover:bg-white hover:text-gray-900'
          }`}
          aria-label="Simpan barang"
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-sm line-clamp-1 mb-1.5 group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <div className="mb-2">
            <StatusBadge status={item.status} size="sm" />
          </div>
        </div>

        <div className="space-y-1 text-[11px] text-gray-500 pt-1 border-t border-gray-50">
          <div className="flex items-center gap-1.5 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>{item.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
