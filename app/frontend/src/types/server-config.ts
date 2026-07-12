export enum ConfigKey {
  Difficulty = 'Difficulty',
  RandomizerType = 'RandomizerType',
  RandomizerSeed = 'RandomizerSeed',
  bIsRandomizerPalLevelRandom = 'bIsRandomizerPalLevelRandom',
  DayTimeSpeedRate = 'DayTimeSpeedRate',
  NightTimeSpeedRate = 'NightTimeSpeedRate',
  ExpRate = 'ExpRate',
  PalCaptureRate = 'PalCaptureRate',
  PalSpawnNumRate = 'PalSpawnNumRate',
  PalDamageRateAttack = 'PalDamageRateAttack',
  PalDamageRateDefense = 'PalDamageRateDefense',
  PlayerDamageRateAttack = 'PlayerDamageRateAttack',
  PlayerDamageRateDefense = 'PlayerDamageRateDefense',
  PlayerStomachDecreaceRate = 'PlayerStomachDecreaceRate',
  PlayerStaminaDecreaceRate = 'PlayerStaminaDecreaceRate',
  PlayerAutoHPRegeneRate = 'PlayerAutoHPRegeneRate',
  PlayerAutoHpRegeneRateInSleep = 'PlayerAutoHpRegeneRateInSleep',
  PalStomachDecreaceRate = 'PalStomachDecreaceRate',
  PalStaminaDecreaceRate = 'PalStaminaDecreaceRate',
  PalAutoHPRegeneRate = 'PalAutoHPRegeneRate',
  PalAutoHpRegeneRateInSleep = 'PalAutoHpRegeneRateInSleep',
  BuildObjectHpRate = 'BuildObjectHpRate',
  BuildObjectDamageRate = 'BuildObjectDamageRate',
  BuildObjectDeteriorationDamageRate = 'BuildObjectDeteriorationDamageRate',
  CollectionDropRate = 'CollectionDropRate',
  CollectionObjectHpRate = 'CollectionObjectHpRate',
  CollectionObjectRespawnSpeedRate = 'CollectionObjectRespawnSpeedRate',
  EnemyDropItemRate = 'EnemyDropItemRate',
  DeathPenalty = 'DeathPenalty',
  bEnablePlayerToPlayerDamage = 'bEnablePlayerToPlayerDamage',
  bEnableFriendlyFire = 'bEnableFriendlyFire',
  bEnableInvaderEnemy = 'bEnableInvaderEnemy',
  bActiveUNKO = 'bActiveUNKO',
  bEnableAimAssistPad = 'bEnableAimAssistPad',
  bEnableAimAssistKeyboard = 'bEnableAimAssistKeyboard',
  DropItemMaxNum = 'DropItemMaxNum',
  DropItemMaxNum_UNKO = 'DropItemMaxNum_UNKO',
  BaseCampMaxNum = 'BaseCampMaxNum',
  BaseCampWorkerMaxNum = 'BaseCampWorkerMaxNum',
  DropItemAliveMaxHours = 'DropItemAliveMaxHours',
  bAutoResetGuildNoOnlinePlayers = 'bAutoResetGuildNoOnlinePlayers',
  AutoResetGuildTimeNoOnlinePlayers = 'AutoResetGuildTimeNoOnlinePlayers',
  GuildPlayerMaxNum = 'GuildPlayerMaxNum',
  BaseCampMaxNumInGuild = 'BaseCampMaxNumInGuild',
  PalEggDefaultHatchingTime = 'PalEggDefaultHatchingTime',
  WorkSpeedRate = 'WorkSpeedRate',
  AutoSaveSpan = 'AutoSaveSpan',
  bIsMultiplay = 'bIsMultiplay',
  bIsPvP = 'bIsPvP',
  bHardcore = 'bHardcore',
  bPalLost = 'bPalLost',
  bCharacterRecreateInHardcore = 'bCharacterRecreateInHardcore',
  bCanPickupOtherGuildDeathPenaltyDrop = 'bCanPickupOtherGuildDeathPenaltyDrop',
  bEnableNonLoginPenalty = 'bEnableNonLoginPenalty',
  bEnableFastTravel = 'bEnableFastTravel',
  bIsStartLocationSelectByMap = 'bIsStartLocationSelectByMap',
  bExistPlayerAfterLogout = 'bExistPlayerAfterLogout',
  bEnableDefenseOtherGuildPlayer = 'bEnableDefenseOtherGuildPlayer',
  bInvisibleOtherGuildBaseCampAreaFX = 'bInvisibleOtherGuildBaseCampAreaFX',
  bBuildAreaLimit = 'bBuildAreaLimit',
  ItemWeightRate = 'ItemWeightRate',
  CoopPlayerMaxNum = 'CoopPlayerMaxNum',
  ServerPlayerMaxNum = 'ServerPlayerMaxNum',
  ServerName = 'ServerName',
  ServerDescription = 'ServerDescription',
  AdminPassword = 'AdminPassword',
  ServerPassword = 'ServerPassword',
  PublicPort = 'PublicPort',
  PublicIP = 'PublicIP',
  RCONEnabled = 'RCONEnabled',
  RCONPort = 'RCONPort',
  Region = 'Region',
  bUseAuth = 'bUseAuth',
  BanListURL = 'BanListURL',
  RESTAPIEnabled = 'RESTAPIEnabled',
  RESTAPIPort = 'RESTAPIPort',
  bShowPlayerList = 'bShowPlayerList',
  ChatPostLimitPerMinute = 'ChatPostLimitPerMinute',
  CrossplayPlatforms = 'CrossplayPlatforms',
  bIsUseBackupSaveData = 'bIsUseBackupSaveData',
  LogFormatType = 'LogFormatType',
  SupplyDropSpan = 'SupplyDropSpan',

  // v0.6.0에서 추가된 설정들
  bAllowGlobalPalboxExport = 'bAllowGlobalPalboxExport',
  bAllowGlobalPalboxImport = 'bAllowGlobalPalboxImport',
  EquipmentDurabilityDamageRate = 'EquipmentDurabilityDamageRate',
  ItemContainerForceMarkDirtyInterval = 'ItemContainerForceMarkDirtyInterval',
  MaxBuildingLimitNum = 'MaxBuildingLimitNum',
  ServerReplicatePawnCullDistance = 'ServerReplicatePawnCullDistance',

  // v1.0에서 추가된 설정들
  PhysicsActiveDropItemMaxNum = 'PhysicsActiveDropItemMaxNum',
  bEnableFastTravelOnlyBaseCamp = 'bEnableFastTravelOnlyBaseCamp',
  bAllowClientMod = 'bAllowClientMod',
  bIsShowJoinLeftMessage = 'bIsShowJoinLeftMessage',
  EnablePredatorBossPal = 'EnablePredatorBossPal',
  PlayerDataPalStorageUpdateCheckTickInterval = 'PlayerDataPalStorageUpdateCheckTickInterval',
  ItemCorruptionMultiplier = 'ItemCorruptionMultiplier',
  MonsterFarmActionSpeedRate = 'MonsterFarmActionSpeedRate',
  DenyTechnologyList = 'DenyTechnologyList',
  GuildRejoinCooldownMinutes = 'GuildRejoinCooldownMinutes',
  AutoTransferMasterCheckIntervalSeconds = 'AutoTransferMasterCheckIntervalSeconds',
  AutoTransferMasterThresholdDays = 'AutoTransferMasterThresholdDays',
  MaxGuildsPerFrame = 'MaxGuildsPerFrame',
  BlockRespawnTime = 'BlockRespawnTime',
  RespawnPenaltyDurationThreshold = 'RespawnPenaltyDurationThreshold',
  RespawnPenaltyTimeScale = 'RespawnPenaltyTimeScale',
  bDisplayPvPItemNumOnWorldMap_BaseCamp = 'bDisplayPvPItemNumOnWorldMap_BaseCamp',
  bDisplayPvPItemNumOnWorldMap_Player = 'bDisplayPvPItemNumOnWorldMap_Player',
  AdditionalDropItemWhenPlayerKillingInPvPMode = 'AdditionalDropItemWhenPlayerKillingInPvPMode',
  AdditionalDropItemNumWhenPlayerKillingInPvPMode = 'AdditionalDropItemNumWhenPlayerKillingInPvPMode',
  bAdditionalDropItemWhenPlayerKillingInPvPMode = 'bAdditionalDropItemWhenPlayerKillingInPvPMode',
  bEnableVoiceChat = 'bEnableVoiceChat',
  VoiceChatMaxVolumeDistance = 'VoiceChatMaxVolumeDistance',
  VoiceChatZeroVolumeDistance = 'VoiceChatZeroVolumeDistance',
  bAllowEnhanceStat_Health = 'bAllowEnhanceStat_Health',
  bAllowEnhanceStat_Attack = 'bAllowEnhanceStat_Attack',
  bAllowEnhanceStat_Stamina = 'bAllowEnhanceStat_Stamina',
  bAllowEnhanceStat_Weight = 'bAllowEnhanceStat_Weight',
  bAllowEnhanceStat_WorkSpeed = 'bAllowEnhanceStat_WorkSpeed',
  bEnableBuildingPlayerUIdDisplay = 'bEnableBuildingPlayerUIdDisplay',
  BuildingNameDisplayCacheTTLSeconds = 'BuildingNameDisplayCacheTTLSeconds'
}

