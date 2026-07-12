/* eslint-disable no-prototype-builtins */
import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Switch,
  Card,
  CardBody,
  CardHeader,
  Tooltip
} from '@nextui-org/react';
import { IconRestore } from '@tabler/icons-react';
import Layout from '../../components/layout';
import useServerConfig from '../../hooks/use-server-config';
import {
  configTypes,
  configDefaults,
  configSelectOptions,
  KNOWN_CROSSPLAY_PLATFORMS,
  ConfigKey
} from '../../types/server-config';
import {
  isConfigValueChanged,
  parsePlatformList,
  serializePlatformList
} from '../../helpers/config-values';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useServerSaveName from '../../hooks/use-server-save-name.ts';
import { ServerAPI } from '../../server.ts';
import { notifySuccess } from '../../actions/app.ts';

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
  const [saveNameError, setSaveNameError] = useState(false);

  const validate = () => {
    const saveNameRegex = /^[0-9a-fA-F]{32}$/;

    if (saveName && !saveNameRegex.test(saveName)) {
      setSaveNameError(true);

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

  const setConfigValue = (key: string, value: unknown) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const renderConfigInput = (key: ConfigKey, isChanged: boolean) => {
    const type = configTypes[key];
    const value = config[key];
    const label = t(`config.${key}`);
    const options = configSelectOptions[key];

    if (options) {
      // 파일에 목록 밖의 값이 있으면(수동 편집 등) 선택지에 추가해 보존한다.
      const currentValue = String(value ?? '');
      const optionList =
        currentValue && !options.includes(currentValue)
          ? [...options, currentValue]
          : options;

      return (
        <Select
          label={label}
          color={isChanged ? 'warning' : 'default'}
          selectedKeys={[currentValue]}
          disallowEmptySelection
          onChange={(e) => {
            if (e.target.value) setConfigValue(key, e.target.value);
          }}
        >
          {optionList.map((option) => (
            <SelectItem key={option} value={option}>
              {t(`configOption.${key}.${option}`, option)}
            </SelectItem>
          ))}
        </Select>
      );
    }

    if (type === 'tuple') {
      const selected = parsePlatformList(String(value ?? ''));
      const platformList = Array.from(
        new Set([...KNOWN_CROSSPLAY_PLATFORMS, ...selected])
      );

      return (
        <Select
          label={label}
          color={isChanged ? 'warning' : 'default'}
          selectionMode="multiple"
          disallowEmptySelection
          selectedKeys={new Set(selected)}
          onSelectionChange={(keys) => {
            if (keys === 'all') return;

            setConfigValue(
              key,
              serializePlatformList(Array.from(keys) as string[])
            );
          }}
        >
          {platformList.map((platform) => (
            <SelectItem key={platform} value={platform}>
              {platform}
            </SelectItem>
          ))}
        </Select>
      );
    }

    if (type === 'boolean') {
      return (
        <Switch
          name={key}
          isSelected={!!value}
          onChange={() => setConfigValue(key, !value)}
        >
          <span className={isChanged ? 'text-warning' : ''}>{label}</span>
        </Switch>
      );
    }

    return (
      <Input
        autoComplete="off"
        name={key}
        label={label}
        color={isChanged ? 'warning' : 'default'}
        value={String(value ?? '')}
        onChange={(e) => setConfigValue(key, e.target.value)}
      />
    );
  };

  const renderConfigItem = (key: ConfigKey) => {
    if (!config || !config.hasOwnProperty(key)) return null;

    const isChanged = isConfigValueChanged(key, config[key]);
    const defaultValue = configDefaults[key];
    const displayDefault =
      typeof defaultValue === 'boolean'
        ? defaultValue
          ? 'True'
          : 'False'
        : defaultValue === ''
        ? t('serverSettings.emptyValue')
        : String(defaultValue);

    return (
      <div key={key} className="flex items-center gap-1">
        <Tooltip
          content={t('serverSettings.defaultValue', { value: displayDefault })}
          placement="top-start"
          delay={400}
          closeDelay={0}
        >
          <div className="flex-1 min-w-0">
            {renderConfigInput(key, isChanged)}
          </div>
        </Tooltip>

        <div className="w-8 shrink-0">
          {isChanged && (
            <Tooltip content={t('serverSettings.resetToDefault')}>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onClick={() => setConfigValue(key, defaultValue)}
              >
                <IconRestore size="1rem" />
              </Button>
            </Tooltip>
          )}
        </div>
      </div>
    );
  };

  const renderConfigCategory = (
    categoryKey: string,
    configKeys: ConfigKey[]
  ) => {
    return (
      <Card key={categoryKey} className="mb-4">
        <CardHeader>
          <h3 className="text-lg font-semibold">
            {t(`configCategory.${categoryKey}`)}
          </h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {configKeys.map((key) => renderConfigItem(key))}
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
              isInvalid={saveNameError}
              onChange={(e) => {
                setSaveNameError(false);
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
