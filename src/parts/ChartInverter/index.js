import React, { useEffect, useState } from "react";
import { makeStyles, Divider, Box, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import InverterComponent from "@components/InverterComponent";
import * as dataMapOP from "@helpers/dataMapOP";
import { useRouter } from "next/router";
import * as op_service from "@helpers/api/outproject";
import disconnect from "../../../public/images/unplugged.png";

let tempOP = [];
var tempInterval = null;
var tempTimeout = null;
var countSync = 0;
var stateSyncTmp = null;
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    padding: theme.spacing(1.2),
  },
  paginator: {
    justifyContent: "center",
    padding: "10px",
  },
  loading: {
    marginTop: theme.spacing(1),
    width: "100%",
    textAlign: "center",
  },
  loading_container: {
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "center",
  },
  loading_item: {
    width: 400,
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#eaeaea",
  },
  loading_item_header: {
    display: "flex",
  },
  loading_item_title: {
    width: 100,
    height: 23,
    marginLeft: 10,
    backgroundColor: "#c1c1c1",
  },
  loading_item_icon: {
    width: 35,
    height: 23,
    marginRight: 10,
    backgroundColor: "#c1c1c1",
  },
  loading_item_divider: {
    flex: 1,
  },
  loading_item_bar: {
    margin: 10,
    height: 85,
    backgroundColor: "#c1c1c1",
  },
  connection_problem: {
    height: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: 600,
    textTransform: "uppercase",
    flexDirection: "column",
  },
  connection_problem_img: {
    width: 100,
    marginBottom: 30,
  }
}));

