function percentage(value, fromLow, fromHigh, toLow, toHigh) {
  let fromSpan = fromHigh - fromLow;
  let toSpan = toHigh - toLow;

  let valueScaled = (value - fromLow) / fromSpan;
  return toLow + valueScaled * toSpan;
}

const getMax = async (data) => {
  let promise = new Promise((resolve, reject) => {
    if (data && data.length) {
      let harvest = { max_avg: 0, length: 0 };
      let enjoy = { max_avg: 0, length: 0 };
      data.forEach((el) => {
        enjoy.max_avg =
          el.enjoy_total > enjoy.max_avg ? el.enjoy_total : enjoy.max_avg;
        harvest.max_avg =
          el.harvest_total > harvest.max_avg
            ? el.harvest_total
            : harvest.max_avg;
      });
      resolve({ harvest: harvest.max_avg, enjoy: enjoy.max_avg });
    } else {
      resolve({ harvest: 0, enjoy: 0 });
    }
  });
  return promise;
};

export const dataMapOP = async (res, project_name) => {
  return new Promise(async (resolve, reject) => {
    let max_average;
    let max_percentage = 100;
    let time_stamp = [],
      harvest = [],
      enjoy = [],
      color_harvest = [],
      color_enjoy = [],
      labels = [],
      chart;

    let total_harvest, total_enjoy;
    const green = "rgba(22, 145, 13, 1)";
    const blue = "rgba(52, 67, 203, 1)";
    const red = "rgba(230, 0, 0, 1)";
    const black = "rgba(0, 0, 0, 1)";

    console.log(`${project_name} is `, res);
    await getMax(res).then((val) => {
      max_average = { harvest: val.harvest, enjoy: val.enjoy };
      if (res) {
        res.forEach((data, index) => {
          if (data.harvest_total == null) {
            harvest.push(100);
            color_harvest.push(black);
          } else {
            total_harvest = Math.abs(
              Math.round(
                percentage(
                  data.harvest_total,
                  0,
                  max_average.harvest,
                  0,
                  max_percentage
                )
              )
            );
            if (data.harvest_total == 0) total_harvest = 0;
            if (total_harvest > max_percentage) total_harvest = max_percentage;
            harvest.push(total_harvest);
            color_harvest.push(green);
          }

          if (data.enjoy_total == null) {
            enjoy.push(100);
            color_enjoy.push(black);
          } else {
            total_enjoy = Math.abs(
              Math.round(
                percentage(
                  data.enjoy_total,
                  0,
                  max_average.enjoy,
                  0,
                  max_percentage
                )
              )
            );
            if (data.enjoy_total == 0) total_enjoy = 0;
            if (total_enjoy > max_percentage) total_enjoy = max_percentage;
            enjoy.push(total_enjoy);
            color_enjoy.push(red);
          }

          time_stamp.push(data.time_stamp);
          labels.push(index);
        });

        if (res.length < 36) {
          if (res.length == 0) {
            for (let i = 0; i < 36 - res.length; i++) {
              time_stamp.push(100);
              harvest.push(100);
              enjoy.push(100);

              color_harvest.push(black);
              color_enjoy.push(black);
            }
          } else {
            time_stamp.push(100);
            harvest.push(100);
            enjoy.push(100);

            color_harvest.push(black);
            color_enjoy.push(black);
          }
        }

        chart = {
          project_name: project_name,
          time_stamp: time_stamp.reverse(),
          harvest: harvest.reverse(),
          enjoy: enjoy.reverse(),
          color_harvest: color_harvest.reverse(),
          color_enjoy: color_enjoy.reverse(),
          labels: labels,
        };
        resolve(chart);
      } else {
        for (let i = 1; i <= 36; i++) {
          harvest.push(100);
          color_harvest.push(black);
          enjoy.push(100);
          color_enjoy.push(black);
          time_stamp.push(100);
          labels.push(i);
        }
        chart = {
          project_name: project_name,
          time_stamp: time_stamp.reverse(),
          harvest: harvest.reverse(),
          enjoy: enjoy.reverse(),
          color_harvest: color_harvest.reverse(),
          color_enjoy: color_enjoy.reverse(),
          labels: labels,
        };
        resolve(chart);
      }
    });
  });
};

export const dataMapChint = async (res, serial_number) => {
  return new Promise(async (resolve, reject) => {

  });
};