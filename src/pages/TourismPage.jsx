import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Compass, MapPin, Calendar, Star, Heart, ArrowRight,
  Sparkles, CheckCircle2, Share2, Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { tourismData, tourismCategories } from '../data/tourismData';
import TourismCard from '../components/cards/TourismCard';
import SearchBar from '../components/common/SearchBar';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';

export default function TourismPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { language, t, savedPlaces, toggleSavePlace } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  
  const categoryParam = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [activePlaceModal, setActivePlaceModal] = useState(null);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && tourismCategories.includes(cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setSearchParams(cat === 'All' ? {} : { category: cat });
  };

  const filteredPlaces = useMemo(() => {
    return tourismData.filter(place => {
      const matchesCat = selectedCategory === 'All' || place.category === selectedCategory;
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch = !term ||
        place.name.toLowerCase().includes(term) ||
        (place.nameTa && place.nameTa.includes(term)) ||
        place.location.toLowerCase().includes(term) ||
        place.description.toLowerCase().includes(term) ||
        place.category.toLowerCase().includes(term);
      return matchesCat && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Page Hero Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/20">
          Enchanting Tamil Nadu
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
          {t.tourismTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
          From the sacred Dravidian gopurams of Madurai and Thanjavur to the cool tea slopes of Ooty and coastal breezes of Marina Beach.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="w-full md:w-80">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search beaches, temples, hill stations..."
          />
        </div>

        {/* Categories Bar */}
        <div className="w-full md:flex-1 flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          {tourismCategories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-3 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-amber-600 text-white shadow-xs font-bold"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tourism Cards Grid */}
      {filteredPlaces.length === 0 ? (
        <EmptyState
          title="No tourism destinations found"
          description={`We couldn't find any places matching "${searchTerm}". Try another category.`}
          actionLabel="View All Destinations"
          onAction={() => {
            setSearchTerm('');
            handleCategorySelect('All');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map(place => (
            <TourismCard
              key={place.id}
              place={place}
              onExplore={(p) => setActivePlaceModal(p)}
            />
          ))}
        </div>
      )}

      {/* Place Details Modal */}
      <Modal
        isOpen={!!activePlaceModal}
        onClose={() => setActivePlaceModal(null)}
        title={activePlaceModal ? (language === 'ta' && activePlaceModal.nameTa ? activePlaceModal.nameTa : activePlaceModal.name) : ""}
        subtitle={activePlaceModal?.location}
        maxWidth="max-w-2xl"
      >
        {activePlaceModal && (
          <div className="space-y-6 text-sm">
            {/* Modal Image */}
            <div className="relative aspect-16/9 rounded-2xl overflow-hidden shadow-md">
              <img
                src={activePlaceModal.image}
                alt={activePlaceModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-amber-400 font-bold px-2.5 py-1 rounded-lg text-xs flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                <span>{activePlaceModal.rating}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              {activePlaceModal.description}
            </p>

            {/* Best Season & Category */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Best Season to Visit</div>
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>{activePlaceModal.bestTimeToVisit}</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Circuit / Genre</div>
                <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                  {activePlaceModal.category}
                </div>
              </div>
            </div>

            {/* Key Highlights */}
            {activePlaceModal.highlights && (
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Visitor Highlights & Signature Experiences</span>
                </h4>
                <ul className="space-y-2">
                  {activePlaceModal.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <Button
                variant={savedPlaces.includes(activePlaceModal.id) ? "danger" : "outline"}
                size="sm"
                icon={Heart}
                onClick={() => toggleSavePlace(activePlaceModal.id)}
              >
                {savedPlaces.includes(activePlaceModal.id) ? "Saved in Profile" : "Save Destination"}
              </Button>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activePlaceModal.name + " " + activePlaceModal.location)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-xs"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open in Maps</span>
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
