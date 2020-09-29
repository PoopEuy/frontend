import { apt1PrtgState } from "./apt1";
import ampmFormat from "../ampmFormat";
import { pad } from "../setZeroDateTime";

const StatePrtg = async (data) => {
  let state = [];
  const id = data.id_lvdvsat;
  const sdate = data.sdate;
  const edate = data.edate;
  const start = data.start;
  const end = data.end;
  const username = "Power APT";
  const password = "APT12345";
  const site = data.site;

  const param = apt1PrtgState({
    id,
    sdate,
    edate,
    username,
    password,
  });

  const result = await param.then((e) => {
    let status, status_raw, sdatetime, edatetime;

    if (!e.error) {
      let response = e.data;
      let log = response.log.histdata;
      let log0 = new Date(log[0].datetime);
      log0 = `${pad(log0.getDate())}/${pad(
        log0.getMonth() + 1
      )}/${log0.getFullYear()} ${ampmFormat(log0)}`;

      let length = response.state.statehistory.length;

      response.state.statehistory.forEach((data, index) => {
        let datetime = data.datetime.split("-");
        let temp0 = new Date(datetime[0]);
        let temp1 = new Date(datetime[1]);

        temp0 = `${pad(temp0.getDate())}/${pad(
          temp0.getMonth() + 1
        )}/${temp0.getFullYear()} ${ampmFormat(temp0)}`;
        temp1 = `${pad(temp1.getDate())}/${pad(
          temp1.getMonth() + 1
        )}/${temp1.getFullYear()} ${ampmFormat(temp1)}`;

        if (index == 0) {
          let time = ampmFormat(start);
          let newSdate = `${pad(start.getDate())}/${pad(
            start.getMonth() + 1
          )}/${start.getFullYear()} ${time}`;

          sdatetime = newSdate;
          edatetime = log0;
          status_raw = data.status_raw;
          status =
            status_raw == 1 ? "Up" : status_raw == 2 ? "Unknown" : "Down";
        } else if (index == 1) {
          if (length == 2) {
            let time = ampmFormat(end);
            let newSdate = `${pad(end.getDate())}/${pad(
              end.getMonth() + 1
            )}/${end.getFullYear()} ${time}`;

            sdatetime = log0;
            edatetime = newSdate;
            status_raw = data.status_raw;
            status =
              status_raw == 1 ? "Up" : status_raw == 2 ? "Unknown" : "Down";
          } else {
            sdatetime = log0;
            edatetime = temp1;
            status_raw = data.status_raw;
            status =
              status_raw == 1 ? "Up" : status_raw == 2 ? "Unknown" : "Down";
          }
        } else if (index + 1 == length) {
          let time = ampmFormat(end);
          let newSdate = `${pad(end.getDate())}/${pad(
            end.getMonth() + 1
          )}/${end.getFullYear()} ${time}`;

          sdatetime = temp0;
          edatetime = newSdate;
          status_raw = data.status_raw;
          status =
            status_raw == 1 ? "Up" : status_raw == 2 ? "Unknown" : "Down";
        } else {
          sdatetime = temp0;
          edatetime = temp1;
          status_raw = data.status_raw;
          status =
            status_raw == 1 ? "Up" : status_raw == 2 ? "Unknown" : "Down";
        }
        state.push({
          no: index + 1,
          site: site,
          start: sdatetime,
          end: edatetime,
          status_raw: status_raw,
          status: status,
        });
      });

      return state;
    }
  });

  return result;
};

export default StatePrtg;
