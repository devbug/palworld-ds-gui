/* eslint-disable no-prototype-builtins */
import { ConfigKey, TConfig, configTypes } from '../types/server-config';

const OPTION_SETTINGS_MARKER = 'OptionSettings=(';

// OptionSettings=( ... ) 내부를 괄호 짝과 따옴표를 인식하며 추출한다.
// 값에 (Steam,Xbox,PS5,Mac) 같은 중첩 괄호가 있어도 잘리지 않는다.
const extractOptionSettings = (config: string): string => {
  const markerIndex = config.indexOf(OPTION_SETTINGS_MARKER);

  if (markerIndex === -1) return '';

  const start = markerIndex + OPTION_SETTINGS_MARKER.length;
  let depth = 1;
  let inQuotes = false;

  for (let i = start; i < config.length; i++) {
    const char = config[i];

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (inQuotes) continue;

    if (char === '(') depth++;

    if (char === ')') {
      depth--;

      if (depth === 0) return config.substring(start, i);
    }
  }

  return config.substring(start);
};

// 최상위 콤마로만 분리한다. 따옴표 안이나 괄호 안의 콤마는 값의 일부로 취급.
const splitTopLevelEntries = (body: string): string[] => {
  const entries: string[] = [];
  let current = '';
  let depth = 0;
  let inQuotes = false;

  for (const char of body) {
    if (char === '"') inQuotes = !inQuotes;

    if (!inQuotes) {
      if (char === '(') depth++;
      if (char === ')') depth--;

      if (char === ',' && depth === 0) {
        entries.push(current);
        current = '';
        continue;
      }
    }

    current += char;
  }

  if (current) entries.push(current);

  return entries;
};

const stripSurroundingQuotes = (value: string): string => {
  if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
    return value.substring(1, value.length - 1);
  }

  return value;
};

// UI 표시 및 저장 시 키 순서 (설정 화면 카테고리 순서와 일치)
const keyOrder = [
  // 서버 기본 설정
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
  ConfigKey.bIsShowJoinLeftMessage,

  // 게임플레이 설정
  ConfigKey.Difficulty,
  ConfigKey.ExpRate,
  ConfigKey.PalCaptureRate,
  ConfigKey.PalSpawnNumRate,
  ConfigKey.WorkSpeedRate,
  ConfigKey.DayTimeSpeedRate,
  ConfigKey.NightTimeSpeedRate,
  ConfigKey.AutoSaveSpan,

  // 데미지 설정
  ConfigKey.PalDamageRateAttack,
  ConfigKey.PalDamageRateDefense,
  ConfigKey.PlayerDamageRateAttack,
  ConfigKey.PlayerDamageRateDefense,
  ConfigKey.BuildObjectHpRate,
  ConfigKey.BuildObjectDamageRate,
  ConfigKey.BuildObjectDeteriorationDamageRate,
  ConfigKey.EquipmentDurabilityDamageRate,

  // 생존 설정
  ConfigKey.PlayerStomachDecreaceRate,
  ConfigKey.PlayerStaminaDecreaceRate,
  ConfigKey.PlayerAutoHPRegeneRate,
  ConfigKey.PlayerAutoHpRegeneRateInSleep,
  ConfigKey.PalStomachDecreaceRate,
  ConfigKey.PalStaminaDecreaceRate,
  ConfigKey.PalAutoHPRegeneRate,
  ConfigKey.PalAutoHpRegeneRateInSleep,
  ConfigKey.DeathPenalty,

  // 아이템 설정
  ConfigKey.CollectionDropRate,
  ConfigKey.CollectionObjectHpRate,
  ConfigKey.CollectionObjectRespawnSpeedRate,
  ConfigKey.EnemyDropItemRate,
  ConfigKey.DropItemMaxNum,
  ConfigKey.DropItemAliveMaxHours,
  ConfigKey.ItemWeightRate,
  ConfigKey.ItemCorruptionMultiplier,
  ConfigKey.PhysicsActiveDropItemMaxNum,

  // 베이스캠프 설정
  ConfigKey.BaseCampMaxNum,
  ConfigKey.BaseCampWorkerMaxNum,
  ConfigKey.BaseCampMaxNumInGuild,
  ConfigKey.MaxBuildingLimitNum,
  ConfigKey.bEnableBuildingPlayerUIdDisplay,

  // 길드 설정
  ConfigKey.GuildPlayerMaxNum,
  ConfigKey.bAutoResetGuildNoOnlinePlayers,
  ConfigKey.AutoResetGuildTimeNoOnlinePlayers,
  ConfigKey.GuildRejoinCooldownMinutes,
  ConfigKey.AutoTransferMasterCheckIntervalSeconds,
  ConfigKey.AutoTransferMasterThresholdDays,

  // 플레이어 설정
  ConfigKey.CoopPlayerMaxNum,
  ConfigKey.bEnablePlayerToPlayerDamage,
  ConfigKey.bEnableFriendlyFire,
  ConfigKey.bCanPickupOtherGuildDeathPenaltyDrop,

  // 게임 모드 설정
  ConfigKey.bIsMultiplay,
  ConfigKey.bIsPvP,
  ConfigKey.bHardcore,
  ConfigKey.bPalLost,
  ConfigKey.bCharacterRecreateInHardcore,

  // PvP 설정
  ConfigKey.bDisplayPvPItemNumOnWorldMap_BaseCamp,
  ConfigKey.bDisplayPvPItemNumOnWorldMap_Player,
  ConfigKey.bAdditionalDropItemWhenPlayerKillingInPvPMode,
  ConfigKey.AdditionalDropItemWhenPlayerKillingInPvPMode,
  ConfigKey.AdditionalDropItemNumWhenPlayerKillingInPvPMode,
  ConfigKey.BlockRespawnTime,
  ConfigKey.RespawnPenaltyDurationThreshold,
  ConfigKey.RespawnPenaltyTimeScale,

  // 기능 설정
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
  ConfigKey.bIsUseBackupSaveData,

  // 스탯 강화 설정
  ConfigKey.bAllowEnhanceStat_Health,
  ConfigKey.bAllowEnhanceStat_Attack,
  ConfigKey.bAllowEnhanceStat_Stamina,
  ConfigKey.bAllowEnhanceStat_Weight,
  ConfigKey.bAllowEnhanceStat_WorkSpeed,

  // 보이스챗 설정
  ConfigKey.bEnableVoiceChat,
  ConfigKey.VoiceChatMaxVolumeDistance,
  ConfigKey.VoiceChatZeroVolumeDistance,

  // 팰 설정
  ConfigKey.PalEggDefaultHatchingTime,
  ConfigKey.MonsterFarmActionSpeedRate,
  ConfigKey.bAllowGlobalPalboxExport,
  ConfigKey.bAllowGlobalPalboxImport,
  ConfigKey.bIsRandomizerPalLevelRandom,
  ConfigKey.RandomizerSeed,
  ConfigKey.RandomizerType,

  // 성능 설정
  ConfigKey.ServerReplicatePawnCullDistance,
  ConfigKey.MaxGuildsPerFrame,
  ConfigKey.ItemContainerForceMarkDirtyInterval,
  ConfigKey.PlayerDataPalStorageUpdateCheckTickInterval,
  ConfigKey.BuildingNameDisplayCacheTTLSeconds,

  // 기타 설정
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
];

