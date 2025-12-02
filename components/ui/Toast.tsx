import { memo } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import type { Toast as ToastType, ToastType as ToastVariant } from '@hooks/useToast';

const ICONS: Record<ToastVariant, JSX.Element> = {
  success: <CheckCircle className="text-emerald-400" size={20} />,
  error: <XCircle className="text-red-400" size={20} />,
  warning: <AlertCircle className="text-amber-400" size={20} />,
  info: <Info className="text-blue-400" size={20} />,
};

const COLORS: Record<ToastVariant, string> = {
  success: 'border-emerald-500/30 bg-emerald-500/10',
  error: 'border-red-500/30 bg-red-500/10',
  warning: 'border-amber-500/30 bg-amber-500/10',
  info: 'border-blue-500/30 bg-blue-500/10',
};

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

export const Toast = memo<ToastProps>(({ toast, onDismiss }) => (
  <div 
    className={`
      flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-xl
      animate-in slide-in-from-right-full duration-300
      ${COLORS[toast.type]}
    `}
  >
    {ICONS[toast.type]}
    <span className="text-white text-sm flex-1">{toast.message}</span>
    <button 
      onClick={() => onDismiss(toast.id)} 
      className="text-zinc-500 hover:text-white p-1"
    >
      <X size={16} />
    </button>
  </div>
));

Toast.displayName = 'Toast';

interface ToastContainerProps {
  toasts: ToastType[];
  onDismiss: (id: string) => void;
}

export const ToastContainer = memo<ToastContainerProps>(({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
});

ToastContainer.displayName = 'ToastContainer';
