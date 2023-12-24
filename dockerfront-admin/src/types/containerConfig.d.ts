declare interface containerConfig {
    Env: string;
    ExposedPorts: object;
    Image: string;
    WorkingDir: string;
    NetworkDisabled: boolean;
    containerName: string;
}