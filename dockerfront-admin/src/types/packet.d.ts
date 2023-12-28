declare interface packet {
  createdAt: string;
  updatedAt: string;
  id: number;
  description: string;
  name: string | null;
  hardwareId: number;
}