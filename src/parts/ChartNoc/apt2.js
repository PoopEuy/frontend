import React, { useEffect, useState } from "react";
import { makeStyles, Divider, Box, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import NocComponent from "@components/NocComponent/apt2";
import LoadingChart from "@components/LoadingChart";
import { dataMapApt2 } from "@helpers/dataMapApt2";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { initTime } from "@helpers/intitTime";

let tempData = [];
let status = 0;
let a = 7;
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

const ChartNoc = ({ dataApt2Nojs, getApi }) => {
  const router = useRouter();
  const classes = useStyles();
  const itemsPerPage = 3;
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
      router.push(`/apt2/noc?page=${value}`);
      setLoading({ load: true, data: false });
      setPage(value);
      const temp = dataApt2Nojs.slice(
        (value - 1) * itemsPerPage,
        value * itemsPerPage
      );
      setPageNojs(temp);
      temp.forEach((nojs) => {
        status++;
        const logger = getApi({ nojs: nojs.id });
        logger.then((e) => {
          tempData = [...tempData, e.data];
          tempNoc = [
            ...tempNoc,
            { nojs: nojs, data: dataMapApt2(e.data.data) },
          ];
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
      const logger = getApi({ nojs: nojs.id, single: true });
      logger.then((e) => {
        const response = e.data;
        console.log(response);
        const responseData = response && response.data[0];
        const temp = response && tempData.find((e) => e.nojs == response.nojs);
        if (response.total != 0) {
          const compere = temp.data[0].ts != responseData.ts;
          if (compere) {
            temp.data.pop();
            temp.data.unshift(responseData);
            tempNoc = [
              ...tempNoc,
              { nojs: nojs, data: dataMapApt2(temp.data) },
            ];
          } else {
            tempNoc = [
              ...tempNoc,
              { nojs: nojs, data: dataMapApt2(temp.data) },
            ];
          }
          setDataNoc(tempNoc);
        }
      });
    });
  };

  useEffect(() => {
    setNoOfPages(Math.ceil(dataApt2Nojs.length / itemsPerPage));
    const tempPage = parseInt(router.query.page);
    if (tempPage > 0) {
      handleChange("", parseInt(tempPage));
    }
  }, [dataApt2Nojs]);

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
      {dataApt2Nojs && (
        <>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            {dataNoc &&
              loading.data &&
              dataApt2Nojs
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
    dataApt2Nojs: state.DataApt2Nojs.dataApt2Nojs,
  };
};

export default connect(mapStateToProps, null)(ChartNoc);
