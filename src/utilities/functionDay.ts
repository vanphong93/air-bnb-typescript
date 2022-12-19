import moment from "moment";
export const totalDay = (start: moment.MomentInput, end: moment.MomentInput) =>
  moment(start).diff(moment(end), "days");

export const arrayDisabledDays = (data: any[]) => {
  let newData = data.map(
    (item: { ngayDi: moment.MomentInput; ngayDen: moment.MomentInput }) => {
      let dayQuatity = totalDay(item.ngayDi, item.ngayDen);
      return { ...item, dayQuatity };
    }
  );
  let disDatesFormat: string[] = [];
  newData.forEach(
    (item: { dayQuatity: number; ngayDen: moment.MomentInput }) => {
      for (let i = 0; i < item.dayQuatity; i++) {
        let addDay = moment(item.ngayDen).add(i, "days").format("YYYY-MM-DD");
        !disDatesFormat.includes(addDay) && disDatesFormat.push(addDay);
      }
    }
  );
  let disDates = disDatesFormat.map((item) => {
    let newItem = new Date(item);
    return newItem;
  });
  return { disDates, disDatesFormat };
};
