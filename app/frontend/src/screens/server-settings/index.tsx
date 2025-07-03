import { Button, Divider, Input, Switch, Card, CardBody, CardHeader } from '@nextui-org/react';
import Layout from '../../components/layout';
import useServerConfig from '../../hooks/use-server-config';
import { configLabels, configTypes, ConfigKey } from '../../types/server-config';
import { useEffect, useState } from 'react';
import useServerSaveName from '../../hooks/use-server-save-name.ts';
import { TGenericObject } from '../../types/index.ts';
import { ServerAPI } from '../../server.ts';
import { notifySuccess } from '../../actions/app.ts';

const InputProvider = ({
  label,
  value,
  type,
  onChange,
  onToggleSwitch,
  ...rest
}) => {
  if (type === 'string' || type === 'number') {
    return <Input label={label} value={value} onChange={onChange} {...rest} />;
  }

  if (type === 'boolean') {
    return (
      <Switch
        isSelected={value}
        onChange={onToggleSwitch}
        {...rest}
      >
        {label}
      </Switch>
    );
  }

  return null;
};

// 설정 카테고리 정의
const configCategories = {
  '서버 기본 설정': [
    ConfigKey.ServerName,
    ConfigKey.ServerDescription,
    ConfigKey.ServerPassword,
    ConfigKey.PublicIP,
    ConfigKey.PublicPort,
    ConfigKey.ServerPlayerMaxNum,
    ConfigKey.AdminPassword,
    ConfigKey.RCONEnabled,
    ConfigKey.RCONPort,
    ConfigKey.RESTAPIEnabled,
    ConfigKey.RESTAPIPort,
    ConfigKey.Region,
    ConfigKey.bUseAuth,
    ConfigKey.BanListURL,
  ],
  '게임플레이 설정': [
    ConfigKey.Difficulty,
    ConfigKey.ExpRate,
    ConfigKey.PalCaptureRate,
    ConfigKey.PalSpawnNumRate,
    ConfigKey.WorkSpeedRate,
    ConfigKey.DayTimeSpeedRate,
    ConfigKey.NightTimeSpeedRate,
    ConfigKey.AutoSaveSpan,
  ],
  '데미지 설정': [
    ConfigKey.PalDamageRateAttack,
    ConfigKey.PalDamageRateDefense,
    ConfigKey.PlayerDamageRateAttack,
    ConfigKey.PlayerDamageRateDefense,
    ConfigKey.BuildObjectDamageRate,
    ConfigKey.BuildObjectDeteriorationDamageRate,
    ConfigKey.EquipmentDurabilityDamageRate,
  ],
  '생존 설정': [
    ConfigKey.PlayerStomachDecreaseRate,
    ConfigKey.PlayerStaminaDecreaseRate,
    ConfigKey.PlayerAutoHPRegeneRate,
    ConfigKey.PlayerAutoHpRegeneRateInSleep,
    ConfigKey.PalStomachDecreaseRate,
    ConfigKey.PalStaminaDecreaseRate,
    ConfigKey.PalAutoHPRegeneRate,
    ConfigKey.PalAutoHpRegeneRateInSleep,
    ConfigKey.DeathPenalty,
  ],
  '아이템 설정': [
    ConfigKey.CollectionDropRate,
    ConfigKey.CollectionObjectHpRate,
    ConfigKey.CollectionObjectRespawnSpeedRate,
    ConfigKey.EnemyDropItemRate,
    ConfigKey.DropItemMaxNum,
    ConfigKey.DropItemAliveMaxHours,
    ConfigKey.ItemWeightRate,
    ConfigKey.ItemContainerForceMarkDirtyInterval,
  ],
  '베이스캠프 설정': [
    ConfigKey.BaseCampMaxNum,
    ConfigKey.BaseCampWorkerMaxNum,
    ConfigKey.BaseCampMaxNumInGuild,
    ConfigKey.MaxBuildingLimitNum,
  ],
  '길드 설정': [
    ConfigKey.GuildPlayerMaxNum,
    ConfigKey.bAutoResetGuildNoOnlinePlayers,
    ConfigKey.AutoResetGuildTimeNoOnlinePlayers,
  ],
  '플레이어 설정': [
    ConfigKey.CoopPlayerMaxNum,
    ConfigKey.bEnablePlayerToPlayerDamage,
    ConfigKey.bEnableFriendlyFire,
    ConfigKey.bCanPickupOtherGuildDeathPenaltyDrop,
  ],
  '게임 모드 설정': [
    ConfigKey.bIsMultiplay,
    ConfigKey.bIsPvP,
    ConfigKey.bHardcore,
    ConfigKey.bPalLost,
    ConfigKey.bCharacterRecreateInHardcore,
  ],
  '기능 설정': [
    ConfigKey.bEnableFastTravel,
    ConfigKey.bEnableInvaderEnemy,
    ConfigKey.bEnableNonLoginPenalty,
    ConfigKey.bIsStartLocationSelectByMap,
    ConfigKey.bExistPlayerAfterLogout,
    ConfigKey.bEnableDefenseOtherGuildPlayer,
    ConfigKey.bInvisibleOtherGuildBaseCampAreaFX,
    ConfigKey.bShowPlayerList,
    ConfigKey.bIsUseBackupSaveData,
  ],
  '팰 설정': [
    ConfigKey.PalEggDefaultHatchingTime,
    ConfigKey.bAllowGlobalPalboxExport,
    ConfigKey.bAllowGlobalPalboxImport,
    ConfigKey.bIsRandomizerPalLevelRandom,
    ConfigKey.RandomizerSeed,
    ConfigKey.RandomizerType,
  ],
  '기타 설정': [
    ConfigKey.bActiveUNKO,
    ConfigKey.DropItemMaxNum_UNKO,
    ConfigKey.bEnableAimAssistPad,
    ConfigKey.bEnableAimAssistKeyboard,
    ConfigKey.bBuildAreaLimit,
    ConfigKey.ChatPostLimitPerMinute,
    ConfigKey.CrossplayPlatforms,
    ConfigKey.AllowConnectPlatform,
    ConfigKey.LogFormatType,
    ConfigKey.SupplyDropSpan,
    ConfigKey.ServerReplicatePawnCullDistance,
  ],
};

