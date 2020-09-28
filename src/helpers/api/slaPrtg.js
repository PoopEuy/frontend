import { apt1PrtgSla } from "./apt1";

const SlaPrtgGetAll = async (data) => {
  const sdate = data.sdate;
  const edate = data.edate;
  const username = "Power APT";
  const password = "APT12345";

  const vsat = apt1PrtgSla({
    id: data.id_lvdvsat,
    sdate,
    edate,
    username,
    password,
  });
  const ping = apt1PrtgSla({
    id: data.id_ping,
    sdate,
    edate,
    username,
    password,
  });
  const batvolt = apt1PrtgSla({
    id: data.id_batvolt,
    sdate,
    edate,
    username,
    password,
  });
  const vsatcurr = apt1PrtgSla({
    id: data.id_vsatcurr,
    sdate,
    edate,
    username,
    password,
  });
  const btscurr = apt1PrtgSla({
    id: data.id_btscurr,
    sdate,
    edate,
    username,
    password,
  });

  const lvdvsat = await vsat.then((e) => e.data);
  const pingSla = await ping.then((e) => e.data);
  const batvoltSla = await batvolt.then((e) => e.data);
  const vsatcurrSla = await vsatcurr.then((e) => e.data);
  const btscurrSla = await btscurr.then((e) => e.data);

  return [
    {
      site: data.site,
      lc: data.lc,
      sla_lvdvsat: lvdvsat.uptimepercent,
      up_lvdvsat: lvdvsat.uptime,
      sla_dlvdvsat: lvdvsat.downtimepercent,
      down_lvdvisat: lvdvsat.downtime,
      sla_ping: pingSla.uptimepercent,
      avg_batvolt: parseInt(batvoltSla.average) / 1000,
      avg_vsatcurr: parseInt(vsatcurrSla.average) / 1000,
      avg_btscurr: parseInt(btscurrSla.average) / 1000,
    },
  ];
};

export default SlaPrtgGetAll;
