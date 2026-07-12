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
import { DesktopAPI } from '../../../desktop';
import { useTranslation } from 'react-i18next';

type TVersionMismatchModalProps = {
  clientVersion: string;
  serverVersion: string;
};

const VersionMismatchModal = ({
  clientVersion,
  serverVersion
}: TVersionMismatchModalProps) => {
  const { t } = useTranslation();
  const { isModalOpen } = useModalsInfo();

  return (
    <Modal
      backdrop="blur"
      isOpen={isModalOpen}
      onClose={() => {
        closeModals();
      }}
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex gap-1 items-center">
          <p>{t('modals.versionMismatch.title')}</p>
        </ModalHeader>
        <ModalBody>
          <p>{t('modals.versionMismatch.body')}</p>
          <div className="flex flex-col">
            <div>
              <span className="text-gray-500">
                {t('modals.versionMismatch.serverVersion')}
              </span>
              <span className="ml-1">{serverVersion}</span>
            </div>
            <div>
              <span className="text-gray-500">
                {t('modals.versionMismatch.clientVersion')}
              </span>
              <span className="ml-1">{clientVersion}</span>
            </div>
          </div>

          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() =>
              DesktopAPI.openUrl(
                'https://github.com/diogomartino/palworld-ds-gui/releases/latest'
              )
            }
          >
            {t('modals.versionMismatch.downloadLatest')}
          </span>
        </ModalBody>
        <ModalFooter className="justify-center">
          <Button variant="shadow" color="primary" onClick={closeModals}>
            {t('modals.versionMismatch.understood')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VersionMismatchModal;
