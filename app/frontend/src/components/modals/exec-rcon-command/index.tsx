import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';
import { closeModals } from '../../../actions/modal';
import useModalsInfo from '../../../hooks/use-modals-info';
import { useState } from 'react';
import { ServerAPI } from '../../../server';
import { useTranslation } from 'react-i18next';

const ExecRonCommandModal = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [command, setCommand] = useState('');
  const [result, setResult] = useState('');
  const { isModalOpen } = useModalsInfo();

  const onExecuteClick = async () => {
    if (!command) return;

    setLoading(true);

    const result = await ServerAPI.rcon.execute(command);

    setResult(result);
    setLoading(false);
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isModalOpen}
      onClose={() => closeModals()}
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex gap-1 items-center">
          <p>{t('modals.execRcon.title')}</p>
        </ModalHeader>
        <ModalBody>
          <Input
            className="w-full"
            placeholder={t('modals.execRcon.placeholder')}
            label={t('modals.execRcon.commandLabel')}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onExecuteClick()}
          />

          {result && (
            <div className="flex flex-col gap-2">
              <p className="text-sm">{t('modals.execRcon.response')}</p>
              <Card className="w-full h-full">
                <CardBody className="bg-content2">
                  <pre className="flex text-xs whitespace-pre-wrap h-[120px]">
                    {result}
                  </pre>
                </CardBody>
              </Card>
            </div>
          )}
        </ModalBody>
        <ModalFooter className="justify-center">
          <Button variant="ghost" onClick={() => closeModals()}>
            {t('common.close')}
          </Button>
          <Button
            variant="solid"
            color="primary"
            onClick={onExecuteClick}
            isLoading={loading}
          >
            {t('common.execute')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ExecRonCommandModal;
