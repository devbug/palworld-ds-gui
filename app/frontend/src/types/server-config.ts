export enum ConfigKey {
  Difficulty = 'Difficulty',
  RandomizerType = 'RandomizerType',
  RandomizerSeed = 'RandomizerSeed',
  DayTimeSpeedRate = 'DayTimeSpeedRate',
  NightTimeSpeedRate = 'NightTimeSpeedRate',
  ExpRate = 'ExpRate',
  PalCaptureRate = 'PalCaptureRate',
  PalSpawnNumRate = 'PalSpawnNumRate',
  PalDamageRateAttack = 'PalDamageRateAttack',
  PalDamageRateDefense = 'PalDamageRateDefense',
  PlayerDamageRateAttack = 'PlayerDamageRateAttack',
  PlayerDamageRateDefense = 'PlayerDamageRateDefense',
  PlayerStomachDecreaseRate = 'PlayerStomachDecreaseRate',
  PlayerStaminaDecreaseRate = 'PlayerStaminaDecreaseRate',
  PlayerAutoHPRegeneRate = 'PlayerAutoHPRegeneRate',
  PlayerAutoHpRegeneRateInSleep = 'PlayerAutoHpRegeneRateInSleep',
  PalStomachDecreaseRate = 'PalStomachDecreaseRate',
  PalStaminaDecreaseRate = 'PalStaminaDecreaseRate',
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
  PalStaminaDecreaceRate = 'PalStaminaDecreaceRate',
  PalStomachDecreaceRate = 'PalStomachDecreaceRate',
  PlayerStaminaDecreaceRate = 'PlayerStaminaDecreaceRate',
  PlayerStomachDecreaceRate = 'PlayerStomachDecreaceRate',
  RESTAPIEnabled = 'RESTAPIEnabled',
  RESTAPIPort = 'RESTAPIPort',
  bShowPlayerList = 'bShowPlayerList',
  ChatPostLimitPerMinute = 'ChatPostLimitPerMinute',
  AllowConnectPlatform = 'AllowConnectPlatform',
  bIsUseBackupSaveData = 'bIsUseBackupSaveData',
  LogFormatType = 'LogFormatType',
  SupplyDropSpan = 'SupplyDropSpan',
  EnablePredatorBossPal = 'EnablePredatorBossPal',
  MaxBuildingLimitNum = 'MaxBuildingLimitNum',
  ServerReplicatePawnCullDistance = 'ServerReplicatePawnCullDistance'
}

export type TConfig = {
  [ConfigKey.Difficulty]: string;
  [ConfigKey.RandomizerType]: string;
  [ConfigKey.RandomizerSeed]: string;
  [ConfigKey.DayTimeSpeedRate]: number;
  [ConfigKey.NightTimeSpeedRate]: number;
  [ConfigKey.ExpRate]: number;
  [ConfigKey.PalCaptureRate]: number;
  [ConfigKey.PalSpawnNumRate]: number;
  [ConfigKey.PalDamageRateAttack]: number;
  [ConfigKey.PalDamageRateDefense]: number;
  [ConfigKey.PlayerDamageRateAttack]: number;
  [ConfigKey.PlayerDamageRateDefense]: number;
  [ConfigKey.PlayerStomachDecreaseRate]: number;
  [ConfigKey.PlayerStaminaDecreaseRate]: number;
  [ConfigKey.PlayerAutoHPRegeneRate]: number;
  [ConfigKey.PlayerAutoHpRegeneRateInSleep]: number;
  [ConfigKey.PalStomachDecreaseRate]: number;
  [ConfigKey.PalStaminaDecreaseRate]: number;
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
  [ConfigKey.PalStaminaDecreaceRate]: number;
  [ConfigKey.PalStomachDecreaceRate]: number;
  [ConfigKey.PlayerStaminaDecreaceRate]: number;
  [ConfigKey.PlayerStomachDecreaceRate]: number;
  [ConfigKey.RESTAPIEnabled]: boolean;
  [ConfigKey.RESTAPIPort]: number;
  [ConfigKey.bShowPlayerList]: boolean;
  [ConfigKey.ChatPostLimitPerMinute]: number;
  [ConfigKey.AllowConnectPlatform]: string;
  [ConfigKey.bIsUseBackupSaveData]: boolean;
  [ConfigKey.LogFormatType]: string;
  [ConfigKey.SupplyDropSpan]: number;
  [ConfigKey.EnablePredatorBossPal]: boolean;
  [ConfigKey.MaxBuildingLimitNum]: number;
  [ConfigKey.ServerReplicatePawnCullDistance]: number;
};

