import dataMap from "./datamap";

export const dataMapApt2 = (datas) => {
  const mxEh = 350;
  const mxEdl = 110;
  let edl1 = [],
    time_local = [],
    edl2 = [],
    eh1 = [],
    eh2 = [],
    eh3 = [],
    batt_volt = [],
    pms = [],
    bv = [],
    colorEh1 = [],
    colorEh2 = [],
    colorEh3 = [],
    colorBattVolt = [],
    colorEdl1 = [],
    colorEdl2 = [],
    labels = [],
    chart = [];

  let hedl1, hedl2, heh1, heh2, heh3, hbv;
  const green = "rgba(22, 145, 13, 1)";
  const blue = "rgba(52, 67, 203, 1)";
  const red = "rgba(230, 0, 0, 1)";
  const black = "rgba(0, 0, 0, 1)";

  datas.forEach((data, index) => {
    if (data.eh1 == null) {
      eh1.push(100);
      colorEh1.push(black);
    } else {
      heh1 = Math.abs(Math.round(dataMap(data.eh1, 0, mxEh, 0, 50)));
      if (heh1 > 50) heh1 = 50;
      eh1.push(heh1);
      colorEh1.push(green);
    }

    if (data.eh2 == null) {
      eh2.push(100);
      colorEh2.push(black);
    } else {
      heh2 = Math.abs(Math.round(dataMap(data.eh2, 0, mxEh, 0, 50)));
      if (heh2 > 50) heh2 = 50;
      eh2.push(heh2);
      colorEh2.push(green);
    }

    if (data.eh3 == null) {
      eh3.push(100);
      colorEh3.push(black);
    } else {
      heh3 = Math.abs(Math.round(dataMap(data.eh3, 0, mxEh, 0, 50)));
      if (heh3 > 50) heh3 = 50;
      eh3.push(heh3);
      colorEh3.push(green);
    }

    if (data.batt_volt == null) {
      batt_volt.push(100);
      colorBattVolt.push(black);
    } else {
      hbv = Math.round(dataMap(data.batt_volt, 40, 55, 0, 30));
      if (hbv > 30) hbv = 30;
      batt_volt.push(hbv);
      colorBattVolt.push(blue);
    }

    if (data.edl1 == null) {
      edl1.push(100 * -1);
      colorEdl1.push(black);
    } else {
      hedl1 = Math.abs(Math.round(dataMap(data.edl1 * -1, 0, mxEdl, 0, 30)));
      if (hedl1 > 30) hedl1 = 30;
      edl1.push(hedl1 * -1);
      colorEdl1.push(red);
    }

    if (data.edl2 == null) {
      edl2.push(100 * -1);
      colorEdl2.push(black);
    } else {
      hedl2 = Math.abs(Math.round(dataMap(data.edl2 * -1, 0, mxEdl, 0, 30)));
      if (hedl2 > 30) hedl2 = 30;
      edl2.push(hedl2 * -1);
      colorEdl2.push(red);
    }
    time_local.push(data.ts);
    bv.push(data.batt_volt);
    pms.push(data.pms);
    labels.push(index);
  });

  if (datas.length < 36) {
    for (let i = 0; i < 36 - datas.length; i++) {
      time_local.push(100);
      eh1.push(100);
      eh2.push(100);
      eh3.push(100);
      batt_volt.push(100);
      edl1.push(100 * -1);
      edl2.push(100 * -1);
      labels.push(i);
      pms.push(null);
      bv.push(null);
      colorEh1.push(black);
      colorEh2.push(black);
      colorEh3.push(black);
      colorBattVolt.push(black);
      colorEdl1.push(black);
      colorEdl2.push(black);
    }
  }

  chart = {
    time_local: time_local.reverse(),
    eh1: eh1.reverse(),
    eh2: eh2.reverse(),
    eh3: eh3.reverse(),
    batt_volt: batt_volt.reverse(),
    edl1: edl1.reverse(),
    edl2: edl2.reverse(),
    pms: pms.reverse(),
    bv: bv.reverse(),
    color_eh1: colorEh1.reverse(),
    color_eh2: colorEh2.reverse(),
    color_eh3: colorEh3.reverse(),
    color_batt_volt: colorBattVolt.reverse(),
    color_edl1: colorEdl1.reverse(),
    color_edl2: colorEdl2.reverse(),

    labels: labels,
  };
  return chart;
};
