import { Button, Input, Tooltip } from '@nextui-org/react';
import Layout from '../../components/layout';
import useServerConfig from '../../hooks/use-server-config';
import {
  IconCloudDownload,
  IconDeviceFloppy,
  IconPlayerPlay,
  IconPlayerStop
} from '@tabler/icons-react';
import { ConfigKey } from '../../types/server-config';
import TerminalOutput from '../../components/terminal-output';
import useServerStatus from '../../hooks/use-server-status';
import { ServerStatus } from '../../types';
import useConsolesById from '../../hooks/use-console-entries';
import { IconRefresh } from '@tabler/icons-react';
import { requestConfirmation } from '../../actions/modal';
import { DesktopAPI } from '../../desktop';
import useLaunchParams from '../../hooks/use-launch-params';
import { setLaunchParams } from '../../actions/app';
import { ServerAPI } from '../../server';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const statusKeyDict = {
  [ServerStatus.STARTED]: 'home.status.started',
  [ServerStatus.STARTING]: 'home.status.starting',
  [ServerStatus.STOPPED]: 'home.status.stopped',
  [ServerStatus.STOPPING]: 'home.status.stopping',
  [ServerStatus.RESTARTING]: 'home.status.restarting',
  [ServerStatus.UPDATING]: 'home.status.updating'
};

const Home = () => {
  const { t } = useTranslation();
  const currentConfig = useServerConfig();
  const status = useServerStatus();
  const consoleEntries = useConsolesById();
  const launchParams = useLaunchParams();
  const [saving, setSaving] = useState(false);

  const startDisabled = status !== ServerStatus.STOPPED;
  const stopDisabled = status !== ServerStatus.STARTED;
  const restartDisabled = status !== ServerStatus.STARTED;
  const updateDisabled = status !== ServerStatus.STOPPED;

  const onLaunchParamsChange = (e) => {
    setLaunchParams(e.target.value || '');
  };

  const onSaveLaunchParamsClick = async () => {
    setSaving(true);
    await ServerAPI.saveLaunchParams(launchParams || '');
    setSaving(false);
  };

  return (
    <Layout
      className="flex flex-col gap-4"
      title={currentConfig[ConfigKey.ServerName]}
      subtitle={t(statusKeyDict[status])}
    >
      <div className="flex gap-2">
        <Button
          endContent={<IconPlayerPlay size="1rem" />}
          color="success"
          onClick={ServerAPI.start}
          isLoading={status === ServerStatus.STARTING}
          isDisabled={startDisabled}
          variant="shadow"
        >
          {t('home.start')}
        </Button>

        <Button
          endContent={<IconPlayerStop size="1rem" />}
          color="danger"
          onClick={ServerAPI.stop}
          isLoading={status === ServerStatus.STOPPING}
          isDisabled={stopDisabled}
          variant="shadow"
        >
          {t('home.stop')}
        </Button>

        <Button
          endContent={<IconRefresh size="1rem" />}
          color="warning"
          onClick={ServerAPI.restart}
          isLoading={status === ServerStatus.RESTARTING}
          isDisabled={restartDisabled}
          variant="shadow"
        >
          {t('home.restart')}
        </Button>

        <Button
          endContent={<IconCloudDownload size="1rem" />}
          color="secondary"
          onClick={async () => {
            await requestConfirmation({
              title: t('home.updateConfirmTitle'),
              message: (
                <>
                  <p>
                    {t('home.updateConfirmBody')}{' '}
                    <span className="font-bold">
                      {t('home.updateConfirmBackupWarning')}
                    </span>
                    {t('home.updateConfirmBreakingChanges')}
                  </p>
                  <p>
                    {t('home.updateNotesAvailable')}{' '}
                    <span
                      className="text-blue-500 hover:underline cursor-pointer"
                      onClick={() =>
                        DesktopAPI.openUrl(
                          'https://store.steampowered.com/news/app/1623730'
                        )
                      }
                    >
                      https://store.steampowered.com/news/app/1623730
                    </span>
                  </p>
                </>
              ),
              cancelLabel: t('common.cancel'),
              confirmLabel: t('home.update'),
              onConfirm: ServerAPI.update
            });
          }}
          isLoading={status === ServerStatus.UPDATING}
          isDisabled={updateDisabled}
          variant="shadow"
        >
          {t('home.updateServer')}
        </Button>
      </div>

      <div className="flex gap-2 items-center">
        <Input
          size="sm"
          label={t('home.launchParams')}
          value={launchParams}
          onChange={onLaunchParamsChange}
        />
        <Tooltip content={t('home.saveLaunchParams')}>
          <Button
            isIconOnly
            color="primary"
            onClick={onSaveLaunchParamsClick}
            isLoading={saving}
          >
            <IconDeviceFloppy />
          </Button>
        </Tooltip>
      </div>

      <TerminalOutput entries={consoleEntries} className="h-full" />
    </Layout>
  );
};

export default Home;
