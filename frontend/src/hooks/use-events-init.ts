import { useEffect } from 'react';
import { DesktopApi } from '../desktop';
import {
  AppEvent,
  ConsoleId,
  LoadingStatus,
  ServerStatus,
  TConsoleEntry,
  TGenericFunction,
  TGenericObject
} from '../types';
import { setLoadingStatus } from '../actions/app';
import { addConsoleEntry } from '../actions/console';
import { setStatus } from '../actions/server';

const useEventsInit = () => {
  useEffect(() => {
    const unsubscribes: TGenericFunction[] = [];

    DesktopApi.onAppEvent(
      AppEvent.SET_LOADING_STATUS,
      (status: LoadingStatus) => {
        setLoadingStatus(status);

        if (status === LoadingStatus.DONE) {
          DesktopApi.server.readConfig();
        }
      },
      unsubscribes
    );

    DesktopApi.onAppEvent(
      AppEvent.ADD_CONSOLE_ENTRY,
      (consoleId: ConsoleId, entry: TGenericObject) => {
        const entryObj: TConsoleEntry = {
          timestamp: entry.Timestamp,
          message: entry.Message,
          msgType: entry.MsgType
        };

        addConsoleEntry(consoleId, entryObj);
      },
      unsubscribes
    );

    DesktopApi.onAppEvent(
      AppEvent.SET_SERVER_STATUS,
      (status: ServerStatus) => {
        setStatus(status);
      },
      unsubscribes
    );

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, []);
};

export default useEventsInit;
