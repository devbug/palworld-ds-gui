import { Button } from '@nextui-org/react';
import Layout from '../../components/layout';
import { DesktopAPI } from '../../desktop';
import useHasUpdates from '../../hooks/use-latest-version';
import { checkForUpdates } from '../../actions/app';
import { useState } from 'react';
import { IconRefresh } from '@tabler/icons-react';
import { isWeb } from '../../helpers/is-web';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { hasUpdates, latestVersion } = useHasUpdates();

  const onCheckForUpdatesClick = async () => {
    setLoading(true);
    await checkForUpdates();
    setLoading(false);
  };

  return (
    <Layout
      className="relative flex flex-col gap-4"
      title={t('about.title')}
      subtitle={
        <p className="text-sm text-neutral-500">
          v{APP_VERSION}
          {' - '}
          {hasUpdates ? (
            <span
              className="text-blue-500 hover:underline cursor-pointer animate-pulse"
              onClick={() =>
                DesktopAPI.openUrl(
                  'https://github.com/diogomartino/palworld-ds-gui/releases/latest'
                )
              }
            >
              {t('about.newVersion', { version: latestVersion })}
            </span>
          ) : (
            <span>{t('about.latestVersion')}</span>
          )}
        </p>
      }
    >
      {!isWeb() && (
        <div>
          <Button
            variant="shadow"
            color="secondary"
            size="sm"
            onClick={onCheckForUpdatesClick}
            isLoading={loading}
            endContent={<IconRefresh size="0.9rem" />}
          >
            {t('about.checkUpdates')}
          </Button>
        </div>
      )}

      <p>
        {t('about.openSourcePrefix')}{' '}
        <span
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={() =>
            DesktopAPI.openUrl(
              'https://github.com/diogomartino/palworld-ds-gui'
            )
          }
        >
          {t('about.here')}
        </span>
        {t('about.openSourceSuffix')}
      </p>
      <p>{t('about.disclaimer')}</p>
      <p>
        {t('about.licensedUnder')}{' '}
        <span
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={() =>
            DesktopAPI.openUrl('https://opensource.org/licenses/MIT')
          }
        >
          MIT License
        </span>
        .
      </p>
      <p>
        {t('about.createdBy')}{' '}
        <span
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={() => DesktopAPI.openUrl('https://github.com/diogomartino')}
        >
          Diogo Martino
        </span>
      </p>
    </Layout>
  );
};

export default About;
