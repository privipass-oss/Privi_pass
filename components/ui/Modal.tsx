import { memo, useEffect, useCallback, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  footer?: ReactNode;
}

const SIZES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export const Modal = memo<ModalProps>(({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  footer,
}) => {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-10 sm:py-20 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className={`w-full ${SIZES[size]} bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl`}
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 id="modal-title" className="text-lg font-bold text-white">{title}</h2>
          <button 
            onClick={onClose} 
            className="p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </header>
        <div className="p-5">{children}</div>
        {footer && (
          <footer className="flex justify-end gap-3 p-5 border-t border-white/10">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';
