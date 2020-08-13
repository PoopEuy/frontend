export default (datas) => {
  if (datas != 0) {
    let object = Object.keys(datas[0]);
    let columns = [];
    object.forEach((element) => {
      columns.push({
        name: element,
        label: element.toLocaleUpperCase(),
      });
    });
    return {
      columns: columns,
      data: datas,
    };
  }
  return datas;
};
