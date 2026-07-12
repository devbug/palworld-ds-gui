import { Input, Switch } from '@nextui-org/react';
import { TGenericObject, TTimedRestartSettings } from '../../types';
import { useTranslation } from 'react-i18next';

type TTimedRestartSectionProps = {
  value: TTimedRestartSettings;
  errors: TGenericObject;
  onChange: (key: string, value: any) => void;
};

const TimedRestartSection = ({
  value,
  onChange,
  errors
}: TTimedRestartSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div>
          <p className="font-bold">
            {t('additionalSettings.timedRestart.title')}
          </p>
          <p className="text-sm text-neutral-500">
            {t('additionalSettings.timedRestart.description')}
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

      <div className="flex justify-between items-center gap-4">
        <Input
          className="w-48"
          label={t('additionalSettings.timedRestart.interval')}
          isInvalid={!!errors.interval}
          isDisabled={!value.enabled}
          labelPlacement="outside"
          min={0}
          max={24}
          step={0.1}
          placeholder="1"
          type="number"
          endContent={<span className="text-sm">{t('common.hours')}</span>}
          value={value.interval.toString()}
          onChange={(e) => onChange('interval', e.target.value)}
        />
      </div>
    </div>
  );
};

export default TimedRestartSection;