const ServerSettings = () => {
  const currentConfig = useServerConfig();
  const currentSaveName = useServerSaveName();
  const [config, setConfig] = useState(currentConfig);
  const [saveName, setSaveName] = useState(currentSaveName);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<TGenericObject>({});

  const validate = () => {
    const saveNameRegex = /^[0-9a-fA-F]{32}$/;

    if (saveName && !saveNameRegex.test(saveName)) {
      setErrors((prev) => ({
        ...prev,
        saveName: true
      }));

      return false;
    }

    return true;
  };

  const onSaveClick = async () => {
    if (!validate()) return;

    setIsSaving(true);
    await ServerAPI.writeConfig(config);

    if (saveName) {
      await ServerAPI.writeSaveName(saveName);
    }

    setIsSaving(false);
    notifySuccess('Game settings saved');
  };

  useEffect(() => {
    // trigger a re-render when the currentConfig or currentSaveName changes (eg: other client changed the config)
    setConfig(currentConfig);
    setSaveName(currentSaveName);
  }, [currentConfig, currentSaveName]);

  const renderConfigCategory = (categoryName: string, configKeys: string[]) => {
    return (
      <Card key={categoryName} className="mb-4">
        <CardHeader>
          <h3 className="text-lg font-semibold">{categoryName}</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {configKeys.map((key) => {
              if (!config || !config.hasOwnProperty(key)) return null;
              
              return (
                <InputProvider
                  autocomplete="off"
                  key={key}
                  name={key}
                  label={configLabels[key]}
                  value={config[key]}
                  type={configTypes[key]}
                  onChange={(e) => {
                    setConfig((prev) => ({
                      ...prev,
                      [key]: e.target.value
                    }));

                    if (errors[key]) {
                      setErrors((prev) => ({
                        ...prev,
                        [key]: ''
                      }));
                    }
                  }}
                  onToggleSwitch={() => {
                    setConfig((prev) => ({
                      ...prev,
                      [key]: !config[key]
                    }));
                  }}
                />
              );
            })}
          </div>
        </CardBody>
      </Card>
    );
  };

  return (
    <Layout
      className="relative flex flex-col gap-4"
      title="Game Settings"
      subtitle="Server must be restarted for changes to take effect"
    >
      <div className="flex flex-col gap-4 mb-8">
        {config && Object.keys(configCategories).map((categoryName) =>
          renderConfigCategory(categoryName, configCategories[categoryName])
        )}

        <Divider className="mt-4 mb-4" />

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">세이브 설정</h3>
          </CardHeader>
          <CardBody>
            <Input
              label="Save Name"
              name="saveName"
              value={saveName}
              isInvalid={!!errors.saveName}
              onChange={(e) => {
                setErrors((prev) => ({
                  ...prev,
                  saveName: ''
                }));
                setSaveName(e.target.value);
              }}
            />

            {!currentSaveName && (
              <p className="text-danger-300 text-xs mt-2">
                Save name is empty, which means you probably never joined the
                server. To change this value, you must first join the server once.
              </p>
            )}
          </CardBody>
        </Card>
      </div>

      <div className="fixed w-fit bottom-4 right-10">
        <Button
          variant="shadow"
          color="primary"
          onClick={onSaveClick}
          isLoading={isSaving}
        >
          Save
        </Button>
      </div>
    </Layout>
  );
};

export default ServerSettings;
