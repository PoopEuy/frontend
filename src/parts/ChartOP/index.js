import React, { useEffect, useState } from "react";
import { makeStyles, Divider, Box, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import OPComponent from "@components/OPComponent";
import { dataMapOP } from "@helpers/dataMapOP";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useRouter } from "next/router";
import Infinity from "../../../public/images/Infinity-loading.svg";
import * as op_service from "@helpers/api/outproject";
import { FullscreenExit } from "@material-ui/icons";

let tempOP = [];
var tempInterval = null;
var tempTimeout = null;
let status = 0;
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
}));

const ChartOP = ({ getApi }) => {
  const router = useRouter();
  const classes = useStyles();
  const view = 1;
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
    if (tmp_page != value) {
      router.push(`/outproject?page=${value}`);
      setPage(value);
    }
  };

  useEffect(() => {
    let pages;
    console.log("init route", router);
    if (!router.query.page && !router.asPath.match("page")) {
      console.log("if");
      handleChange("", 1);
    } else {
      console.log("else");
      pages = parseInt(router.query.page);
      if (router.asPath.match("page")) {
        pages = parseInt(router.asPath.split("=")[1]);
      }
    }
    console.log("pass 1");
    initTime().then((init_time) => {
      console.log("pass 2");
      setTimeInterval(init_time);
      loadData().then((value) => {
        console.log("pass 3", value);
        console.log("pass 3", pages);
        setTotalData(value);
        setPage(pages);
      });
    });
    return () => {
      console.log("UNMOUNT, clearTimeout:", tempTimeout);
      console.log("UNMOUNT, clearInterval:", tempInterval);
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
    console.log("totalData ", totalData);
    console.log("page ", page);
    console.log("PAGES ", totalPage);
    if (page > totalPage) {
      router.push(`/outproject?page=${totalPage}`);
      setPage(totalPage);
    } else {
      if (totalData) {
        initTime().then((init_time) => {
          setTimeInterval(init_time);
          console.log("pass 4", totalData);
          let current_data,
            total_data = totalData,
            pages = page;
          if (!page || page == undefined) {
            pages = 1;
          }
          if (total_data.length > view) {
            current_data = [];
            for (let i = view * pages - view; i < view * pages; i++) {
              if (total_data[i]) {
                current_data.push(total_data[i]);
              }
            }
          } else {
            current_data = total_data;
          }
          console.log("pass 5 ", current_data);
          setCurrentData(current_data);
        });
      }
    }
  }, [page]);

  // useEffect(() => {
  //   console.log("totalData change ", totalData);
  //   console.log("totalData change ", page);
  //   if (totalData && page) {
  //     setPage(page);
  //   }
  // }, [totalData]);

  useEffect(() => {
    let intrvl = 300000;
    // let intrvl = 60000;
    if (timeInterval && currentData) {
      console.log(`Time to start live : ${timeInterval}s`);
      // console.log("tempInterval ", intervalData);
      clearTimeout(tempTimeout);
      clearInterval(tempInterval);
      getData(currentData);
      let timeout = setTimeout(() => {
        getData(currentData, true);
        let interval = setInterval(() => {
          getData(currentData, true);
        }, intrvl);
        setIntervalData(interval);
      }, timeInterval * 1000);
      setTimeoutData(timeout);
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

  const getData = async (value, live = false) => {
    console.log(`getData live: ${live}`, value);
    tempOP = [];
    if (!live) {
      setLoading({ load: true, data: false });
    }
    if (value) {
      value.forEach((project_name, index) => {
        // console.log(`index ke ${index}`, project_name);
        if (project_name) {
          op_service.opGetLiveData(project_name).then(async (res) => {
            dataMapOP(res.data, project_name, res.node_id).then((val) => {
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
        }
      });
    } else {
      setLoading({ load: false, data: false });
    }
  };

  const loadData = async () => {
    return new Promise((resolve, reject) => {
      getApi()
        .then((res) => {
          setTotalRecord(res.data.length);
          setTotalData(res.data);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("err", err);
          reject();
        });
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
                return <OPComponent key={index} data={val} />;
              })}
          </Grid>

          {!loading.load && !loading.data && (
            <div className={classes.loading}>Koneksi bermasalah</div>
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

export default ChartOP;