const ChartInverter = ({ InverterProjectName }) => {
  const router = useRouter();
  const classes = useStyles();
  const view = 10;
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRecord, setTotalRecord] = useState(0);
  const [loading, setLoading] = useState({ load: true, data: false });
  const [timeInterval, setTimeInterval] = useState();
  const [intervalData, setIntervalData] = useState();
  const [timeoutData, setTimeoutData] = useState();
  const [totalData, setTotalData] = useState();
  const [currentData, setCurrentData] = useState();
  const [dataOP, setDataOP] = useState(false);

  const handleChange = (event, value) => {
    let tmp_page = parseInt(router.query.page);
    let project_name = router.query.project_name;
    if (tmp_page != value) {
      router.push(
        `/outproject/inverter?project_name=${project_name}&page=${value}`
      );
      setPage(value);
    }
  };

  useEffect(() => {
    stateSyncTmp = stateSync(
      (isTotalData, isPage, isTotalRecord, isCurrentData) => {
        if (countSync == 0) {
          if (
            isTotalData &&
            isTotalData != undefined &&
            isPage &&
            isPage != undefined
          ) {
            let current_data,
              total_data = totalData ? totalData : isTotalData,
              cur_page = page ? page : isPage;
            if (total_data.length > view) {
              current_data = [];
              for (let i = view * cur_page - view; i < view * cur_page; i++) {
                if (total_data[i]) {
                  current_data.push(total_data[i]);
                }
              }
            } else {
              current_data = total_data;
            }
            // countSync = 1;
            setCurrentData(current_data);
          }
        }
      }
    );
    let pages;
    if (!router.query.page && !router.asPath.match("page=")) {
      handleChange("", 1);
    } else {
      pages = parseInt(router.query.page);
      if (router.asPath.match("page=")) {
        pages = parseInt(router.asPath.split("page=")[1]);
      }
    }
    initTime().then((init_time) => {
      setTimeInterval(init_time);
      loadData().then((value) => {
        // console.log("loadData Then ", value);
        // console.log("pages ", pages);
        if (pages != undefined) {
          setPage(pages);
        }
      });
    });
    return () => {
      clearTimeout(tempTimeout);
      clearInterval(tempInterval);
    };
  }, []);

  useEffect(() => {
    let total_page;
    if (totalRecord > 0) {
      total_page = Math.floor(totalRecord / view);
      if (total_page < totalRecord / view) {
        total_page += 1;
      }
      setTotalPage(total_page);
    } else {
      total_page = 0;
      setTotalPage(total_page);
    }
  }, [totalRecord]);

  useEffect(() => {
    if ((page && page != undefined) || page != NaN) {
      stateSyncTmp.setIsPage(page);
    }
    if (page > totalPage && totalPage != 0) {
      router.push(
        `/outproject/inverter?project_name=${InverterProjectName}&page=${totalPage}`
      );
      setPage(totalPage);
    } else {
      if (totalData) {
        initTime().then((init_time) => {
          setTimeInterval(init_time);
          let current_data,
            total_data = totalData;
          if (total_data.length > view) {
            current_data = [];
            for (let i = view * page - view; i < view * page; i++) {
              if (total_data[i]) {
                current_data.push(total_data[i]);
              }
            }
          } else {
            current_data = total_data;
          }
          setCurrentData(current_data);
        });
      }
    }
  }, [page]);

  useEffect(() => {
    let intrvl = 300000;
    // let intrvl = 60000;
    if (currentData != undefined) {
      stateSyncTmp.setIsCurrentData(currentData);
    }
    if (timeInterval && currentData) {
      console.log(`Time to start live : ${timeInterval}s`);
      clearTimeout(tempTimeout);
      clearInterval(tempInterval);
      loadData(true).then((value) => {
        getData(value);
        let timeout = setTimeout(() => {
          loadData(true).then((timeout_value) => {
            getData(timeout_value, true);
            let interval = setInterval(() => {
              loadData(true).then((interval_value) => {
                getData(interval_value, true);
              });
            }, intrvl);
            setIntervalData(interval);
          });
        }, timeInterval * 1000);
        setTimeoutData(timeout);
      });
    }
  }, [currentData]);

  useEffect(() => {
    if (timeoutData) {
      tempTimeout = timeoutData;
    }
  }, [timeoutData]);

  useEffect(() => {
    if (intervalData) {
      tempInterval = intervalData;
    }
  }, [intervalData]);

  useEffect(() => {
    if (totalData) {
      stateSyncTmp.setIsTotalData(totalData);
    }
  }, [totalData]);

  const getData = async (value, live = false) => {
    console.log(`getData live: ${live}`, value);
    tempOP = [];
    if (!live) {
      setLoading({ load: true, data: false });
    }
    if (value) {
      value.forEach((inverter, index) => {
        dataMapOP
          .dataMapInverter(inverter.data, inverter.serial_number)
          .then((val) => {
            tempOP.push(val);

            if (index + 1 == value.length) {
              if (live) {
                setDataOP(false);
              } else {
                setLoading({ load: false, data: true });
              }
              setDataOP(tempOP);
            }
          });
      });
    } else {
      setLoading({ load: false, data: false });
    }
  };

  const loadData = async (live = false) => {
    return new Promise((resolve) => {
      // console.log("INVERTERPROJECTNAME ", InverterProjectName);
      if (InverterProjectName) {
        op_service
          .opGetInverter(InverterProjectName)
          .then(async (res) => {
            console.log("DATA ", res);
            if (!live) {
              setTotalRecord(res.data.length);
              setTotalData(res.data);
            }
            resolve(res.data);
          })
          .catch((err) => {
            console.log("err", err);
            reject();
          });
      }
    });
  };

  const initTime = async () => {
    return new Promise((resolve) => {
      let time = { date: new Date(), minute: 0, second: 0 };
      time.second = 60 - time.date.getSeconds();
      if (time.date.getMinutes() % 5 == 3) {
        time.minute = time.second > 0 ? 4 : 5;
      } else if (time.date.getMinutes() % 5 > 3) {
        time.minute =
          time.second > 0
            ? (time.date.getMinutes() % 5) - 1
            : time.date.getMinutes() % 5;
      } else {
        time.minute =
          time.second > 0
            ? 3 - (time.date.getMinutes() % 5) - 1
            : time.date.getMinutes() % 5;
      }
      resolve((time.second += 60 * time.minute));
    });
  };

  var stateSync = (callback) => {
    let isTotalData = false;
    let isPage = false;
    let isTotalRecord = false;
    let isCurrentData = false;

    return {
      getIsTotalData: function () {
        return isTotalData;
      },
      getIsPage: function () {
        return isPage;
      },
      getIsTotalRecord: function () {
        return isTotalRecord;
      },
      getIsCurrentData: function () {
        return isCurrentData;
      },

      setIsTotalData: function (p) {
        isTotalData = p;
        callback(isTotalData, isPage, isTotalRecord, isCurrentData);
      },
      setIsPage: function (p) {
        isPage = p;
        callback(isTotalData, isPage, isTotalRecord, isCurrentData);
      },
      setIsTotalRecord: function (p) {
        isTotalRecord = p;
        callback(isTotalData, isPage, isTotalRecord, isCurrentData);
      },
      setIsCurrentData: function (p) {
        isCurrentData = p;
        callback(isTotalData, isPage, isTotalRecord, isCurrentData);
      },
    };
  };

  return (
    <>
      {
        <>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            {dataOP &&
              !loading.load &&
              loading.data &&
              dataOP.map((val, index) => {
                return <InverterComponent key={index} data={val} />;
              })}
          </Grid>

          {!loading.load && !loading.data && (
            <div className={classes.connection_problem}>
              <img className={classes.connection_problem_img} src={disconnect} alt="Disconnect" />
              <div>Koneksi bermasalah</div>
            </div>
          )}

          {loading.load && (
            <div className={classes.loading_container}>
              <div className={classes.loading_item}>
                <div className={classes.loading_item_header}>
                  <div className={classes.loading_item_title}></div>
                  <div className={classes.loading_item_divider}></div>
                  <div className={classes.loading_item_icon}></div>
                  <div className={classes.loading_item_icon}></div>
                </div>
                <div className={classes.loading_item_bar}></div>
                <div className={classes.loading_item_bar}></div>
              </div>
              <div className={classes.loading_item}>
                <div className={classes.loading_item_header}>
                  <div className={classes.loading_item_title}></div>
                  <div className={classes.loading_item_divider}></div>
                  <div className={classes.loading_item_icon}></div>
                  <div className={classes.loading_item_icon}></div>
                </div>
                <div className={classes.loading_item_bar}></div>
                <div className={classes.loading_item_bar}></div>
              </div>
              <div className={classes.loading_item}>
                <div className={classes.loading_item_header}>
                  <div className={classes.loading_item_title}></div>
                  <div className={classes.loading_item_divider}></div>
                  <div className={classes.loading_item_icon}></div>
                  <div className={classes.loading_item_icon}></div>
                </div>
                <div className={classes.loading_item_bar}></div>
                <div className={classes.loading_item_bar}></div>
              </div>
              <div className={classes.loading_item}>
                <div className={classes.loading_item_header}>
                  <div className={classes.loading_item_title}></div>
                  <div className={classes.loading_item_divider}></div>
                  <div className={classes.loading_item_icon}></div>
                  <div className={classes.loading_item_icon}></div>
                </div>
                <div className={classes.loading_item_bar}></div>
                <div className={classes.loading_item_bar}></div>
              </div>
              <div className={classes.loading_item}>
                <div className={classes.loading_item_header}>
                  <div className={classes.loading_item_title}></div>
                  <div className={classes.loading_item_divider}></div>
                  <div className={classes.loading_item_icon}></div>
                  <div className={classes.loading_item_icon}></div>
                </div>
                <div className={classes.loading_item_bar}></div>
                <div className={classes.loading_item_bar}></div>
              </div>
              <div className={classes.loading_item}>
                <div className={classes.loading_item_header}>
                  <div className={classes.loading_item_title}></div>
                  <div className={classes.loading_item_divider}></div>
                  <div className={classes.loading_item_icon}></div>
                  <div className={classes.loading_item_icon}></div>
                </div>
                <div className={classes.loading_item_bar}></div>
                <div className={classes.loading_item_bar}></div>
              </div>
            </div>
          )}

          {/* {!loading.load && (
            <div className={classes.loading}>
              <img src={Infinity} alt="tes" />
            </div>
          )} */}

          <Divider />
          <Box component="span">
            <Pagination
              count={totalPage}
              page={page}
              onChange={handleChange}
              color="primary"
              size="medium"
              variant="outlined"
              shape="rounded"
              boundaryCount={1}
              disabled={loading.load ? true : false}
              classes={{ ul: classes.paginator }}
            />
          </Box>
        </>
      }
    </>
  );
};

export default ChartInverter;