// 설정 파일에 없는 키에 주입할 기본값 (Palworld 1.0 DefaultPalWorldSettings.ini 기준).
// 구버전 팰월드로 생성된 설정 파일을 열어도 1.0 신규 설정이 UI에 표시되게 한다.
const defaultValues: Partial<TConfig> = {
  [ConfigKey.bAllowGlobalPalboxExport]: true,
  [ConfigKey.bAllowGlobalPalboxImport]: false,
  [ConfigKey.bBuildAreaLimit]: false,
  [ConfigKey.bCharacterRecreateInHardcore]: false,
  [ConfigKey.bHardcore]: false,
  [ConfigKey.bIsRandomizerPalLevelRandom]: false,
  [ConfigKey.bPalLost]: false,
  [ConfigKey.ChatPostLimitPerMinute]: 30,
  [ConfigKey.CrossplayPlatforms]: '(Steam,Xbox,PS5,Mac)',
  [ConfigKey.EquipmentDurabilityDamageRate]: 1.0,
  [ConfigKey.ItemContainerForceMarkDirtyInterval]: 1.0,
  [ConfigKey.ItemWeightRate]: 1.0,
  [ConfigKey.MaxBuildingLimitNum]: 0,
  [ConfigKey.RandomizerSeed]: '',
  [ConfigKey.RandomizerType]: 'None',
  [ConfigKey.ServerReplicatePawnCullDistance]: 15000,

  // v1.0에서 추가된 설정들
  [ConfigKey.PhysicsActiveDropItemMaxNum]: -1,
  [ConfigKey.bEnableFastTravelOnlyBaseCamp]: false,
  [ConfigKey.bAllowClientMod]: true,
  [ConfigKey.bIsShowJoinLeftMessage]: true,
  [ConfigKey.EnablePredatorBossPal]: true,
  [ConfigKey.PlayerDataPalStorageUpdateCheckTickInterval]: 1.0,
  [ConfigKey.ItemCorruptionMultiplier]: 1.0,
  [ConfigKey.MonsterFarmActionSpeedRate]: 1.0,
  [ConfigKey.DenyTechnologyList]: '',
  [ConfigKey.GuildRejoinCooldownMinutes]: 0,
  [ConfigKey.AutoTransferMasterCheckIntervalSeconds]: 3600,
  [ConfigKey.AutoTransferMasterThresholdDays]: 14,
  [ConfigKey.MaxGuildsPerFrame]: 10,
  [ConfigKey.BlockRespawnTime]: 5,
  [ConfigKey.RespawnPenaltyDurationThreshold]: 0,
  [ConfigKey.RespawnPenaltyTimeScale]: 2,
  [ConfigKey.bDisplayPvPItemNumOnWorldMap_BaseCamp]: false,
  [ConfigKey.bDisplayPvPItemNumOnWorldMap_Player]: false,
  [ConfigKey.AdditionalDropItemWhenPlayerKillingInPvPMode]: 'PlayerDropItem',
  [ConfigKey.AdditionalDropItemNumWhenPlayerKillingInPvPMode]: 1,
  [ConfigKey.bAdditionalDropItemWhenPlayerKillingInPvPMode]: false,
  [ConfigKey.bEnableVoiceChat]: false,
  [ConfigKey.VoiceChatMaxVolumeDistance]: 3000,
  [ConfigKey.VoiceChatZeroVolumeDistance]: 15000,
  [ConfigKey.bAllowEnhanceStat_Health]: true,
  [ConfigKey.bAllowEnhanceStat_Attack]: true,
  [ConfigKey.bAllowEnhanceStat_Stamina]: true,
  [ConfigKey.bAllowEnhanceStat_Weight]: true,
  [ConfigKey.bAllowEnhanceStat_WorkSpeed]: true,
  [ConfigKey.bEnableBuildingPlayerUIdDisplay]: false,
  [ConfigKey.BuildingNameDisplayCacheTTLSeconds]: 60
};

