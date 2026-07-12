import {
  IconBolt,
  IconDeviceGamepad2,
  IconDoorExit,
  IconFiles,
  IconInfoHexagon,
  IconServer,
  IconSettings,
  IconSettingsUp
} from '@tabler/icons-react';
import NavItem from './nav-item';
import useHasUpdates from '../../hooks/use-latest-version';
import useSocket from '../../hooks/use-socket';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t } = useTranslation();
  const { hasUpdates } = useHasUpdates();
  const { disconnect } = useSocket();

  return (
    <div className="flex flex-col w-48 bg-content2 text-white shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
      <div className="flex flex-col justify-between h-full">
        <div>
          <NavItem label={t('nav.server')} to="/" iconComponent={IconServer} />
          <NavItem
            label={t('nav.gameSettings')}
            to="/settings"
            iconComponent={IconDeviceGamepad2}
          />
          <NavItem
            label={t('nav.otherSettings')}
            to="/additional-settings"
            iconComponent={IconSettings}
          />
          <NavItem
            label={t('nav.admin')}
            to="/admin"
            iconComponent={IconBolt}
          />
          <NavItem
            label={t('nav.backups')}
            to="/backups"
            iconComponent={IconFiles}
          />
          <NavItem
            label={t('nav.appSettings')}
            to="/app-settings"
            iconComponent={IconSettingsUp}
          />
          <NavItem
            label={t('nav.about')}
            to="/about"
            iconComponent={IconInfoHexagon}
            iconProps={{
              color: hasUpdates ? '#3b82f6' : '#a0a0a0',
              className: hasUpdates && 'animate-ping duration-1000'
            }}
          />
        </div>

        <div>
          <NavItem
            label={t('nav.disconnect')}
            onClick={disconnect}
            iconComponent={IconDoorExit}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
