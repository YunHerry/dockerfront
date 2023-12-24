interface status {
  state: string;
  value: string;
}
class continerStatusFormatUtils {
  public static readonly statusMap: status[] = [
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
  public static getValue(state: string) {
    return this.statusMap.find((continer) => continer.state == state);
  }
  public static getValues(data: continer[]) {
    data.map((item) => {
      console.log(item);
      item.state = this.getValue(item.state)?.value || item.state;
      return item;
    });
  }
}
export default continerStatusFormatUtils;
