import React, { useEffect, useState } from "react";
import { makeStyles, Divider, Box, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import NocComponent from "@components/NocComponent";
import { dataMapNoc } from "@helpers/dataMapNoc";
import { connect } from "react-redux";
import LoadingChart from "@components/LoadingChart";
import { useRouter } from "next/router";
import { initTime } from "@helpers/intitTime";

let tempData = [];
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
}));

const ChartNoc = ({ dataApt1Nojs, getApi }) => {
  const router = useRouter();
  const classes = useStyles();
  const itemsPerPage = 15;
  const [page, setPage] = useState(0);
  const [noOfPages, setNoOfPages] = useState(0);
  const [loading, setLoading] = useState({ load: false, data: false });
  const [dataNoc, setDataNoc] = useState(false);
  const [time, setTime] = useState({
    interval: null,
    timeOut: null,
  });
  const [timeInterval, setTimeInterval] = useState(null);
  const [pageNojs, setPageNojs] = useState(null);

  const handleChange = (event, value) => {
    if (value != page) {
      clearTimeout(time.timeOut);
      clearInterval(time.interval);
      tempData = [];
      let tempNoc = [];
      router.push(`/apt1/noc?page=${value}`);
      setLoading({ load: true, data: false });
      setPage(value);
      const temp = dataApt1Nojs.slice(
        (value - 1) * itemsPerPage,
        value * itemsPerPage
      );
      setPageNojs(temp);
      temp.forEach((nojs) => {
        status++;
        const logger = getApi({
          nojs: nojs.nojs,
          noc: true,
        });
        logger.then((e) => {
          console.log("response", e);
          tempData = [...tempData, { nojs: nojs.nojs, data: e.data }];
          tempNoc = [...tempNoc, { nojs: nojs, data: dataMapNoc(e.data) }];
          status--;
          status == 0 && setLoading({ load: false, data: true });
          status == 0 && setTimeInterval(initTime());
          setDataNoc(tempNoc);
        });
      });
      status == 0 && setLoading({ load: false, data: false });
    }
  };

  const liveData = () => {
    let tempNoc = [];
    pageNojs.forEach((nojs) => {
      const logger = getApi({ nojs: nojs.nojs, noc: "true", single: "true" });
      logger.then((e) => {
        console.log({ e });
        const response = e.data;
        const temp = response && tempData.find((e) => e.nojs == nojs.nojs);
        if (temp.data.length != 0) {
          const compere = temp.data[0].time_local != response[0].time_local;
          if (compere) {
            console.log(response[0]);
            temp.data.pop();
            temp.data.unshift(response[0]);
            tempNoc = [...tempNoc, { nojs: nojs, data: dataMapNoc(temp.data) }];
          } else {
            tempNoc = [...tempNoc, { nojs: nojs, data: dataMapNoc(temp.data) }];
          }
          setDataNoc(tempNoc);
        } else {
          temp.data.push(response);
        }
      });
    });
  };

  useEffect(() => {
    setNoOfPages(Math.ceil(dataApt1Nojs.length / itemsPerPage));
    const tempPage = parseInt(router.query.page);
    if (tempPage > 0) {
      handleChange("", parseInt(tempPage));
    }
  }, [dataApt1Nojs]);

  useEffect(() => {
    const intrvl = 300000;
    console.log(`time to Live ${timeInterval}`);
    if (timeInterval) {
      let timeout = setTimeout(() => {
        liveData();
        console.log("tim out");
        let interval = setInterval(() => {
          liveData();
          console.log("tim interval");
        }, intrvl);
        setTime({ ...time, interval: interval });
      }, timeInterval * 1000);
      setTime({ ...time, timeOut: timeout });
    }
    return () => {
      clearTimeout(time.timeOut);
      clearInterval(time.interval);
    };
  }, [timeInterval]);

  return (
    <>
      {dataApt1Nojs && (
        <>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            {dataNoc &&
              loading.data &&
              dataApt1Nojs
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((js) => {
                  return (
                    <NocComponent
                      key={js.nojs}
                      data={dataNoc.find((e) => e.nojs.nojs === js.nojs)}
                    />
                  );
                })}
          </Grid>

          {loading.load && <LoadingChart />}

          <Divider />
          <Box component="span">
            <Pagination
              count={noOfPages}
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
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    dataApt1Nojs: state.DataApt1Nojs.dataApt1Nojs,
  };
};

export default connect(mapStateToProps, null)(ChartNoc);