export type TConfigValueType = 'string' | 'number' | 'boolean' | 'tuple';

export type TConfig = {
  [ConfigKey.Difficulty]: string;
  [ConfigKey.RandomizerType]: string;
  [ConfigKey.RandomizerSeed]: string;
  [ConfigKey.bIsRandomizerPalLevelRandom]: boolean;
  [ConfigKey.DayTimeSpeedRate]: number;
  [ConfigKey.NightTimeSpeedRate]: number;
  [ConfigKey.ExpRate]: number;
  [ConfigKey.PalCaptureRate]: number;
  [ConfigKey.PalSpawnNumRate]: number;
  [ConfigKey.PalDamageRateAttack]: number;
  [ConfigKey.PalDamageRateDefense]: number;
  [ConfigKey.PlayerDamageRateAttack]: number;
  [ConfigKey.PlayerDamageRateDefense]: number;
  [ConfigKey.PlayerStomachDecreaceRate]: number;
  [ConfigKey.PlayerStaminaDecreaceRate]: number;
  [ConfigKey.PlayerAutoHPRegeneRate]: number;
  [ConfigKey.PlayerAutoHpRegeneRateInSleep]: number;
  [ConfigKey.PalStomachDecreaceRate]: number;
  [ConfigKey.PalStaminaDecreaceRate]: number;
  [ConfigKey.PalAutoHPRegeneRate]: number;
  [ConfigKey.PalAutoHpRegeneRateInSleep]: number;
  [ConfigKey.BuildObjectHpRate]: number;
  [ConfigKey.BuildObjectDamageRate]: number;
  [ConfigKey.BuildObjectDeteriorationDamageRate]: number;
  [ConfigKey.CollectionDropRate]: number;
  [ConfigKey.CollectionObjectHpRate]: number;
  [ConfigKey.CollectionObjectRespawnSpeedRate]: number;
  [ConfigKey.EnemyDropItemRate]: number;
  [ConfigKey.DeathPenalty]: string;
  [ConfigKey.bEnablePlayerToPlayerDamage]: boolean;
  [ConfigKey.bEnableFriendlyFire]: boolean;
  [ConfigKey.bEnableInvaderEnemy]: boolean;
  [ConfigKey.bActiveUNKO]: boolean;
  [ConfigKey.bEnableAimAssistPad]: boolean;
  [ConfigKey.bEnableAimAssistKeyboard]: boolean;
  [ConfigKey.DropItemMaxNum]: number;
  [ConfigKey.DropItemMaxNum_UNKO]: number;
  [ConfigKey.BaseCampMaxNum]: number;
  [ConfigKey.BaseCampWorkerMaxNum]: number;
  [ConfigKey.DropItemAliveMaxHours]: number;
  [ConfigKey.bAutoResetGuildNoOnlinePlayers]: boolean;
  [ConfigKey.AutoResetGuildTimeNoOnlinePlayers]: number;
  [ConfigKey.GuildPlayerMaxNum]: number;
  [ConfigKey.BaseCampMaxNumInGuild]: number;
  [ConfigKey.PalEggDefaultHatchingTime]: number;
  [ConfigKey.WorkSpeedRate]: number;
  [ConfigKey.AutoSaveSpan]: number;
  [ConfigKey.bIsMultiplay]: boolean;
  [ConfigKey.bIsPvP]: boolean;
  [ConfigKey.bHardcore]: boolean;
  [ConfigKey.bPalLost]: boolean;
  [ConfigKey.bCharacterRecreateInHardcore]: boolean;
  [ConfigKey.bCanPickupOtherGuildDeathPenaltyDrop]: boolean;
  [ConfigKey.bEnableNonLoginPenalty]: boolean;
  [ConfigKey.bEnableFastTravel]: boolean;
  [ConfigKey.bIsStartLocationSelectByMap]: boolean;
  [ConfigKey.bExistPlayerAfterLogout]: boolean;
  [ConfigKey.bEnableDefenseOtherGuildPlayer]: boolean;
  [ConfigKey.bInvisibleOtherGuildBaseCampAreaFX]: boolean;
  [ConfigKey.bBuildAreaLimit]: boolean;
  [ConfigKey.ItemWeightRate]: number;
  [ConfigKey.CoopPlayerMaxNum]: number;
  [ConfigKey.ServerPlayerMaxNum]: number;
  [ConfigKey.ServerName]: string;
  [ConfigKey.ServerDescription]: string;
  [ConfigKey.AdminPassword]: string;
  [ConfigKey.ServerPassword]: string;
  [ConfigKey.PublicPort]: number;
  [ConfigKey.PublicIP]: string;
  [ConfigKey.RCONEnabled]: boolean;
  [ConfigKey.RCONPort]: number;
  [ConfigKey.Region]: string;
  [ConfigKey.bUseAuth]: boolean;
  [ConfigKey.BanListURL]: string;
  [ConfigKey.RESTAPIEnabled]: boolean;
  [ConfigKey.RESTAPIPort]: number;
  [ConfigKey.bShowPlayerList]: boolean;
  [ConfigKey.ChatPostLimitPerMinute]: number;
  [ConfigKey.CrossplayPlatforms]: string;
  [ConfigKey.bIsUseBackupSaveData]: boolean;
  [ConfigKey.LogFormatType]: string;
  [ConfigKey.SupplyDropSpan]: number;
  [ConfigKey.bAllowGlobalPalboxExport]: boolean;
  [ConfigKey.bAllowGlobalPalboxImport]: boolean;
  [ConfigKey.EquipmentDurabilityDamageRate]: number;
  [ConfigKey.ItemContainerForceMarkDirtyInterval]: number;
  [ConfigKey.MaxBuildingLimitNum]: number;
  [ConfigKey.ServerReplicatePawnCullDistance]: number;
  [ConfigKey.PhysicsActiveDropItemMaxNum]: number;
  [ConfigKey.bEnableFastTravelOnlyBaseCamp]: boolean;
  [ConfigKey.bAllowClientMod]: boolean;
  [ConfigKey.bIsShowJoinLeftMessage]: boolean;
  [ConfigKey.EnablePredatorBossPal]: boolean;
  [ConfigKey.PlayerDataPalStorageUpdateCheckTickInterval]: number;
  [ConfigKey.ItemCorruptionMultiplier]: number;
  [ConfigKey.MonsterFarmActionSpeedRate]: number;
  [ConfigKey.DenyTechnologyList]: string;
  [ConfigKey.GuildRejoinCooldownMinutes]: number;
  [ConfigKey.AutoTransferMasterCheckIntervalSeconds]: number;
  [ConfigKey.AutoTransferMasterThresholdDays]: number;
  [ConfigKey.MaxGuildsPerFrame]: number;
  [ConfigKey.BlockRespawnTime]: number;
  [ConfigKey.RespawnPenaltyDurationThreshold]: number;
  [ConfigKey.RespawnPenaltyTimeScale]: number;
  [ConfigKey.bDisplayPvPItemNumOnWorldMap_BaseCamp]: boolean;
  [ConfigKey.bDisplayPvPItemNumOnWorldMap_Player]: boolean;
  [ConfigKey.AdditionalDropItemWhenPlayerKillingInPvPMode]: string;
  [ConfigKey.AdditionalDropItemNumWhenPlayerKillingInPvPMode]: number;
  [ConfigKey.bAdditionalDropItemWhenPlayerKillingInPvPMode]: boolean;
  [ConfigKey.bEnableVoiceChat]: boolean;
  [ConfigKey.VoiceChatMaxVolumeDistance]: number;
  [ConfigKey.VoiceChatZeroVolumeDistance]: number;
  [ConfigKey.bAllowEnhanceStat_Health]: boolean;
  [ConfigKey.bAllowEnhanceStat_Attack]: boolean;
  [ConfigKey.bAllowEnhanceStat_Stamina]: boolean;
  [ConfigKey.bAllowEnhanceStat_Weight]: boolean;
  [ConfigKey.bAllowEnhanceStat_WorkSpeed]: boolean;
  [ConfigKey.bEnableBuildingPlayerUIdDisplay]: boolean;
  [ConfigKey.BuildingNameDisplayCacheTTLSeconds]: number;
};

