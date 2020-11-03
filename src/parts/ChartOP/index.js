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

let tempOP = [];
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

const ChartOP = ({ getApi }) => {
  const router = useRouter();
  const classes = useStyles();
  const [loading, setLoading] = useState({ load: false, data: false });
  const [dataTest, setDataTest] = useState({ site: [] });
  const [dataOP, setDataOP] = useState(false);
  const [liveData, setLiveData] = useState();

  useEffect(() => {
    let time = { date: new Date(), minute: 0, second: 0 };
    let intrvl = 300000;
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
    time.second += 60 * time.minute;
    console.log("time ", time);
    loadData().then((value) => {
      getData(value);
      setTimeout(() => {
        console.log("RUNNING");
        tempOP = [];
        getData(value, true);
        setInterval(() => {
          tempOP = [];
          getData(value, true);
        }, intrvl);
      }, time.second * 1000);
    });
  }, []);

  const getData = async (value, live = false) => {
    value.forEach((project_name, index) => {
      if (project_name) {
        op_service.opGetLiveData(project_name).then(async (res) => {
          dataMapOP(res.data, project_name).then((val) => {
            tempOP.push(val);

            if (index + 1 == value.length) {
              if (live) {
                setDataOP(false);
              }
              setDataOP(tempOP);
              setLoading({ load: true, data: true });
            }
          });
        });
      }
    });
  };

  const loadData = async () => {
    return new Promise((resolve, reject) => {
      getApi()
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log("err", err);
          reject();
        });
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
              loading.data &&
              dataOP.map((val, index) => {
                return <OPComponent key={index} data={val} />;
              })}
          </Grid>

          {!loading.load && (
            <div className={classes.loading}>
              <img src={Infinity} alt="tes" />
            </div>
          )}

          <Divider />
          {/* <Box component="span">
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
          </Box> */}
        </>
      }
    </>
  );
};

export default ChartOP;
