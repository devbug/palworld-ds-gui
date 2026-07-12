import { SocketAction, TAdditionalSettings, TGenericObject } from './types';
import { parseConfig, serializeConfig } from './helpers/config-parser';
import { setConfig, setSaveName } from './actions/server';
import { ConfigKey, TConfig } from './types/server-config';
import { store } from './store';
import { addSteamImage, notifyError, notifySuccess } from './actions/app';
import i18n from './i18n';
import { socketStateSelector } from './selectors/socket';
import {
  onBackupListUpdated,
  onBackupSettingsUpdated,
  onClientInited
} from './actions/socket';
import { DesktopAPI } from './desktop';
import { TRestInfo, TRestPlayer } from './types/rest';
import { serverConfigSelector } from './selectors/server';

const TIMEOUT_MS = 10000;

export const ServerAPI = {
  send: async (
    event: SocketAction,
    data?: TGenericObject,
    waitForResponse = true
  ): Promise<TGenericObject> => {
    return new Promise((resolve, reject) => {
      const state = store.getState();
      const { socket } = socketStateSelector(state);
      let timeoutId: NodeJS.Timeout | undefined = undefined;

      try {
        const eventId = Math.random().toString(36).substring(2);

        socket.send(JSON.stringify({ event, eventId, data }));

        if (!waitForResponse) {
          resolve({});
          return;
        }

        const onMessage = (event) => {
          const response = JSON.parse(event.data);

          if (response.eventId === eventId) {
            clearTimeout(timeoutId);
            socket.removeEventListener('message', onMessage);

            delete response.eventId;
            delete response.event;

            if (response.success) {
              resolve(response);
            } else {
              DesktopAPI.logToFile(
                `Socket responded with error: ${response.error} for event: ${event} and data: ${data}`
              );
              reject(response.error ?? 'Unknown error');
            }
          }
        };

        timeoutId = setTimeout(() => {
          socket.removeEventListener('message', onMessage);
          reject(new Error(`Request timed out for event: ${event}`));
        }, TIMEOUT_MS);

        socket.addEventListener('message', onMessage);
      } catch (error) {
        clearTimeout(timeoutId);
        DesktopAPI.logToFile('Unknown error while handling socket event');
        reject(error ?? 'Unknown error');
      }
    });
  },
  fetchConfig: async () => {
    const { data: configString } = await ServerAPI.send(
      SocketAction.READ_CONFIG
    );
    const config = parseConfig(configString);

    setConfig(config);
  },
  writeConfig: async (config: TConfig) => {
    try {
      const serializedConfig = serializeConfig(config);
      await ServerAPI.send(SocketAction.WRITE_CONFIG, {
        config: serializedConfig
      });
    } catch {
      notifyError(i18n.t('toasts.configSaveFailed'));
    }
  },
  fetchSaveName: async () => {
    const { data: saveNameString } = await ServerAPI.send(
      SocketAction.READ_SAVE_NAME
    );

    setSaveName(saveNameString);
  },
  writeSaveName: async (saveName: string) => {
    try {
      await ServerAPI.send(SocketAction.WRITE_SAVE_NAME, { saveName });
    } catch {
      notifyError(i18n.t('toasts.saveNameSaveFailed'));
    }
  },
  start: async () => {
    ServerAPI.send(SocketAction.START_SERVER, undefined, false);
  },
  stop: () => {
    ServerAPI.send(SocketAction.STOP_SERVER, undefined, false);
  },
  restart: () => {
    ServerAPI.send(SocketAction.RESTART_SERVER, undefined, false);
  },
  update: () => {
    ServerAPI.send(SocketAction.UPDATE_SERVER, undefined, false);
  },
  init: async () => {
    const { data } = await ServerAPI.send(SocketAction.INIT);

    onClientInited(data);
  },
  saveLaunchParams: async (launchParams: string) => {
    try {
      await ServerAPI.send(SocketAction.SAVE_LAUNCH_PARAMS, { launchParams });
      notifySuccess(i18n.t('toasts.launchParamsSaved'));
    } catch {
      notifyError(i18n.t('toasts.launchParamsSaveFailed'));
    }
  },
  saveAdditionalSettings: async (newSettings: TAdditionalSettings) => {
    try {
      await ServerAPI.send(SocketAction.SAVE_ADDITIONAL_SETTINGS, {
        newSettings
      });

      notifySuccess(i18n.t('toasts.additionalSettingsSaved'));
    } catch {
      notifyError(i18n.t('toasts.additionalSettingsSaveFailed'));
    }
  },
  utils: {
    getProfileAvatarURL: async (steamID64: string) => {
      const { data: avatarUrl } = await ServerAPI.send(
        SocketAction.GET_STEAM_AVATAR,
        {
          steamID64
        }
      );

      addSteamImage(steamID64, avatarUrl);
    }
  },
  backups: {
    start: async (interval: number, keepCount: number) => {
      try {
        await ServerAPI.send(SocketAction.START_BACKUPS, {
          interval,
          keepCount
        });
        notifySuccess(i18n.t('toasts.backupsEnabled'));
      } catch {
        notifyError(i18n.t('toasts.backupsEnableFailed'));
      }
    },
    stop: async () => {
      try {
        await ServerAPI.send(SocketAction.STOP_BACKUPS);
        notifySuccess(i18n.t('toasts.backupsDisabled'));
      } catch {
        notifyError(i18n.t('toasts.backupsDisableFailed'));
      }
    },
    fetchCurrentSettings: async () => {
      const { data } = await ServerAPI.send(SocketAction.GET_BACKUPS_SETTINGS);

      onBackupSettingsUpdated(data);
    },
    fetchList: async () => {
      const { data } = await ServerAPI.send(SocketAction.GET_BACKUPS_LIST);

      onBackupListUpdated(data);
    },
    delete: async (backupFileName: string) => {
      try {
        await ServerAPI.send(SocketAction.DELETE_BACKUP, { backupFileName });
        notifySuccess(i18n.t('toasts.backupDeleted'));
      } catch {
        notifyError(i18n.t('toasts.backupDeleteFailed'));
      }
    },
    create: async () => {
      try {
        await ServerAPI.send(SocketAction.CREATE_BACKUP);
        notifySuccess(i18n.t('toasts.backupCreated'));
      } catch {
        notifyError(i18n.t('toasts.backupCreateFailed'));
      }
    },
    restore: async (backupFileName: string) => {
      try {
        await ServerAPI.send(SocketAction.RESTORE_BACKUP, { backupFileName });
        notifySuccess(i18n.t('toasts.backupRestored'));
      } catch {
        notifyError(i18n.t('toasts.backupRestoreFailed'));
      }
    }
  },
  rcon: {
    // 고급 사용자용 임의 명령 실행 (RCON은 1.0에서 deprecated — 관리 기능은 rest 사용)
    execute: async (command: string) => {
      const state = store.getState();
      const serverConfig = serverConfigSelector(state);

      const { data: result } = await ServerAPI.send(SocketAction.RCON_EXECUTE, {
        hostname: `127.0.0.1:${serverConfig[ConfigKey.RCONPort]}`,
        password: serverConfig[ConfigKey.AdminPassword],
        command
      });

      return (result ?? '').trim();
    }
  },
  rest: {
    request: async (
      endpoint: string,
      body?: TGenericObject
    ): Promise<string> => {
      const { data } = await ServerAPI.send(SocketAction.REST_REQUEST, {
        endpoint,
        body: body ? JSON.stringify(body) : ''
      });

      return data ?? '';
    },
    getInfo: async (): Promise<TRestInfo | undefined> => {
      try {
        return JSON.parse(await ServerAPI.rest.request('info'));
      } catch (error) {
        DesktopAPI.logToFile(`REST info failed: ${error?.toString()}`);
        return undefined;
      }
    },
    getPlayers: async (): Promise<TRestPlayer[]> => {
      try {
        const result = JSON.parse(await ServerAPI.rest.request('players'));
        const players: TRestPlayer[] = result?.players ?? [];

        players.forEach((player) => {
          const steamId = player.userId?.replace(/^steam_/, '');

          if (steamId) {
            // crawl steam profile image and cache the url in the store
            ServerAPI.utils.getProfileAvatarURL(steamId);
          }
        });

        return players;
      } catch (error) {
        DesktopAPI.logToFile(`REST players failed: ${error?.toString()}`);
        return [];
      }
    },
    save: async () => {
      await ServerAPI.rest.request('save');
    },
    announce: async (message: string) => {
      await ServerAPI.rest.request('announce', { message });
    },
    kick: async (userId: string, message = '') => {
      await ServerAPI.rest.request('kick', { userid: userId, message });
    },
    ban: async (userId: string, message = '') => {
      await ServerAPI.rest.request('ban', { userid: userId, message });
    }
  }
};
