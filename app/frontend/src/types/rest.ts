// 팰월드 게임 서버 REST API 응답 타입
// https://docs.palworldgame.com/category/rest-api

export type TRestInfo = {
  version: string;
  servername: string;
  description: string;
  worldguid: string;
};

export type TRestPlayer = {
  name: string;
  accountName: string;
  playerId: string;
  userId: string;
  ip: string;
  ping: number;
  location_x: number;
  location_y: number;
  level: number;
  building_count: number;
};
