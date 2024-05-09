declare interface packet {
  hardware: hardware;
  id: number;
  description: string;
  name: string;
  hardwareId: number;
}
declare interface hardware {
  cpuCoreNumber: number;
  cpuType: string;
  createdAt: string;
  disk: number;
  id: number;
  memory: number;
  money: number;
  networkSpeed: number;
  updatedAt: string;
}