export const configLabels = {
  [ConfigKey.Difficulty]: 'Difficulty',
  [ConfigKey.RandomizerType]: 'Randomizer Type',
  [ConfigKey.RandomizerSeed]: 'Randomizer Seed',
  [ConfigKey.DayTimeSpeedRate]: 'Day Time Speed Rate',
  [ConfigKey.NightTimeSpeedRate]: 'Night Time Speed Rate',
  [ConfigKey.ExpRate]: 'Experience Rate',
  [ConfigKey.PalCaptureRate]: 'Pal Capture Rate',
  [ConfigKey.PalSpawnNumRate]: 'Pal Spawn Number Rate',
  [ConfigKey.PalDamageRateAttack]: 'Pal Damage Rate (Attack)',
  [ConfigKey.PalDamageRateDefense]: 'Pal Damage Rate (Defense)',
  [ConfigKey.PlayerDamageRateAttack]: 'Player Damage Rate (Attack)',
  [ConfigKey.PlayerDamageRateDefense]: 'Player Damage Rate (Defense)',
  [ConfigKey.PlayerStomachDecreaseRate]: 'Player Stomach Decrease Rate',
  [ConfigKey.PlayerStaminaDecreaseRate]: 'Player Stamina Decrease Rate',
  [ConfigKey.PlayerAutoHPRegeneRate]: 'Player Auto HP Regeneration Rate',
  [ConfigKey.PlayerAutoHpRegeneRateInSleep]:
    'Player Auto HP Regeneration Rate (Sleep)',
  [ConfigKey.PalStomachDecreaseRate]: 'Pal Stomach Decrease Rate',
  [ConfigKey.PalStaminaDecreaseRate]: 'Pal Stamina Decrease Rate',
  [ConfigKey.PalAutoHPRegeneRate]: 'Pal Auto HP Regeneration Rate',
  [ConfigKey.PalAutoHpRegeneRateInSleep]:
    'Pal Auto HP Regeneration Rate (Sleep)',
  [ConfigKey.BuildObjectHpRate]: 'Build Object HP Rate',
  [ConfigKey.BuildObjectDamageRate]: 'Build Object Damage Rate',
  [ConfigKey.BuildObjectDeteriorationDamageRate]:
    'Build Object Deterioration Damage Rate',
  [ConfigKey.CollectionDropRate]: 'Collection Drop Rate',
  [ConfigKey.CollectionObjectHpRate]: 'Collection Object HP Rate',
  [ConfigKey.CollectionObjectRespawnSpeedRate]:
    'Collection Object Respawn Speed Rate',
  [ConfigKey.EnemyDropItemRate]: 'Enemy Drop Item Rate',
  [ConfigKey.DeathPenalty]: 'Death Penalty',
  [ConfigKey.bEnablePlayerToPlayerDamage]: 'Enable Player-to-Player Damage',
  [ConfigKey.bEnableFriendlyFire]: 'Enable Friendly Fire',
  [ConfigKey.bEnableInvaderEnemy]: 'Enable Invader Enemy',
  [ConfigKey.bActiveUNKO]: 'Active UNKO',
  [ConfigKey.bEnableAimAssistPad]: 'Enable Aim Assist (Pad)',
  [ConfigKey.bEnableAimAssistKeyboard]: 'Enable Aim Assist (Keyboard)',
  [ConfigKey.DropItemMaxNum]: 'Drop Item Maximum Number',
  [ConfigKey.DropItemMaxNum_UNKO]: 'Drop Item Maximum Number (UNKO)',
  [ConfigKey.BaseCampMaxNum]: 'Base Camp Maximum Number',
  [ConfigKey.BaseCampWorkerMaxNum]: 'Base Camp Worker Maximum Number',
  [ConfigKey.DropItemAliveMaxHours]: 'Drop Item Alive Maximum Hours',
  [ConfigKey.bAutoResetGuildNoOnlinePlayers]:
    'Auto Reset Guild (No Online Players)',
  [ConfigKey.AutoResetGuildTimeNoOnlinePlayers]:
    'Auto Reset Guild Time (No Online Players)',
  [ConfigKey.GuildPlayerMaxNum]: 'Guild Player Maximum Number',
  [ConfigKey.BaseCampMaxNumInGuild]: 'Guild Base Came Maximum Number',
  [ConfigKey.PalEggDefaultHatchingTime]: 'Pal Egg Default Hatching Time',
  [ConfigKey.WorkSpeedRate]: 'Work Speed Rate',
  [ConfigKey.AutoSaveSpan]: 'Auto Save Interval Time',
  [ConfigKey.bIsMultiplay]: 'Is Multiplay',
  [ConfigKey.bIsPvP]: 'Is PvP',
  [ConfigKey.bHardcore]: 'Enable Hardcore',
  [ConfigKey.bPalLost]: 'Lose pals on (pal)death',
  [ConfigKey.bCanPickupOtherGuildDeathPenaltyDrop]:
    'Can Pickup Other Guild Death Penalty Drop',
  [ConfigKey.bEnableNonLoginPenalty]: 'Enable Non-Login Penalty',
  [ConfigKey.bEnableFastTravel]: 'Enable Fast Travel',
  [ConfigKey.bIsStartLocationSelectByMap]: 'Is Start Location Select By Map',
  [ConfigKey.bExistPlayerAfterLogout]: 'Exist Player After Logout',
  [ConfigKey.bEnableDefenseOtherGuildPlayer]:
    'Enable Defense Other Guild Player',
  [ConfigKey.bInvisibleOtherGuildBaseCampAreaFX]:
    'Invisible Other Guild Base Camp FX',
  [ConfigKey.bBuildAreaLimit]: 'Build Area Limit',
  [ConfigKey.ItemWeightRate]: 'Item Weight Rate',
  [ConfigKey.CoopPlayerMaxNum]: 'Coop Player Maximum Number',
  [ConfigKey.ServerPlayerMaxNum]: 'Server Player Maximum Number',
  [ConfigKey.ServerName]: 'Server Name',
  [ConfigKey.ServerDescription]: 'Server Description',
  [ConfigKey.AdminPassword]: 'Admin Password',
  [ConfigKey.ServerPassword]: 'Server Password',
  [ConfigKey.PublicPort]: 'Public Port',
  [ConfigKey.PublicIP]: 'Public IP',
  [ConfigKey.RCONEnabled]: 'RCON Enabled',
  [ConfigKey.RCONPort]: 'RCON Port',
  [ConfigKey.Region]: 'Region',
  [ConfigKey.bUseAuth]: 'Use Authentication',
  [ConfigKey.BanListURL]: 'Ban List URL',
  [ConfigKey.PalStaminaDecreaceRate]: 'Pal Stamina Decrease Rate (Typo Fix)',
  [ConfigKey.PalStomachDecreaceRate]: 'Pal Stomach Decrease Rate',
  [ConfigKey.PlayerStaminaDecreaceRate]: 'Player Stamina Decrease Rate',
  [ConfigKey.PlayerStomachDecreaceRate]: 'Player Stomach Decrease Rate',
  [ConfigKey.RESTAPIEnabled]: 'REST API Enabled',
  [ConfigKey.RESTAPIPort]: 'REST API Port',
  [ConfigKey.bShowPlayerList]: 'Show Player List',
  [ConfigKey.ChatPostLimitPerMinute]: 'Chat Post Limit per Minute',
  [ConfigKey.AllowConnectPlatform]: 'Allow Connect Platform',
  [ConfigKey.bIsUseBackupSaveData]: 'Is Use Backup Save Data',
  [ConfigKey.LogFormatType]: 'Log Format Type',
  [ConfigKey.SupplyDropSpan]: 'Supply Drop Interval',
  [ConfigKey.EnablePredatorBossPal]: 'Enable Predator Boss as Pals',
  [ConfigKey.MaxBuildingLimitNum]: 'Maximum Building Limit Number per base',
  [ConfigKey.ServerReplicatePawnCullDistance]:
    'Server Replicate Pawn Cull Distance'
};

