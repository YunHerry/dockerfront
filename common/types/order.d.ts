
interface order {
    createdAt: string,
    updatedAt: string,
    id: number,
    name: string,
    userId: number,
    money: number,
    //@TODO
    payWay: string|null,
    containerId: string,
    packetId: number,
    description: string,
    state: string
}