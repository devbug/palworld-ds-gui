/* eslint-disable no-prototype-builtins */
import {
  Button,
  Divider,
  Input,
  Switch,
  Card,
  CardBody,
  CardHeader
} from '@nextui-org/react';
import Layout from '../../components/layout';
import useServerConfig from '../../hooks/use-server-config';
import { configTypes, ConfigKey } from '../../types/server-config';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  if (type === 'string' || type === 'number' || type === 'tuple') {
    return <Input label={label} value={value} onChange={onChange} {...rest} />;
  }

  if (type === 'boolean') {
    return (
      <Switch isSelected={value} onChange={onToggleSwitch} {...rest}>
        {label}
      </Switch>
    );
  }

  return null;
};

// 카테고리별 설정 키 (Palworld 1.0 기준)
const configCategories: Record<string, ConfigKey[]> = {
  serverBasic: [
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
    ConfigKey.bAllowClientMod,
    ConfigKey.bIsShowJoinLeftMessage
  ],
  gameplay: [
    ConfigKey.Difficulty,
    ConfigKey.ExpRate,
    ConfigKey.PalCaptureRate,
    ConfigKey.PalSpawnNumRate,
    ConfigKey.WorkSpeedRate,
    ConfigKey.DayTimeSpeedRate,
    ConfigKey.NightTimeSpeedRate,
    ConfigKey.AutoSaveSpan
  ],
  damage: [
    ConfigKey.PalDamageRateAttack,
    ConfigKey.PalDamageRateDefense,
    ConfigKey.PlayerDamageRateAttack,
    ConfigKey.PlayerDamageRateDefense,
    ConfigKey.BuildObjectHpRate,
    ConfigKey.BuildObjectDamageRate,
    ConfigKey.BuildObjectDeteriorationDamageRate,
    ConfigKey.EquipmentDurabilityDamageRate
  ],
  survival: [
    ConfigKey.PlayerStomachDecreaceRate,
    ConfigKey.PlayerStaminaDecreaceRate,
    ConfigKey.PlayerAutoHPRegeneRate,
    ConfigKey.PlayerAutoHpRegeneRateInSleep,
    ConfigKey.PalStomachDecreaceRate,
    ConfigKey.PalStaminaDecreaceRate,
    ConfigKey.PalAutoHPRegeneRate,
    ConfigKey.PalAutoHpRegeneRateInSleep,
    ConfigKey.DeathPenalty
  ],
  items: [
    ConfigKey.CollectionDropRate,
    ConfigKey.CollectionObjectHpRate,
    ConfigKey.CollectionObjectRespawnSpeedRate,
    ConfigKey.EnemyDropItemRate,
    ConfigKey.DropItemMaxNum,
    ConfigKey.DropItemAliveMaxHours,
    ConfigKey.ItemWeightRate,
    ConfigKey.ItemCorruptionMultiplier,
    ConfigKey.PhysicsActiveDropItemMaxNum
  ],
  baseCamp: [
    ConfigKey.BaseCampMaxNum,
    ConfigKey.BaseCampWorkerMaxNum,
    ConfigKey.BaseCampMaxNumInGuild,
    ConfigKey.MaxBuildingLimitNum,
    ConfigKey.bEnableBuildingPlayerUIdDisplay
  ],
  guild: [
    ConfigKey.GuildPlayerMaxNum,
    ConfigKey.bAutoResetGuildNoOnlinePlayers,
    ConfigKey.AutoResetGuildTimeNoOnlinePlayers,
    ConfigKey.GuildRejoinCooldownMinutes,
    ConfigKey.AutoTransferMasterCheckIntervalSeconds,
    ConfigKey.AutoTransferMasterThresholdDays
  ],
  player: [
    ConfigKey.CoopPlayerMaxNum,
    ConfigKey.bEnablePlayerToPlayerDamage,
    ConfigKey.bEnableFriendlyFire,
    ConfigKey.bCanPickupOtherGuildDeathPenaltyDrop
  ],
  gameMode: [
    ConfigKey.bIsMultiplay,
    ConfigKey.bIsPvP,
    ConfigKey.bHardcore,
    ConfigKey.bPalLost,
    ConfigKey.bCharacterRecreateInHardcore
  ],
  pvp: [
    ConfigKey.bDisplayPvPItemNumOnWorldMap_BaseCamp,
    ConfigKey.bDisplayPvPItemNumOnWorldMap_Player,
    ConfigKey.bAdditionalDropItemWhenPlayerKillingInPvPMode,
    ConfigKey.AdditionalDropItemWhenPlayerKillingInPvPMode,
    ConfigKey.AdditionalDropItemNumWhenPlayerKillingInPvPMode,
    ConfigKey.BlockRespawnTime,
    ConfigKey.RespawnPenaltyDurationThreshold,
    ConfigKey.RespawnPenaltyTimeScale
  ],
  features: [
    ConfigKey.bEnableFastTravel,
    ConfigKey.bEnableFastTravelOnlyBaseCamp,
    ConfigKey.bEnableInvaderEnemy,
    ConfigKey.EnablePredatorBossPal,
    ConfigKey.bEnableNonLoginPenalty,
    ConfigKey.bIsStartLocationSelectByMap,
    ConfigKey.bExistPlayerAfterLogout,
    ConfigKey.bEnableDefenseOtherGuildPlayer,
    ConfigKey.bInvisibleOtherGuildBaseCampAreaFX,
    ConfigKey.bShowPlayerList,
    ConfigKey.bIsUseBackupSaveData
  ],
  statEnhance: [
    ConfigKey.bAllowEnhanceStat_Health,
    ConfigKey.bAllowEnhanceStat_Attack,
    ConfigKey.bAllowEnhanceStat_Stamina,
    ConfigKey.bAllowEnhanceStat_Weight,
    ConfigKey.bAllowEnhanceStat_WorkSpeed
  ],
  voiceChat: [
    ConfigKey.bEnableVoiceChat,
    ConfigKey.VoiceChatMaxVolumeDistance,
    ConfigKey.VoiceChatZeroVolumeDistance
  ],
  pals: [
    ConfigKey.PalEggDefaultHatchingTime,
    ConfigKey.MonsterFarmActionSpeedRate,
    ConfigKey.bAllowGlobalPalboxExport,
    ConfigKey.bAllowGlobalPalboxImport,
    ConfigKey.bIsRandomizerPalLevelRandom,
    ConfigKey.RandomizerSeed,
    ConfigKey.RandomizerType
  ],
  performance: [
    ConfigKey.ServerReplicatePawnCullDistance,
    ConfigKey.MaxGuildsPerFrame,
    ConfigKey.ItemContainerForceMarkDirtyInterval,
    ConfigKey.PlayerDataPalStorageUpdateCheckTickInterval,
    ConfigKey.BuildingNameDisplayCacheTTLSeconds
  ],
  misc: [
    ConfigKey.bActiveUNKO,
    ConfigKey.DropItemMaxNum_UNKO,
    ConfigKey.bEnableAimAssistPad,
    ConfigKey.bEnableAimAssistKeyboard,
    ConfigKey.bBuildAreaLimit,
    ConfigKey.ChatPostLimitPerMinute,
    ConfigKey.CrossplayPlatforms,
    ConfigKey.DenyTechnologyList,
    ConfigKey.LogFormatType,
    ConfigKey.SupplyDropSpan
  ]
};

