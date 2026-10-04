import React from 'react';
import { MapPin, Calendar, Bookmark, ChevronRight } from 'lucide-react';
import { Item } from '../types';
import { StatusBadge } from './StatusBadge';
import { useApp } from '../store/AppContext';

interface ItemListRowProps {
  item: Item;
  showActions?: boolean;
}

export const ItemListRow: React.FC<ItemListRowProps> = ({ item, showActions = true }) => {
  const { navigateTo, toggleBookmark, isBookmarked, currentUser } = useApp();
  const bookmarked = isBookmarked(item.id);
  const isOfficer = currentUser?.role === 'OFFICER';

  const handleClick = () => {
    if (isOfficer) {
      navigateTo('officer-item-detail', { itemId: item.id });
    } else {
      navigateTo('item-detail', { itemId: item.id });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl border border-gray-200 p-3 shadow-subtle hover:border-blue-300 hover:shadow-card transition-all cursor-pointer flex items-center gap-3.5 group text-left"
    >
      {/* Thumbnail */}
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
        <img
          src={item.images[0] || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=400&q=80'}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-1 mb-1">
          <h4 className="font-bold text-gray-900 text-sm truncate group-hover:text-primary transition-colors">
            {item.title}
          </h4>
          {showActions && !isOfficer && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(item.id);
              }}
              className={`p-1 rounded-full transition-colors ${
                bookmarked ? 'text-primary' : 'text-gray-300 hover:text-gray-500'
              }`}
              aria-label="Bookmark"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        <div className="mb-2">
          <StatusBadge status={item.status} size="sm" />
        </div>

        <div className="flex items-center gap-3 text-[11px] text-gray-500">
          <span className="flex items-center gap-1 truncate max-w-[130px]">
            <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="truncate">{item.location}</span>
          </span>
          <span className="flex items-center gap-1 shrink-0">
            <Calendar className="w-3 h-3 text-gray-400 shrink-0" />
            <span>{item.date}</span>
          </span>
        </div>
      </div>

      {isOfficer && (
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors shrink-0" />
      )}
    </div>
  );
};
