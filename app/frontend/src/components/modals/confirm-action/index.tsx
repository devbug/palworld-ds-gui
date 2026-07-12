import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';
import { closeModals } from '../../../actions/modal';
import useModalsInfo from '../../../hooks/use-modals-info';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type TConfirmActionModalProps = {
  onCancel?: () => void;
  onConfirm?: () => void;
  title?: string;
  message?: string | React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'info';
};

const ConfirmActionModal = ({
  onCancel,
  onConfirm,
  title,
  message,
  confirmLabel,
  cancelLabel,
  variant
}: TConfirmActionModalProps) => {
  const { t } = useTranslation();
  const { isModalOpen } = useModalsInfo();
  const buttonColor = useMemo(
    () => (variant === 'danger' ? 'danger' : 'primary'),
    [variant]
  );

  return (
    <Modal
      backdrop="blur"
      isOpen={isModalOpen}
      onClose={() => {
        onCancel?.();
        closeModals();
      }}
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex gap-1 items-center">
          <p>{title ?? t('modals.confirmTitle')}</p>
        </ModalHeader>
        <ModalBody>{message ?? t('modals.areYouSure')}</ModalBody>
        <ModalFooter className="justify-center">
          <Button variant="ghost" onClick={() => onCancel?.()}>
            {cancelLabel ?? t('common.cancel')}
          </Button>
          <Button
            variant="solid"
            onClick={() => onConfirm?.()}
            color={buttonColor}
          >
            {confirmLabel ?? t('common.confirm')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmActionModal;
