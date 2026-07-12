import { Button, Image, Input, Tooltip } from '@nextui-org/react';
import palworldLogo from '../../assets/palworld-logo.webp';
import useSocket from '../../hooks/use-socket';
import { IconInfoCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { setServerCredentials } from '../../actions/app';
import useServerCredentials from '../../hooks/use-server-credentials';
import { DesktopAPI } from '../../desktop';
import { isWeb } from '../../helpers/is-web';
import { useTranslation } from 'react-i18next';

const Initializing = () => {
  const { t } = useTranslation();
  const serverCredentials = useServerCredentials();
  const { connecting, connect, error } = useSocket();
  const [host, setHost] = useState(serverCredentials.host);
  const [apiKey, setApiKey] = useState(serverCredentials.apiKey);

  const onConnectClick = () => {
    setServerCredentials(host, apiKey);
    connect(host, apiKey, 'wss');
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex flex-col h-full justify-center items-center gap-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <Image
            src={palworldLogo}
            alt="Palworld Logo"
            width={350}
            height={350}
          />
          <p className="text-xl font-bold text-center">
            {t('initializing.appTitle')}
          </p>
          <p className="text-sm text-neutral-500">
            {t('initializing.versionLine', { version: APP_VERSION })}
          </p>
        </div>

        <div className="flex flex-col gap-2 w-[500px]">
          <Input
            size="lg"
            label={t('initializing.address')}
            placeholder="127.0.0.1:21577"
            endContent={
              <div className="cursor-default">
                <Tooltip
                  content={t('initializing.addressTooltip')}
                  className="max-w-[300px]"
                >
                  <IconInfoCircle color="#a0a0a0" />
                </Tooltip>
              </div>
            }
            value={host}
            onChange={(event) => setHost(event.target.value)}
          />
          <Input
            size="lg"
            label={t('initializing.apiKey')}
            type="password"
            placeholder=""
            endContent={
              <div className="cursor-default">
                <Tooltip
                  content={t('initializing.apiKeyTooltip')}
                  className="max-w-[300px]"
                >
                  <IconInfoCircle color="#a0a0a0" />
                </Tooltip>
              </div>
            }
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
          />
        </div>

        {error && (
          <p className="text-red-500">
            {error === true ? t('initializing.connectionError') : error}
          </p>
        )}

        <Button
          variant="shadow"
          size="lg"
          color="primary"
          onClick={onConnectClick}
          isLoading={connecting}
          isDisabled={!host || !apiKey}
        >
          {t('initializing.connect')}
        </Button>

        <div className="flex flex-col items-center">
          <p className="text-sm text-neutral-500">
            {t('initializing.helpIssue')}{' '}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() =>
                DesktopAPI.openUrl(
                  'https://github.com/diogomartino/palworld-ds-gui/issues'
                )
              }
            >
              {t('common.here')}
            </span>
          </p>

          {isWeb() ? (
            <p className="text-sm text-neutral-500">
              {t('initializing.webVersionNote')}{' '}
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() =>
                  DesktopAPI.openUrl(
                    'https://github.com/diogomartino/palworld-ds-gui/releases/latest'
                  )
                }
              >
                {t('common.here')}
              </span>
            </p>
          ) : (
            <p className="text-sm text-neutral-500">
              {t('initializing.desktopVersionNote')}{' '}
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => DesktopAPI.openUrl('https://app.palgui.com')}
              >
                {t('common.here')}
              </span>
            </p>
          )}

          <span
            className="text-blue-500 hover:underline cursor-pointer font-bold"
            onClick={() =>
              DesktopAPI.openUrl(
                'https://github.com/diogomartino/palworld-ds-gui/'
              )
            }
          >
            Github
          </span>
        </div>
      </div>
    </div>
  );
};

export default Initializing;
