import { Input, Switch } from '@nextui-org/react';
import { TGenericObject, TStopCountdownSettings } from '../../types';

type TStopCountdownSectionProps = {
  value: TStopCountdownSettings;
  errors: TGenericObject;
  onChange: (key: string, value: any) => void;
};

const StopCountdownSection = ({
  value,
  onChange,
  errors
}: TStopCountdownSectionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div>
          <p className="font-bold">Stop Countdown announcement</p>
          <p className="text-sm text-neutral-500">
            Announce server stop countdown message
          </p>
        </div>

        <div className="flex items-center gap-4 mt-5">
          <Switch
            isSelected={value.enabled}
            onChange={() => onChange('enabled', Boolean(!value.enabled))}
          >
            Enabled
          </Switch>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        <Input
          className="w-48"
          label="Start At"
          isInvalid={!!errors.startat}
          isDisabled={!value.enabled}
          labelPlacement="outside"
          min={0}
          max={100}
          step={1}
          placeholder="30"
          type="number"
          endContent={<span className="text-sm">Seconds</span>}
          value={value.startat.toString()}
          onChange={(e) => onChange('startat', e.target.value)}
        />
      </div>
    </div>
  );
};

export default StopCountdownSection;
