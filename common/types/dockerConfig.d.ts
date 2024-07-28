declare interface orderPacket {
    envs: string[];
    ports: string[];
    imageName: string;
    WorkingDir: string;
    containerName: string;
}