// Palworld 1.0 DefaultPalWorldSettings.ini의 기본값 전체.
// 파서의 기본값 주입, 기본값 툴팁, 변경 강조, 항목별 되돌리기가
// 모두 이 단일 소스를 사용한다. TConfig 타입이라 키 누락 시 컴파일 에러.
export const configDefaults: TConfig = {
  [ConfigKey.Difficulty]: 'None',
  [ConfigKey.RandomizerType]: 'None',
  [ConfigKey.RandomizerSeed]: '',
  [ConfigKey.bIsRandomizerPalLevelRandom]: false,
  [ConfigKey.DayTimeSpeedRate]: 1,
  [ConfigKey.NightTimeSpeedRate]: 1,
  [ConfigKey.ExpRate]: 1,
  [ConfigKey.PalCaptureRate]: 1,
  [ConfigKey.PalSpawnNumRate]: 1,
  [ConfigKey.PalDamageRateAttack]: 1,
  [ConfigKey.PalDamageRateDefense]: 1,
  [ConfigKey.PlayerDamageRateAttack]: 1,
  [ConfigKey.PlayerDamageRateDefense]: 1,
  [ConfigKey.PlayerStomachDecreaceRate]: 1,
  [ConfigKey.PlayerStaminaDecreaceRate]: 1,
  [ConfigKey.PlayerAutoHPRegeneRate]: 1,
  [ConfigKey.PlayerAutoHpRegeneRateInSleep]: 1,
  [ConfigKey.PalStomachDecreaceRate]: 1,
  [ConfigKey.PalStaminaDecreaceRate]: 1,
  [ConfigKey.PalAutoHPRegeneRate]: 1,
  [ConfigKey.PalAutoHpRegeneRateInSleep]: 1,
  [ConfigKey.BuildObjectHpRate]: 1,
  [ConfigKey.BuildObjectDamageRate]: 1,
  [ConfigKey.BuildObjectDeteriorationDamageRate]: 1,
  [ConfigKey.CollectionDropRate]: 1,
  [ConfigKey.CollectionObjectHpRate]: 1,
  [ConfigKey.CollectionObjectRespawnSpeedRate]: 1,
  [ConfigKey.EnemyDropItemRate]: 1,
  [ConfigKey.DeathPenalty]: 'Item',
  [ConfigKey.bEnablePlayerToPlayerDamage]: false,
  [ConfigKey.bEnableFriendlyFire]: false,
  [ConfigKey.bEnableInvaderEnemy]: true,
  [ConfigKey.bActiveUNKO]: false,
  [ConfigKey.bEnableAimAssistPad]: true,
  [ConfigKey.bEnableAimAssistKeyboard]: false,
  [ConfigKey.DropItemMaxNum]: 3000,
  [ConfigKey.DropItemMaxNum_UNKO]: 100,
  [ConfigKey.BaseCampMaxNum]: 128,
  [ConfigKey.BaseCampWorkerMaxNum]: 15,
  [ConfigKey.DropItemAliveMaxHours]: 1,
  [ConfigKey.bAutoResetGuildNoOnlinePlayers]: false,
  [ConfigKey.AutoResetGuildTimeNoOnlinePlayers]: 72,
  [ConfigKey.GuildPlayerMaxNum]: 20,
  [ConfigKey.BaseCampMaxNumInGuild]: 4,
  [ConfigKey.PalEggDefaultHatchingTime]: 1,
  [ConfigKey.WorkSpeedRate]: 1,
  [ConfigKey.AutoSaveSpan]: 30,
  [ConfigKey.bIsMultiplay]: false,
  [ConfigKey.bIsPvP]: false,
  [ConfigKey.bHardcore]: false,
  [ConfigKey.bPalLost]: false,
  [ConfigKey.bCharacterRecreateInHardcore]: false,
  [ConfigKey.bCanPickupOtherGuildDeathPenaltyDrop]: false,
  [ConfigKey.bEnableNonLoginPenalty]: true,
  [ConfigKey.bEnableFastTravel]: true,
  [ConfigKey.bIsStartLocationSelectByMap]: false,
  [ConfigKey.bExistPlayerAfterLogout]: false,
  [ConfigKey.bEnableDefenseOtherGuildPlayer]: false,
  [ConfigKey.bInvisibleOtherGuildBaseCampAreaFX]: false,
  [ConfigKey.bBuildAreaLimit]: false,
  [ConfigKey.ItemWeightRate]: 1,
  [ConfigKey.CoopPlayerMaxNum]: 4,
  [ConfigKey.ServerPlayerMaxNum]: 32,
  [ConfigKey.ServerName]: 'Default Palworld Server',
  [ConfigKey.ServerDescription]: '',
  [ConfigKey.AdminPassword]: '',
  [ConfigKey.ServerPassword]: '',
  [ConfigKey.PublicPort]: 8211,
  [ConfigKey.PublicIP]: '',
  [ConfigKey.RCONEnabled]: false,
  [ConfigKey.RCONPort]: 25575,
  [ConfigKey.Region]: '',
  [ConfigKey.bUseAuth]: true,
  [ConfigKey.BanListURL]: 'https://b.palworldgame.com/api/banlist.txt',
  [ConfigKey.RESTAPIEnabled]: false,
  [ConfigKey.RESTAPIPort]: 8212,
  [ConfigKey.bShowPlayerList]: false,
  [ConfigKey.ChatPostLimitPerMinute]: 30,
  [ConfigKey.CrossplayPlatforms]: '(Steam,Xbox,PS5,Mac)',
  [ConfigKey.bIsUseBackupSaveData]: true,
  [ConfigKey.LogFormatType]: 'Text',
  [ConfigKey.SupplyDropSpan]: 180,
  [ConfigKey.bAllowGlobalPalboxExport]: true,
  [ConfigKey.bAllowGlobalPalboxImport]: false,
  [ConfigKey.EquipmentDurabilityDamageRate]: 1,
  [ConfigKey.ItemContainerForceMarkDirtyInterval]: 1,
  [ConfigKey.MaxBuildingLimitNum]: 0,
  [ConfigKey.ServerReplicatePawnCullDistance]: 15000,
  [ConfigKey.PhysicsActiveDropItemMaxNum]: -1,
  [ConfigKey.bEnableFastTravelOnlyBaseCamp]: false,
  [ConfigKey.bAllowClientMod]: true,
  [ConfigKey.bIsShowJoinLeftMessage]: true,
  [ConfigKey.EnablePredatorBossPal]: true,
  [ConfigKey.PlayerDataPalStorageUpdateCheckTickInterval]: 1,
  [ConfigKey.ItemCorruptionMultiplier]: 1,
  [ConfigKey.MonsterFarmActionSpeedRate]: 1,
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

// 값 목록이 정해진 열거형 설정 (공식 문서 기준). UI에서 드롭다운으로 렌더링.
export const configSelectOptions: Partial<Record<ConfigKey, string[]>> = {
  [ConfigKey.Difficulty]: ['None', 'Casual', 'Normal', 'Hard'],
  [ConfigKey.DeathPenalty]: ['None', 'Item', 'ItemAndEquipment', 'All'],
  [ConfigKey.RandomizerType]: ['None', 'Region', 'All'],
  [ConfigKey.LogFormatType]: ['Text', 'Json']
};

// CrossplayPlatforms 멀티셀렉트에 표시할 알려진 플랫폼 목록.
// 설정 파일에 미지의 플랫폼이 있으면 UI에서 동적으로 선택지에 추가된다.
export const KNOWN_CROSSPLAY_PLATFORMS = ['Steam', 'Xbox', 'PS5', 'Mac'];

export const configTypes: Record<string, TConfigValueType> = {
  Difficulty: 'string',
  RandomizerType: 'string',
  RandomizerSeed: 'string',
  bIsRandomizerPalLevelRandom: 'boolean',
  DayTimeSpeedRate: 'number',
  NightTimeSpeedRate: 'number',
  ExpRate: 'number',
  PalCaptureRate: 'number',
  PalSpawnNumRate: 'number',
  PalDamageRateAttack: 'number',
  PalDamageRateDefense: 'number',
  PlayerDamageRateAttack: 'number',
  PlayerDamageRateDefense: 'number',
  PlayerStomachDecreaceRate: 'number',
  PlayerStaminaDecreaceRate: 'number',
  PlayerAutoHPRegeneRate: 'number',
  PlayerAutoHpRegeneRateInSleep: 'number',
  PalStomachDecreaceRate: 'number',
  PalStaminaDecreaceRate: 'number',
  PalAutoHPRegeneRate: 'number',
  PalAutoHpRegeneRateInSleep: 'number',
  BuildObjectHpRate: 'number',
  BuildObjectDamageRate: 'number',
  BuildObjectDeteriorationDamageRate: 'number',
  CollectionDropRate: 'number',
  CollectionObjectHpRate: 'number',
  CollectionObjectRespawnSpeedRate: 'number',
  EnemyDropItemRate: 'number',
  DeathPenalty: 'string',
  bEnablePlayerToPlayerDamage: 'boolean',
  bEnableFriendlyFire: 'boolean',
  bEnableInvaderEnemy: 'boolean',
  bActiveUNKO: 'boolean',
  bEnableAimAssistPad: 'boolean',
  bEnableAimAssistKeyboard: 'boolean',
  DropItemMaxNum: 'number',
  DropItemMaxNum_UNKO: 'number',
  BaseCampMaxNum: 'number',
  BaseCampWorkerMaxNum: 'number',
  DropItemAliveMaxHours: 'number',
  bAutoResetGuildNoOnlinePlayers: 'boolean',
  AutoResetGuildTimeNoOnlinePlayers: 'number',
  GuildPlayerMaxNum: 'number',
  BaseCampMaxNumInGuild: 'number',
  PalEggDefaultHatchingTime: 'number',
  WorkSpeedRate: 'number',
  AutoSaveSpan: 'number',
  bIsMultiplay: 'boolean',
  bIsPvP: 'boolean',
  bHardcore: 'boolean',
  bPalLost: 'boolean',
  bCharacterRecreateInHardcore: 'boolean',
  bCanPickupOtherGuildDeathPenaltyDrop: 'boolean',
  bEnableNonLoginPenalty: 'boolean',
  bEnableFastTravel: 'boolean',
  bIsStartLocationSelectByMap: 'boolean',
  bExistPlayerAfterLogout: 'boolean',
  bEnableDefenseOtherGuildPlayer: 'boolean',
  bInvisibleOtherGuildBaseCampAreaFX: 'boolean',
  bBuildAreaLimit: 'boolean',
  ItemWeightRate: 'number',
  CoopPlayerMaxNum: 'number',
  ServerPlayerMaxNum: 'number',
  ServerName: 'string',
  ServerDescription: 'string',
  AdminPassword: 'string',
  ServerPassword: 'string',
  PublicPort: 'number',
  PublicIP: 'string',
  RCONEnabled: 'boolean',
  RCONPort: 'number',
  Region: 'string',
  bUseAuth: 'boolean',
  BanListURL: 'string',
  RESTAPIEnabled: 'boolean',
  RESTAPIPort: 'number',
  bShowPlayerList: 'boolean',
  ChatPostLimitPerMinute: 'number',
  CrossplayPlatforms: 'tuple',
  bIsUseBackupSaveData: 'boolean',
  LogFormatType: 'string',
  SupplyDropSpan: 'number',
  bAllowGlobalPalboxExport: 'boolean',
  bAllowGlobalPalboxImport: 'boolean',
  EquipmentDurabilityDamageRate: 'number',
  ItemContainerForceMarkDirtyInterval: 'number',
  MaxBuildingLimitNum: 'number',
  ServerReplicatePawnCullDistance: 'number',
  PhysicsActiveDropItemMaxNum: 'number',
  bEnableFastTravelOnlyBaseCamp: 'boolean',
  bAllowClientMod: 'boolean',
  bIsShowJoinLeftMessage: 'boolean',
  EnablePredatorBossPal: 'boolean',
  PlayerDataPalStorageUpdateCheckTickInterval: 'number',
  ItemCorruptionMultiplier: 'number',
  MonsterFarmActionSpeedRate: 'number',
  DenyTechnologyList: 'string',
  GuildRejoinCooldownMinutes: 'number',
  AutoTransferMasterCheckIntervalSeconds: 'number',
  AutoTransferMasterThresholdDays: 'number',
  MaxGuildsPerFrame: 'number',
  BlockRespawnTime: 'number',
  RespawnPenaltyDurationThreshold: 'number',
  RespawnPenaltyTimeScale: 'number',
  bDisplayPvPItemNumOnWorldMap_BaseCamp: 'boolean',
  bDisplayPvPItemNumOnWorldMap_Player: 'boolean',
  AdditionalDropItemWhenPlayerKillingInPvPMode: 'string',
  AdditionalDropItemNumWhenPlayerKillingInPvPMode: 'number',
  bAdditionalDropItemWhenPlayerKillingInPvPMode: 'boolean',
  bEnableVoiceChat: 'boolean',
  VoiceChatMaxVolumeDistance: 'number',
  VoiceChatZeroVolumeDistance: 'number',
  bAllowEnhanceStat_Health: 'boolean',
  bAllowEnhanceStat_Attack: 'boolean',
  bAllowEnhanceStat_Stamina: 'boolean',
  bAllowEnhanceStat_Weight: 'boolean',
  bAllowEnhanceStat_WorkSpeed: 'boolean',
  bEnableBuildingPlayerUIdDisplay: 'boolean',
  BuildingNameDisplayCacheTTLSeconds: 'number'
};
