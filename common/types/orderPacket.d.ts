declare interface user {
    envs:Array<string>;
    imageName:string;
    ports:Array<string>;
	WorkingDir:string;
	containerName:string
}