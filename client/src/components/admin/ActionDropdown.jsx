import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical } from 'lucide-react';

export default function ActionDropdown({ children, icon: Icon = MoreVertical, buttonClassName = "shrink-0 p-2 rounded-lg border border-[var(--admin-border-subtle)] hover:bg-[var(--admin-bg-elevated)] text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] transition-colors", dropdownClassName = "p-1.5" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState({ top: 'auto', bottom: 'auto', right: 0 });
  const buttonRef = useRef(null);

  const toggle = (e) => {
    e.stopPropagation();
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      // If less than 180px below and more space above, open upwards
      const openUpwards = spaceBelow < 180 && spaceAbove > spaceBelow;
      
      setPos({
        top: openUpwards ? 'auto' : rect.bottom + 8,
        bottom: openUpwards ? window.innerHeight - rect.top + 8 : 'auto',
        right: window.innerWidth - rect.right,
      });
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = (e) => {
      // Don't close if scrolling inside the dropdown itself
      if (e.target.closest('.action-dropdown-menu')) return;
      setIsOpen(false);
    };
    
    if (isOpen) {
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        className={buttonClassName}
      >
        <Icon className="w-5 h-5" />
      </button>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <>
          <div 
            className="fixed inset-0 z-[9998]" 
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} 
          />
          <div 
            className={`action-dropdown-menu fixed z-[9999] bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-xl shadow-2xl text-sm admin-card-hover text-left flex flex-col min-w-[12rem] animate-slide-down divide-y divide-[var(--admin-border-subtle)] ${dropdownClassName}`}
            style={{ 
              top: pos.top !== 'auto' ? `${pos.top}px` : 'auto',
              bottom: pos.bottom !== 'auto' ? `${pos.bottom}px` : 'auto',
              right: `${pos.right}px`
            }}
            onClick={(e) => { 
              e.stopPropagation(); 
              // Only close if clicking a button inside
              if (e.target.closest('button') || e.target.closest('a')) {
                setIsOpen(false); 
              }
            }}
          >
            {children}
          </div>
        </>,
        document.body
      )}
    </>
  );
}
