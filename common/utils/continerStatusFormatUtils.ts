interface status {
  state: string;
  value: string;
}
const statusMap: status[] = [
  {
    state: "1",
    value: "运行中",
  },
  {
    state: "2",
    value: "暂停",
  },
  {
    state: "3",
    value: "重启中",
  },
];
export function getValue(state: string) {
  return statusMap.find((continer) => continer.state == state);
}
export function getValues(data: continer[]) {
  data.map((item) => {
    console.log(item);
    item.state = getValue(item.state)?.value || item.state;
    return item;
  });
}
