import { describe, expect, test } from 'vitest';
import { parseConfig, serializeConfig } from './config-parser';

// Palworld 1.0 서버가 생성한 DefaultPalWorldSettings.ini 원본
const DEFAULT_INI_1_0 = `; This configuration file is a sample of the default server settings.
; Changes to this file will NOT be reflected on the server.
; To change the server settings, modify Pal/Saved/Config/WindowsServer/PalWorldSettings.ini.
[/Script/Pal.PalGameWorldSettings]
OptionSettings=(Difficulty=None,RandomizerType=None,RandomizerSeed="",bIsRandomizerPalLevelRandom=False,DayTimeSpeedRate=1.000000,NightTimeSpeedRate=1.000000,ExpRate=1.000000,PalCaptureRate=1.000000,PalSpawnNumRate=1.000000,PalDamageRateAttack=1.000000,PalDamageRateDefense=1.000000,PlayerDamageRateAttack=1.000000,PlayerDamageRateDefense=1.000000,PlayerStomachDecreaceRate=1.000000,PlayerStaminaDecreaceRate=1.000000,PlayerAutoHPRegeneRate=1.000000,PlayerAutoHpRegeneRateInSleep=1.000000,PalStomachDecreaceRate=1.000000,PalStaminaDecreaceRate=1.000000,PalAutoHPRegeneRate=1.000000,PalAutoHpRegeneRateInSleep=1.000000,BuildObjectHpRate=1.000000,BuildObjectDamageRate=1.000000,BuildObjectDeteriorationDamageRate=1.000000,CollectionDropRate=1.000000,CollectionObjectHpRate=1.000000,CollectionObjectRespawnSpeedRate=1.000000,EnemyDropItemRate=1.000000,DeathPenalty=Item,bEnablePlayerToPlayerDamage=False,bEnableFriendlyFire=False,bEnableInvaderEnemy=True,bActiveUNKO=False,bEnableAimAssistPad=True,bEnableAimAssistKeyboard=False,DropItemMaxNum=3000,PhysicsActiveDropItemMaxNum=-1,DropItemMaxNum_UNKO=100,BaseCampMaxNum=128,BaseCampWorkerMaxNum=15,DropItemAliveMaxHours=1.000000,bAutoResetGuildNoOnlinePlayers=False,AutoResetGuildTimeNoOnlinePlayers=72.000000,GuildPlayerMaxNum=20,BaseCampMaxNumInGuild=4,PalEggDefaultHatchingTime=1.000000,WorkSpeedRate=1.000000,AutoSaveSpan=30.000000,bIsMultiplay=False,bIsPvP=False,bHardcore=False,bPalLost=False,bCharacterRecreateInHardcore=False,bCanPickupOtherGuildDeathPenaltyDrop=False,bEnableNonLoginPenalty=True,bEnableFastTravel=True,bEnableFastTravelOnlyBaseCamp=False,bIsStartLocationSelectByMap=False,bExistPlayerAfterLogout=False,bEnableDefenseOtherGuildPlayer=False,bInvisibleOtherGuildBaseCampAreaFX=False,bBuildAreaLimit=False,ItemWeightRate=1.000000,CoopPlayerMaxNum=4,ServerPlayerMaxNum=32,ServerName="Default Palworld Server",ServerDescription="",AdminPassword="",ServerPassword="",bAllowClientMod=True,PublicPort=8211,PublicIP="",RCONEnabled=False,RCONPort=25575,Region="",bUseAuth=True,BanListURL="https://b.palworldgame.com/api/banlist.txt",RESTAPIEnabled=False,RESTAPIPort=8212,bShowPlayerList=False,ChatPostLimitPerMinute=30,CrossplayPlatforms=(Steam,Xbox,PS5,Mac),bIsUseBackupSaveData=True,LogFormatType=Text,bIsShowJoinLeftMessage=True,SupplyDropSpan=180,EnablePredatorBossPal=True,MaxBuildingLimitNum=0,ServerReplicatePawnCullDistance=15000.000000,bAllowGlobalPalboxExport=True,bAllowGlobalPalboxImport=False,EquipmentDurabilityDamageRate=1.000000,ItemContainerForceMarkDirtyInterval=1.000000,PlayerDataPalStorageUpdateCheckTickInterval=1.000000,ItemCorruptionMultiplier=1.000000,MonsterFarmActionSpeedRate=1.000000,DenyTechnologyList=,GuildRejoinCooldownMinutes=0,AutoTransferMasterCheckIntervalSeconds=3600.000000,AutoTransferMasterThresholdDays=14,MaxGuildsPerFrame=10,BlockRespawnTime=5.000000,RespawnPenaltyDurationThreshold=0.000000,RespawnPenaltyTimeScale=2.000000,bDisplayPvPItemNumOnWorldMap_BaseCamp=False,bDisplayPvPItemNumOnWorldMap_Player=False,AdditionalDropItemWhenPlayerKillingInPvPMode="PlayerDropItem",AdditionalDropItemNumWhenPlayerKillingInPvPMode=1,bAdditionalDropItemWhenPlayerKillingInPvPMode=False,bEnableVoiceChat=False,VoiceChatMaxVolumeDistance=3000.000000,VoiceChatZeroVolumeDistance=15000.000000,bAllowEnhanceStat_Health=True,bAllowEnhanceStat_Attack=True,bAllowEnhanceStat_Stamina=True,bAllowEnhanceStat_Weight=True,bAllowEnhanceStat_WorkSpeed=True,bEnableBuildingPlayerUIdDisplay=False,BuildingNameDisplayCacheTTLSeconds=60)`;

