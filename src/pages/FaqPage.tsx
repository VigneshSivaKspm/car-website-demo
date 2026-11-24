import React, { useState } from 'react';
import { HelpCircle, Sparkles, Search } from 'lucide-react';
import { Button } from '../components/common/Button';
import { FAQS } from '../data/faqs';

export const FaqPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'General', 'Paint & Body', 'Ceramic & Detailing', 'Mechanical & AC', 'Restoration', 'Booking & Communication'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-carbon-900 text-pearl min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-graphite-900 border border-gold/30 text-gold text-xs font-display uppercase tracking-super-wide mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Clear Answers
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-pearl leading-[0.95]">
            Frequently Asked <span className="gold-text-gradient">Questions</span>.
          </h1>
          <p className="mt-4 text-silver text-sm sm:text-base leading-relaxed">
            Everything you need to know about our craftsmanship standards, booking process, paint matching, and workshop policies.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-silver/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. ceramic coating, dent repair, timeline)..."
            className="w-full bg-graphite-900 border border-charcoal pl-11 pr-4 py-3 text-xs sm:text-sm text-pearl placeholder:text-silver/50 focus:border-gold focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-display uppercase tracking-automotive whitespace-nowrap transition-all border ${
                activeCategory === cat
                  ? 'bg-gold text-ink border-gold font-bold'
                  : 'bg-graphite-900 text-silver border-charcoal hover:border-gold/40 hover:text-pearl'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs List */}
        <div className="space-y-4 mb-16">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="p-6 bg-graphite-900 border border-charcoal hover:border-gold/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-5 h-5 text-gold flex-none mt-1" />
                  <div>
                    <div className="text-[10px] font-display uppercase tracking-widest text-gold/70 mb-1">
                      {faq.category}
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg uppercase text-pearl">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-silver leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-carbon-950 border border-charcoal text-silver text-xs">
              No questions found matching your search. Please ask us directly via our booking enquiry!
            </div>
          )}
        </div>

        {/* Unanswered Question Card */}
        <div className="p-8 bg-carbon-950 border border-charcoal flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-lg uppercase text-pearl">
              Have a Question Not Listed Here?
            </h3>
            <p className="text-xs text-silver mt-1">
              Our workshop team is glad to provide detailed technical guidance for your specific car.
            </p>
          </div>
          <Button to="/contact" variant="outline" className="flex-none">
            Contact Workshop
          </Button>
        </div>
      </div>
    </div>
  );
};
