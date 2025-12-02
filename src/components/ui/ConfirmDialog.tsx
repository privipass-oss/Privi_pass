import { memo } from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  variant: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ICONS = {
  danger: <AlertTriangle className="text-red-400" size={24} />,
  warning: <AlertCircle className="text-amber-400" size={24} />,
  info: <Info className="text-blue-400" size={24} />,
};

export const ConfirmDialog = memo<ConfirmDialogProps>(({
  isOpen,
  title,
  message,
  variant,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}) => (
  <Modal isOpen={isOpen} onClose={onCancel} title={title} size="sm">
    <div className="flex gap-4">
      <div className="flex-shrink-0 mt-1">{ICONS[variant]}</div>
      <p className="text-zinc-300">{message}</p>
    </div>
    <div className="flex justify-end gap-3 mt-6">
      <Button variant="ghost" onClick={onCancel}>
        {cancelText}
      </Button>
      <Button 
        variant={variant === 'danger' ? 'danger' : 'primary'} 
        onClick={onConfirm}
      >
        {confirmText}
      </Button>
    </div>
  </Modal>
));

ConfirmDialog.displayName = 'ConfirmDialog';
