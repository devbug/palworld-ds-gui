import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  getKeyValue
} from '@nextui-org/react';
import Layout from '../../components/layout';
import { DesktopAPI } from '../../desktop';
import { useEffect, useMemo, useRef, useState } from 'react';
import useSteamImages from '../../hooks/use-steam-images';
import {
  IconAlertCircle,
  IconDeviceFloppy,
  IconDotsVertical,
  IconHammer,
  IconRefresh,
  IconSend,
  IconTerminal2,
  IconUserCancel
} from '@tabler/icons-react';
import { Modal, ServerStatus, TGenericObject } from '../../types';
import { openModal, requestConfirmation } from '../../actions/modal';
import { TRestInfo } from '../../types/rest';
import useServerConfig from '../../hooks/use-server-config';
import { ConfigKey } from '../../types/server-config';
import { notifyError, notifySuccess } from '../../actions/app';
import { ServerAPI } from '../../server';
import useServerStatus from '../../hooks/use-server-status';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const getColumns = () => [
  {
    key: 'image',
    label: i18n.t('admin.columns.image')
  },
  {
    key: 'name',
    label: i18n.t('admin.columns.name')
  },
  {
    key: 'uid',
    label: i18n.t('admin.columns.uid')
  },
  {
    key: 'steamId',
    label: i18n.t('admin.columns.steamId')
  },
  {
    key: 'actions',
    label: i18n.t('admin.columns.actions')
  }
];

type TAdminPlayerRow = {
  key: string;
  name: string;
  uid: string;
  userId: string;
  steamId: string;
  image?: string;
};

type TAdminActionsProps = {
  player: TAdminPlayerRow;
};

