/* eslint-disable no-prototype-builtins */
import { ConfigKey, TConfig, configTypes } from '../types/server-config';

const getSubstringBetweenStrings = (inputString, startString, endString) => {
  let startIndex = inputString.indexOf(startString);

  if (startIndex !== -1) {
    startIndex += startString.length;

    const endIndex = inputString.indexOf(endString, startIndex);

    if (endIndex !== -1) {
      return inputString.substring(startIndex, endIndex);
    }

    return '';
  }

  return '';
};

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
  ConfigKey.BuildObjectDamageRate,
  ConfigKey.BuildObjectDeteriorationDamageRate,
  ConfigKey.EquipmentDurabilityDamageRate,
  
  // 생존 설정
  ConfigKey.PlayerStomachDecreaseRate,
  ConfigKey.PlayerStaminaDecreaseRate,
  ConfigKey.PlayerAutoHPRegeneRate,
  ConfigKey.PlayerAutoHpRegeneRateInSleep,
  ConfigKey.PalStomachDecreaseRate,
  ConfigKey.PalStaminaDecreaseRate,
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
  ConfigKey.ItemContainerForceMarkDirtyInterval,
  
  // 베이스캠프 설정
  ConfigKey.BaseCampMaxNum,
  ConfigKey.BaseCampWorkerMaxNum,
  ConfigKey.BaseCampMaxNumInGuild,
  ConfigKey.MaxBuildingLimitNum,
  
  // 길드 설정
  ConfigKey.GuildPlayerMaxNum,
  ConfigKey.bAutoResetGuildNoOnlinePlayers,
  ConfigKey.AutoResetGuildTimeNoOnlinePlayers,
  
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
  
  // 기능 설정
  ConfigKey.bEnableFastTravel,
  ConfigKey.bEnableInvaderEnemy,
  ConfigKey.bEnableNonLoginPenalty,
  ConfigKey.bIsStartLocationSelectByMap,
  ConfigKey.bExistPlayerAfterLogout,
  ConfigKey.bEnableDefenseOtherGuildPlayer,
  ConfigKey.bInvisibleOtherGuildBaseCampAreaFX,
  ConfigKey.bShowPlayerList,
  ConfigKey.bIsUseBackupSaveData,
  
  // 팰 설정
  ConfigKey.PalEggDefaultHatchingTime,
  ConfigKey.bAllowGlobalPalboxExport,
  ConfigKey.bAllowGlobalPalboxImport,
  ConfigKey.bIsRandomizerPalLevelRandom,
  ConfigKey.RandomizerSeed,
  ConfigKey.RandomizerType,
  
  // 기타 설정
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
  
  // 오타 수정된 설정들 (하위 호환성)
  ConfigKey.PalStaminaDecreaceRate,
  ConfigKey.PalStomachDecreaceRate,
  ConfigKey.PlayerStaminaDecreaceRate,
  ConfigKey.PlayerStomachDecreaceRate
];

// 새로운 설정들의 기본값
const defaultValues = {
  [ConfigKey.bAllowGlobalPalboxExport]: false,
  [ConfigKey.bAllowGlobalPalboxImport]: false,
  [ConfigKey.bBuildAreaLimit]: false,
  [ConfigKey.bCharacterRecreateInHardcore]: false,
  [ConfigKey.bHardcore]: false,
  [ConfigKey.bIsRandomizerPalLevelRandom]: false,
  [ConfigKey.bPalLost]: false,
  [ConfigKey.ChatPostLimitPerMinute]: 10,
  [ConfigKey.CrossplayPlatforms]: '(Steam,Xbox,PS5,Mac)',
  [ConfigKey.EquipmentDurabilityDamageRate]: 1.0,
  [ConfigKey.ItemContainerForceMarkDirtyInterval]: 5,
  [ConfigKey.ItemWeightRate]: 1.0,
  [ConfigKey.MaxBuildingLimitNum]: 0,
  [ConfigKey.RandomizerSeed]: 0,
  [ConfigKey.RandomizerType]: 'None',
  [ConfigKey.ServerReplicatePawnCullDistance]: 10000
};

export const parseConfig = (config: string) => {
  const optionSettingsString = getSubstringBetweenStrings(
    config,
    'OptionSettings=(',
    ')'
  );

  const settings = {};

  optionSettingsString.split(',').forEach((setting) => {
    const [key, value] = setting.split('=')?.map((s) => s.trim()) || [];

    if (configTypes[key] === 'number') {
      settings[key] = parseFloat(value);
    } else if (configTypes[key] === 'boolean') {
      settings[key] = value === 'True';
    } else {
      // string or unknown
      settings[key] = value?.replace(/"/g, '') || '';
    }
  });

  // 새로운 설정들의 기본값 추가
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

export const serializeConfig = (config: TConfig) => {
  const template = `; This configuration file was generated by PalWorld Dedicated Server GUI
; https://github.com/cenas
[/Script/Pal.PalGameWorldSettings]
OptionSettings=({__SETTINGS__})`;

  const settings: string[] = [];

  for (const key in config) {
    if (config.hasOwnProperty(key)) {
      const value = config[key];
      const sanitizedValue = value.toString()?.replace?.(/"/g, '') || '';

      if (configTypes[key] === 'string') {
        settings.push(`${key}="${sanitizedValue}"`);
      } else if (configTypes[key] === 'boolean') {
        settings.push(`${key}=${value ? 'True' : 'False'}`);
      } else {
        settings.push(`${key}=${sanitizedValue}`);
      }
    }
  }

  return template.replace('{__SETTINGS__}', settings.join(','));
};
