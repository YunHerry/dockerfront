declare interface pullImage {
    t:{
        createdAt: string;
        updatedAt: string;
        id: string;
        name:string;
        tag:string;
        repository:string;
        imageId:string;
        size:number;
        unit:string;
        author:number;
        };
    name: string;
    desc: string;
    status: string;
    eventId: number;
}