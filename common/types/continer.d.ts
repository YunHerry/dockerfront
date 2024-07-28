declare interface continer {
    createdAt: string;
    updatedAt: string;
    id: string;
    imageName:string;
    name:string;
    description:string;
    ownerId:number;
    state:string;
    packetId:number;
    leaseAt:string;
    leaseEnd:string|null;
}