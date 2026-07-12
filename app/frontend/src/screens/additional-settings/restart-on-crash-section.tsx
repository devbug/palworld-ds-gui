import { Switch } from '@nextui-org/react';
import { TRestartOnCrashSettings } from '../../types';
import { useTranslation } from 'react-i18next';

type TRestartOnCrashSectionProps = {
  value: TRestartOnCrashSettings;
  onChange: (key: string, value: any) => void;
};

const RestartOnCrashSection = ({
  value,
  onChange
}: TRestartOnCrashSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div>
          <p className="font-bold">
            {t('additionalSettings.restartOnCrash.title')}
          </p>
          <p className="text-sm text-neutral-500">
            {t('additionalSettings.restartOnCrash.description')}
          </p>
        </div>

        <div className="flex items-center gap-4 mt-5">
          <Switch
            isSelected={value.enabled}
            onChange={() => onChange('enabled', Boolean(!value.enabled))}
          >
            {t('common.enabled')}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default RestartOnCrashSection;
