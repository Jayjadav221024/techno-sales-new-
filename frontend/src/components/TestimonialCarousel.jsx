import { useState, useEffect, useRef } from 'react';
import Icon from './Icon';

export default function TestimonialCarousel({ testimonials = [], interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const count = testimonials.length;

  useEffect(() => {
    if (count <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % count);
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [count, interval, isPaused]);

  if (!testimonials || count === 0) return null;

  const current = testimonials[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + count) % count);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % count);
  };

  return (
    <div
      className="testimonial-carousel-wrap reveal-on-scroll"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      tabIndex={0}
      role="region"
      aria-label="Client Testimonials Carousel"
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
      }}
    >
      <div className="glass-card testimonial-card-inner">
        <div className="testimonial-quote-icon">
          <Icon name="quote" size={38} />
        </div>

        <blockquote className="testimonial-quote-text" key={currentIndex}>
          &ldquo;{current.text}&rdquo;
        </blockquote>

        <div className="testimonial-card-footer">
          <div className="testimonial-author-box">
            <div className="testimonial-avatar">
              {current.initials || current.name?.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="testimonial-author-name">{current.name}</div>
              <div className="testimonial-author-role">
                <Icon name="shieldCheck" size={14} />
                <span>{current.role} &middot; Verified Industrial Client</span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          {count > 1 && (
            <div className="testimonial-nav-controls">
              <button
                type="button"
                className="testimonial-nav-btn"
                onClick={handlePrev}
                aria-label="Previous testimonial"
              >
                <Icon name="chevronLeft" size={18} />
              </button>

              {/* Dot Indicators */}
              <div className="testimonial-dots" role="tablist" aria-label="Testimonial slides">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`testimonial-dot ${currentIndex === idx ? 'is-active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                    role="tab"
                    aria-selected={currentIndex === idx}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                className="testimonial-nav-btn"
                onClick={handleNext}
                aria-label="Next testimonial"
              >
                <Icon name="chevronRight" size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