const ServerSettings = () => {
  const { t } = useTranslation();
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
    notifySuccess(t('serverSettings.saved'));
  };

  useEffect(() => {
    // trigger a re-render when the currentConfig or currentSaveName changes (eg: other client changed the config)
    setConfig(currentConfig);
    setSaveName(currentSaveName);
  }, [currentConfig, currentSaveName]);

  const renderConfigCategory = (categoryKey: string, configKeys: string[]) => {
    return (
      <Card key={categoryKey} className="mb-4">
        <CardHeader>
          <h3 className="text-lg font-semibold">
            {t(`configCategory.${categoryKey}`)}
          </h3>
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
                  label={t(`config.${key}`)}
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
      title={t('serverSettings.title')}
      subtitle={t('serverSettings.subtitle')}
    >
      <div className="flex flex-col gap-4 mb-8">
        {config &&
          Object.keys(configCategories).map((categoryKey) =>
            renderConfigCategory(categoryKey, configCategories[categoryKey])
          )}

        <Divider className="mt-4 mb-4" />

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">
              {t('serverSettings.saveSection')}
            </h3>
          </CardHeader>
          <CardBody>
            <Input
              label={t('serverSettings.saveName')}
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
                {t('serverSettings.saveNameEmptyHelp')}
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
          {t('common.save')}
        </Button>
      </div>
    </Layout>
  );
};

export default ServerSettings;
