import { useState, useCallback } from 'react';

interface ConfirmState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  variant: 'danger' | 'warning' | 'info';
}

const INITIAL_STATE: ConfirmState = {
  isOpen: false,
  title: '',
  message: '',
  onConfirm: () => {},
  variant: 'danger',
};

export function useConfirm() {
  const [state, setState] = useState<ConfirmState>(INITIAL_STATE);

  const confirm = useCallback((
    options: {
      title: string;
      message: string;
      variant?: 'danger' | 'warning' | 'info';
    }
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        isOpen: true,
        title: options.title,
        message: options.message,
        variant: options.variant || 'danger',
        onConfirm: () => {
          setState(INITIAL_STATE);
          resolve(true);
        },
      });
    });
  }, []);

  const cancel = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return { ...state, confirm, cancel };
}