export const configTypes = {
  Difficulty: 'string',
  RandomizerType: 'string',
  RandomizerSeed: 'string',
  DayTimeSpeedRate: 'number',
  NightTimeSpeedRate: 'number',
  ExpRate: 'number',
  PalCaptureRate: 'number',
  PalSpawnNumRate: 'number',
  PalDamageRateAttack: 'number',
  PalDamageRateDefense: 'number',
  PlayerDamageRateAttack: 'number',
  PlayerDamageRateDefense: 'number',
  PlayerStomachDecreaseRate: 'number',
  PlayerStaminaDecreaseRate: 'number',
  PlayerAutoHPRegeneRate: 'number',
  PlayerAutoHpRegeneRateInSleep: 'number',
  PalStomachDecreaseRate: 'number',
  PalStaminaDecreaseRate: 'number',
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
  PalStaminaDecreaceRate: 'number',
  PalStomachDecreaceRate: 'number',
  PlayerStaminaDecreaceRate: 'number',
  PlayerStomachDecreaceRate: 'number',
  RESTAPIEnabled: 'boolean',
  RESTAPIPort: 'number',
  bShowPlayerList: 'boolean',
  ChatPostLimitPerMinute: 'number',
  AllowConnectPlatform: 'string',
  bIsUseBackupSaveData: 'boolean',
  LogFormatType: 'string',
  SupplyDropSpan: 'number',
  EnablePredatorBossPal: 'boolean',
  MaxBuildingLimitNum: 'number',
  ServerReplicatePawnCullDistance: 'number'
};
