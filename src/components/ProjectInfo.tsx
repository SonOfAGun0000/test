import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ProjectInfo Component
 * A fixed bottom-left button that opens a premium glassmorphism modal 
 * with project details and metadata.
 */
const ProjectInfo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent background scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <>
      {/* Trigger Button - Footer Position */}
      <footer style={{ padding: '1.5rem 1.5rem 2.5rem', display: 'flex', justifyContent: 'flex-start' }}>
        <motion.button
          onClick={toggleModal}
          aria-label="Project Information"
          animate={{
            boxShadow: [
              '0 0 8px rgba(0, 242, 255, 0.2)',
              '0 0 16px rgba(0, 242, 255, 0.5)',
              '0 0 8px rgba(0, 242, 255, 0.2)'
            ],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ 
            scale: 1.1,
            backgroundColor: 'rgba(0, 242, 255, 0.15)',
            boxShadow: '0 0 20px rgba(0, 242, 255, 0.8)'
          }}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: '#00f2ff',
            border: '1px solid #00f2ff',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            fontFamily: 'inherit'
          }}
        >
          <span style={{ fontSize: '20px', lineHeight: 0 }}>ⓘ</span>
        </motion.button>
      </footer>

      {/* Premium Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '1.5rem',
            }}
          >
            {/* Backdrop Blur & Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleModal}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(12px)',
              }}
            />

            {/* Glassmorphism Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '480px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid var(--color-primary)', // Neon Magenta tint
                borderRadius: '24px',
                padding: 'clamp(1.5rem, 5vw, 2.5rem)',
                color: '#ffffff',
                boxShadow: '0 0 30px rgba(255, 0, 255, 0.2), inset 0 0 20px rgba(255, 0, 255, 0.05)',
                textAlign: 'center',
              }}
            >
              <button
                onClick={toggleModal}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '28px',
                  cursor: 'pointer',
                }}
                aria-label="Close"
              >
                &times;
              </button>

              <header style={{ marginBottom: '32px' }}>
                <h2 style={{ 
                  fontSize: 'clamp(2.25rem, 5vw, 2.25rem)', 
                  margin: '0 0 12px 0', 
                  color: '#f8ffff', 
                  textShadow: '0 0 15px rgba(0, 242, 255, 0.4)',
                  letterSpacing: '1px'
                }}>
                  THE ALGORITHM SLOT MACHINE
                </h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  An Interactive Experience Exploring<br />Social Validation and Outfit Repetition
                </p>
              </header>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
                <DataField label="AUTHOR" value="Sahana Sathishkumar" />
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <DataField label="Student ID" value="S3933887" />
                  <DataField label="VERSION" value="1.0" />
                </div>

                <DataField label="INSTITUTION" value="RMIT University" />
                <DataField label="PROJECT" value="Assignment 3 Final Project" />
                <DataField label="DEVELOPED BY" value="Sahana Sathishkumar" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

/**
 * DataField Sub-component
 */
const DataField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ borderLeft: '2px solid var(--color-primary)', paddingLeft: '16px' }}>
    <div style={{ 
      fontSize: '11px', 
      color: 'var(--color-primary)', 
      fontWeight: 700, 
      textTransform: 'uppercase', 
      letterSpacing: '2px',
      marginBottom: '4px'
    }}>
      {label}
    </div>
    <div style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.95)', fontWeight: 300 }}>
      {value}
    </div>
  </div>
);

export default ProjectInfo;