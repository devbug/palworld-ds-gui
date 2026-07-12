import { Button, Select, SelectItem } from '@nextui-org/react';
import Layout from '../../components/layout';
import { notifySuccess, toggleTheme } from '../../actions/app';
import useSelectedTheme from '../../hooks/use-selected-theme';
import {
  IconClearAll,
  IconMoon,
  IconSun,
  IconWriting
} from '@tabler/icons-react';
import { DesktopAPI } from '../../desktop';
import { requestConfirmation } from '../../actions/modal';
import { isWeb } from '../../helpers/is-web';
import { useTranslation } from 'react-i18next';
import { changeLanguage, SUPPORTED_LANGUAGES, TLanguageCode } from '../../i18n';

const AppSettings = () => {
  const { t, i18n } = useTranslation();
  const theme = useSelectedTheme();

  const onClearCacheClick = async () => {
    requestConfirmation({
      title: t('appSettings.clearDataConfirmTitle'),
      message: t('appSettings.clearDataConfirmMessage'),
      onConfirm: () => {
        localStorage.clear();
        notifySuccess(t('appSettings.dataCleared'));
      }
    });
  };

  return (
    <Layout
      className="relative flex flex-col gap-4"
      title={t('appSettings.title')}
    >
      <div className="flex flex-row gap-2">
        <Button
          onClick={toggleTheme}
          variant="shadow"
          color="primary"
          endContent={
            theme === 'light' ? (
              <IconMoon size="1.0rem" />
            ) : (
              <IconSun size="1.0rem" />
            )
          }
        >
          {theme === 'light'
            ? t('appSettings.toDarkTheme')
            : t('appSettings.toLightTheme')}
        </Button>

        {!isWeb() && (
          <Button
            onClick={DesktopAPI.openLogFile}
            variant="shadow"
            color="secondary"
            endContent={<IconWriting size="1.0rem" />}
          >
            {t('appSettings.openLogs')}
          </Button>
        )}

        <Button
          onClick={onClearCacheClick}
          variant="shadow"
          color="danger"
          endContent={<IconClearAll size="1.0rem" />}
        >
          {t('appSettings.clearData')}
        </Button>
      </div>

      <div className="w-64">
        <Select
          label={t('appSettings.language')}
          selectedKeys={[i18n.language]}
          disallowEmptySelection
          onChange={(e) => {
            if (e.target.value) {
              changeLanguage(e.target.value as TLanguageCode);
            }
          }}
        >
          {SUPPORTED_LANGUAGES.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              {language.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </Layout>
  );
};

export default AppSettings;