// 1.0 INI의 OptionSettings 안에 들어있는 전체 키 목록 (119개)
const ALL_KEYS_1_0 = (() => {
  const body = DEFAULT_INI_1_0.slice(
    DEFAULT_INI_1_0.indexOf('OptionSettings=(') + 'OptionSettings=('.length
  );
  return [...body.matchAll(/(?:^|,)([A-Za-z_][A-Za-z0-9_]*)=/g)].map(
    (m) => m[1]
  );
})();

describe('parseConfig', () => {
  test('parses settings that appear after the CrossplayPlatforms tuple', () => {
    const config = parseConfig(DEFAULT_INI_1_0);

    expect(config['LogFormatType']).toBe('Text');
    expect(config['SupplyDropSpan']).toBe(180);
    expect(config['bIsUseBackupSaveData']).toBe(true);
  });

  test('parses the CrossplayPlatforms tuple as a single value', () => {
    const config = parseConfig(DEFAULT_INI_1_0);

    expect(config['CrossplayPlatforms']).toBe('(Steam,Xbox,PS5,Mac)');
    expect(config).not.toHaveProperty('Xbox');
    expect(config).not.toHaveProperty('PS5');
  });

  test('parses every key present in the 1.0 default config', () => {
    const config = parseConfig(DEFAULT_INI_1_0);

    for (const key of ALL_KEYS_1_0) {
      expect(config, `missing key: ${key}`).toHaveProperty(key);
    }
  });

  test('preserves commas inside quoted string values', () => {
    const config = parseConfig(
      '[/Script/Pal.PalGameWorldSettings]\nOptionSettings=(ServerName="My, cool (server)",ExpRate=2.000000)'
    );

    expect(config['ServerName']).toBe('My, cool (server)');
    expect(config['ExpRate']).toBe(2);
  });

  test('coerces the new 1.0 keys by their declared types', () => {
    const config = parseConfig(DEFAULT_INI_1_0);

    expect(config['bEnableVoiceChat']).toBe(false);
    expect(config['VoiceChatMaxVolumeDistance']).toBe(3000);
    expect(config['bAllowEnhanceStat_WorkSpeed']).toBe(true);
    expect(config['AdditionalDropItemWhenPlayerKillingInPvPMode']).toBe(
      'PlayerDropItem'
    );
    expect(config['BuildingNameDisplayCacheTTLSeconds']).toBe(60);
    expect(config['PhysicsActiveDropItemMaxNum']).toBe(-1);
  });

  test('injects 1.0 defaults when parsing a pre-1.0 config file', () => {
    const config = parseConfig(
      '[/Script/Pal.PalGameWorldSettings]\nOptionSettings=(ServerName="old server",ExpRate=1.000000)'
    );

    expect(config['bEnableVoiceChat']).toBe(false);
    expect(config['BlockRespawnTime']).toBe(5);
    expect(config['AutoTransferMasterThresholdDays']).toBe(14);
    expect(config['CrossplayPlatforms']).toBe('(Steam,Xbox,PS5,Mac)');
    expect(config['bAllowEnhanceStat_Health']).toBe(true);
  });

  test('coerces numbers and booleans by declared type', () => {
    const config = parseConfig(DEFAULT_INI_1_0);

    expect(config['ExpRate']).toBe(1);
    expect(config['RCONPort']).toBe(25575);
    expect(config['bUseAuth']).toBe(true);
    expect(config['bIsPvP']).toBe(false);
  });
});

describe('serializeConfig', () => {
  test('serializes tuple values without surrounding quotes', () => {
    const serialized = serializeConfig(parseConfig(DEFAULT_INI_1_0));

    expect(serialized).toMatch(/CrossplayPlatforms=\(Steam,Xbox,PS5,Mac\)/);
    expect(serialized).not.toMatch(/CrossplayPlatforms="/);
  });

  test('keeps unknown future keys verbatim through a round-trip', () => {
    const serialized = serializeConfig(
      parseConfig(
        '[/Script/Pal.PalGameWorldSettings]\nOptionSettings=(ServerName="test",SomeFutureKey="a,b",SomeFutureTuple=(X,Y))'
      )
    );

    expect(serialized).toContain('SomeFutureKey="a,b"');
    expect(serialized).toContain('SomeFutureTuple=(X,Y)');
  });

  test('round-trips the full 1.0 default config without losing keys', () => {
    const first = parseConfig(DEFAULT_INI_1_0);
    const second = parseConfig(serializeConfig(first));

    expect(second).toEqual(first);

    const serialized = serializeConfig(first);

    for (const key of ALL_KEYS_1_0) {
      expect(serialized, `missing key: ${key}`).toContain(`${key}=`);
    }
  });
});
