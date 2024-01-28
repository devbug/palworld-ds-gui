import { Modal, TGenericObject } from '../types';
import { modalsSliceActions } from '../store/modals-slice';
import { store } from '../store';

export const openModal = (modal: Modal, props?: TGenericObject) => {
  store.dispatch(modalsSliceActions.setIsOpen(true));

  store.dispatch(
    modalsSliceActions.setModalInfo({
      modal,
      props
    })
  );
};

export const closeModals = () => {
  store.dispatch(modalsSliceActions.setIsOpen(false));

  // allow fade out animation to complete before stopping rendering, otherwise it looks choppy
  setTimeout(() => {
    store.dispatch(
      modalsSliceActions.setModalInfo({ modal: undefined, props: {} })
    );
  }, 500);
};

export const requestConfirmation = async ({
  title,
  message,
  confirmLabel,
  cancelLabel,
  variant = 'info',
  onConfirm,
  onCancel
}: {
  title?: string;
  message?: string | React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'info';
  onConfirm?: () => void;
  onCancel?: () => void;
}): Promise<boolean> => {
  return new Promise((resolve) => {
    openModal(Modal.ACTION_CONFIRMATION, {
      title,
      message,
      confirmLabel,
      cancelLabel,
      variant,
      onConfirm: () => {
        onConfirm?.();
        closeModals();
        resolve(true);
      },
      onCancel: () => {
        onCancel?.();
        closeModals();
        resolve(false);
      }
    });
  });
};