export const parseConfig = (config: string): TConfig => {
  const entries = splitTopLevelEntries(extractOptionSettings(config));
  const settings = {};

  entries.forEach((entry) => {
    const separatorIndex = entry.indexOf('=');

    if (separatorIndex === -1) return;

    const key = entry.substring(0, separatorIndex).trim();
    const rawValue = entry.substring(separatorIndex + 1).trim();

    if (configTypes[key] === 'number') {
      settings[key] = parseFloat(rawValue);
    } else if (configTypes[key] === 'boolean') {
      settings[key] = rawValue === 'True';
    } else if (configTypes[key] === 'string') {
      settings[key] = stripSurroundingQuotes(rawValue);
    } else {
      // tuple 또는 스키마에 없는 미래의 키: 원본 그대로 보존해
      // 저장 시 게임이 인식하는 형식이 유지되도록 한다.
      settings[key] = rawValue;
    }
  });

  // 파일에 없는 설정에 기본값 주입
  Object.keys(defaultValues).forEach((key) => {
    if (!settings.hasOwnProperty(key)) {
      settings[key] = defaultValues[key];
    }
  });

  // Create a new object with sorted keys
  const sortedSettings = {};

  // Add keys in the desired order
  keyOrder.forEach((key) => {
    if (settings.hasOwnProperty(key)) {
      sortedSettings[key] = settings[key];
      delete settings[key];
    }
  });

  // Add the remaining keys
  for (const key in settings) {
    if (settings.hasOwnProperty(key)) {
      sortedSettings[key] = settings[key];
    }
  }

  return sortedSettings as TConfig;
};

export const serializeConfig = (config: TConfig): string => {
  const template = `; This configuration file was generated by PalWorld Dedicated Server GUI
; https://github.com/cenas
[/Script/Pal.PalGameWorldSettings]
OptionSettings=({__SETTINGS__})`;

  const settings: string[] = [];

  for (const key in config) {
    if (config.hasOwnProperty(key)) {
      const value = config[key];

      if (configTypes[key] === 'string') {
        settings.push(`${key}="${String(value).replace(/"/g, '')}"`);
      } else if (configTypes[key] === 'boolean') {
        settings.push(`${key}=${value ? 'True' : 'False'}`);
      } else if (configTypes[key] === 'number') {
        settings.push(`${key}=${value}`);
      } else {
        // tuple 또는 미지의 키: 파싱 때 보존한 원본 그대로 출력
        settings.push(`${key}=${value}`);
      }
    }
  }

  return template.replace('{__SETTINGS__}', settings.join(','));
};
