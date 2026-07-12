const en = {
  common: {
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    close: 'Close',
    delete: 'Delete',
    enabled: 'Enabled',
    execute: 'Execute',
    refresh: 'Refresh',
    hours: 'Hours',
    seconds: 'Seconds',
    here: 'here.'
  },
  nav: {
    server: 'Server',
    gameSettings: 'Game Settings',
    otherSettings: 'Other Settings',
    admin: 'Admin',
    backups: 'Backups',
    appSettings: 'App Settings',
    about: 'About',
    disconnect: 'Disconnect'
  },
  home: {
    status: {
      started: 'Server is running',
      starting: 'Starting...',
      stopped: 'Server is stopped',
      stopping: 'Stopping...',
      restarting: 'Restarting...',
      updating: 'Updating...'
    },
    start: 'Start',
    stop: 'Stop',
    restart: 'Restart',
    updateServer: 'Update Server',
    update: 'Update',
    launchParams: 'Launch params',
    saveLaunchParams: 'Save launch params',
    updateConfirmTitle: 'Are you sure you want to update the server?',
    updateConfirmBody:
      'This will stop the server and update it to the latest version.',
    updateConfirmBackupWarning: 'Make sure to backup your server first',
    updateConfirmBreakingChanges:
      ', new updates may introduce breaking changes.',
    updateNotesAvailable: 'Update notes should be available here:'
  },
  serverSettings: {
    title: 'Game Settings',
    subtitle: 'Server must be restarted for changes to take effect',
    saveSection: 'Save Data',
    saveName: 'Save Name',
    saveNameEmptyHelp:
      'Save name is empty, which means you probably never joined the server. To change this value, you must first join the server once.',
    saved: 'Game settings saved'
  },
  configCategory: {
    serverBasic: 'Server',
    gameplay: 'Gameplay',
    damage: 'Damage',
    survival: 'Survival',
    items: 'Items',
    baseCamp: 'Base Camp',
    guild: 'Guild',
    player: 'Player',
    gameMode: 'Game Mode',
    pvp: 'PvP',
    features: 'Features',
    statEnhance: 'Stat Enhancement',
    voiceChat: 'Voice Chat',
    pals: 'Pals',
    performance: 'Performance',
    misc: 'Miscellaneous'
  },
  config: {
    ServerName: 'Server Name',
    ServerDescription: 'Server Description',
    ServerPassword: 'Server Password',
    PublicIP: 'Public IP',
    PublicPort: 'Public Port',
    ServerPlayerMaxNum: 'Server Player Maximum Number',
    AdminPassword: 'Admin Password',
    RCONEnabled: 'RCON Enabled',
    RCONPort: 'RCON Port',
    RESTAPIEnabled: 'REST API Enabled',
    RESTAPIPort: 'REST API Port',
    Region: 'Region',
    bUseAuth: 'Use Authentication',
    BanListURL: 'Ban List URL',
    bAllowClientMod: 'Allow Client Mods',
    bIsShowJoinLeftMessage: 'Show Join/Leave Messages',
    Difficulty: 'Difficulty',
    ExpRate: 'Experience Rate',
    PalCaptureRate: 'Pal Capture Rate',
    PalSpawnNumRate: 'Pal Spawn Number Rate',
    WorkSpeedRate: 'Work Speed Rate',
    DayTimeSpeedRate: 'Day Time Speed Rate',
    NightTimeSpeedRate: 'Night Time Speed Rate',
    AutoSaveSpan: 'Auto Save Interval (Seconds)',
    PalDamageRateAttack: 'Pal Damage Rate (Attack)',
    PalDamageRateDefense: 'Pal Damage Rate (Defense)',
    PlayerDamageRateAttack: 'Player Damage Rate (Attack)',
    PlayerDamageRateDefense: 'Player Damage Rate (Defense)',
    BuildObjectHpRate: 'Build Object HP Rate',
    BuildObjectDamageRate: 'Build Object Damage Rate',
    BuildObjectDeteriorationDamageRate:
      'Build Object Deterioration Damage Rate',
    EquipmentDurabilityDamageRate: 'Equipment Durability Damage Rate',
    PlayerStomachDecreaceRate: 'Player Hunger Decrease Rate',
    PlayerStaminaDecreaceRate: 'Player Stamina Decrease Rate',
    PlayerAutoHPRegeneRate: 'Player Auto HP Regeneration Rate',
    PlayerAutoHpRegeneRateInSleep: 'Player Auto HP Regeneration Rate (Sleep)',
    PalStomachDecreaceRate: 'Pal Hunger Decrease Rate',
    PalStaminaDecreaceRate: 'Pal Stamina Decrease Rate',
    PalAutoHPRegeneRate: 'Pal Auto HP Regeneration Rate',
    PalAutoHpRegeneRateInSleep: 'Pal Auto HP Regeneration Rate (Sleep)',
    DeathPenalty: 'Death Penalty',
    CollectionDropRate: 'Collection Drop Rate',
    CollectionObjectHpRate: 'Collection Object HP Rate',
    CollectionObjectRespawnSpeedRate: 'Collection Object Respawn Speed Rate',
    EnemyDropItemRate: 'Enemy Drop Item Rate',
    DropItemMaxNum: 'Drop Item Maximum Number',
    DropItemAliveMaxHours: 'Drop Item Alive Maximum Hours',
    ItemWeightRate: 'Item Weight Rate',
    ItemCorruptionMultiplier: 'Item Corruption Multiplier',
    PhysicsActiveDropItemMaxNum: 'Physics-Active Drop Item Maximum Number',
    BaseCampMaxNum: 'Base Camp Maximum Number',
    BaseCampWorkerMaxNum: 'Base Camp Worker Maximum Number',
    BaseCampMaxNumInGuild: 'Base Camp Maximum Number per Guild',
    MaxBuildingLimitNum: 'Maximum Building Limit per Player',
    bEnableBuildingPlayerUIdDisplay: 'Show Builder ID on Structures',
    GuildPlayerMaxNum: 'Guild Player Maximum Number',
    bAutoResetGuildNoOnlinePlayers: 'Auto Reset Guild (No Online Players)',
    AutoResetGuildTimeNoOnlinePlayers:
      'Auto Reset Guild Time (No Online Players, Hours)',
    GuildRejoinCooldownMinutes: 'Guild Rejoin Cooldown (Minutes)',
    AutoTransferMasterCheckIntervalSeconds:
      'Guild Master Auto Transfer Check Interval (Seconds)',
    AutoTransferMasterThresholdDays:
      'Guild Master Auto Transfer Threshold (Days)',
    CoopPlayerMaxNum: 'Coop Player Maximum Number',
    bEnablePlayerToPlayerDamage: 'Enable Player-to-Player Damage',
    bEnableFriendlyFire: 'Enable Friendly Fire',
    bCanPickupOtherGuildDeathPenaltyDrop:
      'Can Pickup Other Guild Death Penalty Drop',
    bIsMultiplay: 'Is Multiplay',
    bIsPvP: 'Is PvP',
    bHardcore: 'Enable Hardcore',
    bPalLost: 'Lose Pals on Death',
    bCharacterRecreateInHardcore: 'Character Recreate in Hardcore',
    bDisplayPvPItemNumOnWorldMap_BaseCamp:
      'Show PvP Item Count on World Map (Base Camp)',
    bDisplayPvPItemNumOnWorldMap_Player:
      'Show PvP Item Count on World Map (Player)',
    bAdditionalDropItemWhenPlayerKillingInPvPMode:
      'Enable Additional Drop on PvP Kill',
    AdditionalDropItemWhenPlayerKillingInPvPMode:
      'Additional Drop Item ID on PvP Kill',
    AdditionalDropItemNumWhenPlayerKillingInPvPMode:
      'Additional Drop Item Count on PvP Kill',
    BlockRespawnTime: 'Respawn Cooldown Time (Seconds)',
    RespawnPenaltyDurationThreshold:
      'Respawn Penalty Duration Threshold (Seconds)',
    RespawnPenaltyTimeScale: 'Respawn Penalty Time Scale',
    bEnableFastTravel: 'Enable Fast Travel',
    bEnableFastTravelOnlyBaseCamp: 'Fast Travel Only Between Base Camps',
    bEnableInvaderEnemy: 'Enable Invader Enemy',
    EnablePredatorBossPal: 'Enable Predator Boss Pals',
    bEnableNonLoginPenalty: 'Enable Non-Login Penalty',
    bIsStartLocationSelectByMap: 'Select Start Location by Map',
    bExistPlayerAfterLogout: 'Player Remains After Logout',
    bEnableDefenseOtherGuildPlayer: 'Enable Defense Other Guild Player',
    bInvisibleOtherGuildBaseCampAreaFX: 'Hide Other Guild Base Camp Area FX',
    bShowPlayerList: 'Show Player List',
    bIsUseBackupSaveData: 'Use Backup Save Data',
    bAllowEnhanceStat_Health: 'Allow Stat Enhancement: HP',
    bAllowEnhanceStat_Attack: 'Allow Stat Enhancement: Attack',
    bAllowEnhanceStat_Stamina: 'Allow Stat Enhancement: Stamina',
    bAllowEnhanceStat_Weight: 'Allow Stat Enhancement: Carry Weight',
    bAllowEnhanceStat_WorkSpeed: 'Allow Stat Enhancement: Work Speed',
    bEnableVoiceChat: 'Enable Voice Chat',
    VoiceChatMaxVolumeDistance: 'Voice Chat Max Volume Distance',
    VoiceChatZeroVolumeDistance: 'Voice Chat Zero Volume Distance',
    PalEggDefaultHatchingTime: 'Pal Egg Default Hatching Time (Hours)',
    MonsterFarmActionSpeedRate: 'Ranch Production Speed Rate',
    bAllowGlobalPalboxExport: 'Allow Global Palbox Export',
    bAllowGlobalPalboxImport: 'Allow Global Palbox Import',
    bIsRandomizerPalLevelRandom: 'Randomize Pal Levels (Randomizer)',
    RandomizerSeed: 'Randomizer Seed',
    RandomizerType: 'Randomizer Type',
    ServerReplicatePawnCullDistance: 'Pal Sync Distance (5000-15000)',
    MaxGuildsPerFrame: 'Max Guilds Processed per Frame',
    ItemContainerForceMarkDirtyInterval:
      'Item Container Force Sync Interval (Seconds)',
    PlayerDataPalStorageUpdateCheckTickInterval:
      'Pal Storage Update Check Interval (Seconds)',
    BuildingNameDisplayCacheTTLSeconds:
      'Building Name Display Cache TTL (Seconds)',
    bActiveUNKO: 'Active UNKO',
    DropItemMaxNum_UNKO: 'Drop Item Maximum Number (UNKO)',
    bEnableAimAssistPad: 'Enable Aim Assist (Pad)',
    bEnableAimAssistKeyboard: 'Enable Aim Assist (Keyboard)',
    bBuildAreaLimit: 'Build Area Limit',
    ChatPostLimitPerMinute: 'Chat Post Limit per Minute',
    CrossplayPlatforms: 'Crossplay Platforms',
    DenyTechnologyList: 'Denied Technology List',
    LogFormatType: 'Log Format Type',
    SupplyDropSpan: 'Supply Drop Interval (Minutes)'
  },
  admin: {
    title: 'Admin',
    connecting: 'Connecting...',
    executeCommand: 'Execute Command',
    restDisabledTooltip:
      'The REST API is disabled on the server. Enable "REST API Enabled" in the game settings to use this section.',
    refreshTooltip: 'Gets fresh data from the server',
    saveTooltip: 'Executes the save command on the server',
    messagePlaceholder: 'Write a message to send to the server...',
    messageSent: 'Message sent',
    saveExecuted: 'Save command executed',
    dataRefreshed: 'Data refreshed',
    requestFailed: 'Request failed: {{error}}',
    columns: {
      image: 'Image',
      name: 'Name',
      uid: 'Player UID',
      steamId: 'Steam ID',
      actions: 'Actions'
    },
    kick: 'Kick',
    ban: 'Ban',
    confirmation: 'Confirmation',
    banConfirm: 'Are you sure you want to ban {{name}}? The ban is permanent.',
    kickConfirm: 'Are you sure you want to kick {{name}}?'
  },
  backups: {
    title: 'Backups',
    subtitle: 'Manage your backups',
    createNow: 'Create new backup now',
    interval: 'Interval',
    keep: 'Keep',
    backupsUnit: 'Backups',
    columns: {
      save: 'Save Name',
      date: 'Date',
      size: 'Size',
      actions: 'Actions'
    },
    download: 'Download',
    downloadInProgress: 'A download is in progress...',
    restore: 'Restore',
    deleteBackup: 'Delete backup',
    restoreConfirm:
      'Are you sure you want to restore this backup? This action is irreversible. Make sure you have a backup of your current save.',
    deleteConfirm:
      'Are you sure you want to delete this backup? This action is irreversible.',
    downloadStarted: 'Backup download started.',
    downloadFailed: 'Backup download failed.'
  },
  additionalSettings: {
    title: 'Additional Settings',
    timedRestart: {
      title: 'Timed restart',
      description: 'Schedule server restarts at regular intervals',
      interval: 'Interval'
    },
    restartOnCrash: {
      title: 'Restart on crash',
      description: 'Automatically restart the server if it crashes'
    },
    stopCountdown: {
      title: 'Stop Countdown announcement',
      description: 'Announce server stop countdown message',
      startAt: 'Start At'
    }
  },
  appSettings: {
    title: 'App Settings',
    toDarkTheme: 'Change to dark theme',
    toLightTheme: 'Change to light theme',
    openLogs: 'Open Logs Folder',
    clearData: 'Clear Data',
    clearDataConfirmTitle: 'Clear Data',
    clearDataConfirmMessage:
      'Are you sure you want to clear your data? All your app settings will be lost. The data of your dedicated server will NOT be affected. This can help to solve some issues. You will need to restart the app after clearing the data.',
    dataCleared: 'Data cleared. Please restart the app.',
    language: 'Language'
  },
  about: {
    title: 'About',
    newVersion: 'A new version is available (v{{version}})',
    latestVersion: 'You are using the latest version 🎉',
    checkUpdates: 'Check for updates now',
    openSourcePrefix: 'This software is open source and available',
    openSourceSuffix: '. Contributions are welcome.',
    here: 'here',
    disclaimer:
      'This software is not affiliated with or endorsed by the original authors of the software it is intended to manage.',
    licensedUnder: 'Licensed under the',
    createdBy: 'Created by'
  },
  initializing: {
    appTitle: 'Dedicated Server GUI (modified)',
    versionLine: 'v{{version}} - for Palworld 1.0+',
    address: 'GUI Server Address',
    addressTooltip:
      'The address and port of the GUI server. Make sure you use the port of the GUI server and NOT the PalWorld server.',
    apiKey: 'API Key',
    apiKeyTooltip:
      'The API key of the GUI server. On the initial startup, the API key will be generated and shown in the console. You can also start the server with the -showkey flag to show the API key. Make sure to keep the API key secret.',
    connect: 'Connect',
    connectionError:
      'Could not connect. Make sure the GUI server is running and the address and API key are correct.',
    helpIssue: 'If you need help, please create an issue',
    webVersionNote:
      'You are using the web version. You can also download the desktop app',
    desktopVersionNote:
      'You are using the desktop app. You can also use the web version'
  },
  toasts: {
    configSaveFailed: 'Could not save config',
    saveNameSaveFailed: 'Could not save save name',
    launchParamsSaved: 'Launch params saved',
    launchParamsSaveFailed: 'Could not save launch params',
    additionalSettingsSaved: 'Additional settings saved',
    additionalSettingsSaveFailed: 'Could not save additional settings',
    backupsEnabled: 'Backups are now enabled',
    backupsEnableFailed: 'Could not start backups',
    backupsDisabled: 'Backups are now disabled',
    backupsDisableFailed: 'Could not stop backups',
    backupDeleted: 'Backup deleted',
    backupDeleteFailed: 'Could not delete backup',
    backupCreated: 'Backup created',
    backupCreateFailed: 'Could not create backup',
    backupRestored: 'Backup restored',
    backupRestoreFailed: 'Could not restore backup'
  },
  modals: {
    confirmTitle: 'Please confirm your action.',
    areYouSure: 'Are you sure?',
    execRcon: {
      title: 'Execute RCON Command',
      commandLabel: 'Command',
      placeholder: 'Write your command here...',
      response: 'Server response:'
    },
    versionMismatch: {
      title: 'Version Mismatch',
      body: 'The server version is different from the client version. This may cause issues. Please make sure the server and this app are up to date.',
      serverVersion: 'Server version:',
      clientVersion: 'Client version:',
      downloadLatest: 'Download latest versions here',
      understood: 'I understand'
    }
  }
};

export default en;