const AdminActions = ({ player }: TAdminActionsProps) => {
  const { t } = useTranslation();

  const onBanClick = async () => {
    await requestConfirmation({
      title: t('admin.confirmation'),
      message: t('admin.banConfirm', { name: player.name }),
      confirmLabel: t('admin.ban'),
      variant: 'danger',
      onConfirm: async () => {
        await ServerAPI.rest.ban(player.userId);
      }
    });
  };

  const onKickClick = async () => {
    await requestConfirmation({
      title: t('admin.confirmation'),
      message: t('admin.kickConfirm', { name: player.name }),
      confirmLabel: t('admin.kick'),
      variant: 'danger',
      onConfirm: async () => {
        await ServerAPI.rest.kick(player.userId);
      }
    });
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button size="sm" isIconOnly variant="light">
          <IconDotsVertical size="1.0rem" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="kick"
          endContent={<IconUserCancel size="1.0rem" />}
          onClick={onKickClick}
        >
          {t('admin.kick')}
        </DropdownItem>
        <DropdownItem
          key="ban"
          className="text-danger"
          color="danger"
          endContent={<IconHammer size="1.0rem" />}
          onClick={onBanClick}
        >
          {t('admin.ban')}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const Admin = () => {
  const { t } = useTranslation();
  const serverStatus = useServerStatus();
  const intervalRef = useRef<NodeJS.Timeout>();
  const steamImages = useSteamImages();
  const serverConfig = useServerConfig();
  const [isOnline, setIsOnline] = useState(false);
  const [info, setInfo] = useState<TRestInfo | undefined>();
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [rows, setRows] = useState<TGenericObject[]>([]);
  const [message, setMessage] = useState('');
  const processedRows = useMemo(() => {
    return rows.map((row) => ({
      ...row,
      image: steamImages[row.steamId]
    })) as TAdminPlayerRow[];
  }, [rows, steamImages]);

  const loadInfo = async () => {
    setIsOnline(false);

    const result = await ServerAPI.rest.getInfo();

    if (result?.servername) {
      setIsOnline(true);
      loadPlayers();
    } else {
      setIsOnline(false);
    }

    setInfo(result);
  };

  const loadPlayers = async () => {
    setLoading(true);

    const players = await ServerAPI.rest.getPlayers();
    const processedPlayers = players.map((player) => ({
      key: player.playerId,
      name: player.name,
      uid: player.playerId,
      userId: player.userId,
      steamId: player.userId?.replace(/^steam_/, '') ?? ''
    }));

    setRows(processedPlayers);
    setLoading(false);
  };

  const onSendMessageClick = async () => {
    try {
      await ServerAPI.rest.announce(message);
      setMessage('');
      notifySuccess(t('admin.messageSent'));
    } catch (error) {
      notifyError(t('admin.requestFailed', { error }));
    }
  };

  const onSaveClick = async () => {
    setIsSaving(true);

    try {
      await ServerAPI.rest.save();
      notifySuccess(t('admin.saveExecuted'));
    } catch (error) {
      notifyError(t('admin.requestFailed', { error }));
    } finally {
      setIsSaving(false);
    }
  };

  const onRefreshClick = async () => {
    await loadInfo();
    notifySuccess(t('admin.dataRefreshed'));
  };

  useEffect(() => {
    if (serverStatus !== ServerStatus.STARTED) {
      setIsOnline(false);
      return;
    }

    loadInfo();

    intervalRef.current = setInterval(() => loadInfo(), 60 * 1000); // 1 minute interval to refresh the data

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverStatus]);

  return (
    <Layout
      className="relative flex flex-col gap-4"
      title={t('admin.title')}
      subtitle={
        isOnline ? (
          <div>
            <span className="text-sm text-neutral-500">{info?.version} - </span>
            <span className="text-sm text-neutral-200">
              {rows.length}/{serverConfig[ConfigKey.ServerPlayerMaxNum]}
            </span>
          </div>
        ) : (
          <span className="text-sm text-neutral-500">
            {t('admin.connecting')}
          </span>
        )
      }
      rightSlot={
        <div className="flex gap-2 w-full justify-center items-center">
          {!serverConfig[ConfigKey.RESTAPIEnabled] ? (
            <div>
              <Tooltip content={t('admin.restDisabledTooltip')}>
                <IconAlertCircle size="1.3rem" color="yellow" />
              </Tooltip>
            </div>
          ) : (
            <Button
              variant="shadow"
              color="primary"
              size="sm"
              isDisabled={!isOnline}
              isLoading={loading}
              endContent={<IconTerminal2 size="0.9rem" />}
              onClick={() => {
                openModal(Modal.EXEC_RCON_COMMAND);
              }}
            >
              {t('admin.executeCommand')}
            </Button>
          )}
        </div>
      }
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2">
          <Tooltip content={t('admin.refreshTooltip')}>
            <Button
              variant="shadow"
              color="primary"
              size="sm"
              onClick={onRefreshClick}
              isLoading={loading}
              isDisabled={serverStatus !== ServerStatus.STARTED}
              endContent={<IconRefresh size="0.9rem" />}
            >
              {t('common.refresh')}
            </Button>
          </Tooltip>
          <Tooltip content={t('admin.saveTooltip')}>
            <Button
              variant="shadow"
              color="primary"
              size="sm"
              onClick={onSaveClick}
              isLoading={isSaving}
              isDisabled={!isOnline}
              endContent={<IconDeviceFloppy size="0.9rem" />}
            >
              {t('common.save')}
            </Button>
          </Tooltip>
        </div>

        <div>
          <Input
            className="w-[300px]"
            placeholder={t('admin.messagePlaceholder')}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onSendMessageClick();
              }
            }}
            value={message}
            isDisabled={!isOnline}
            endContent={
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onClick={onSendMessageClick}
              >
                <IconSend size="0.9rem" />
              </Button>
            }
          />
        </div>
      </div>

      <Table className="max-h-[346px]">
        <TableHeader columns={getColumns()}>
          {(column) => <TableColumn {...column}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody
          items={processedRows}
          isLoading={loading}
          loadingContent={<Spinner />}
          className="overflow-y-scroll"
        >
          {(item) => (
            <TableRow key={item.uid}>
              {(columnKey) => {
                if (columnKey === 'actions') {
                  return (
                    <TableCell>
                      <AdminActions player={item as any} />
                    </TableCell>
                  );
                } else if (columnKey === 'image') {
                  return (
                    <TableCell>
                      <img src={item.image} width="32px" height="32px" />
                    </TableCell>
                  );
                } else if (columnKey === 'steamId') {
                  return (
                    <TableCell>
                      <span
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={() =>
                          DesktopAPI.openUrl(
                            `https://steamcommunity.com/profiles/${item.steamId}`
                          )
                        }
                      >
                        {item.steamId}
                      </span>
                    </TableCell>
                  );
                }

                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Layout>
  );
};

export default Admin;
