import React, { useEffect, useState } from "react";
import { makeStyles, Divider, Box, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import NocComponent from "@components/NocComponent";
import { dataMapNoc } from "@helpers/dataMapNoc";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useRouter } from "next/router";
import Infinity from "../../../public/images/Infinity-loading.svg";

let tempNoc = [];
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

  const handleChange = (event, value) => {
    if (value !== page) {
      router.push(`/apt1/noc?page=${value}`);
      setLoading({ load: true, data: false });
      setPage(value);
      const temp = dataApt1Nojs.slice(
        (value - 1) * itemsPerPage,
        value * itemsPerPage
      );
      temp.forEach((nojs) => {
        status++;
        const logger = getApi({
          nojs: nojs.nojs,
          noc: true,
        });

        logger.then((e) => {
          let temp = tempNoc.find((tempNoc) => tempNoc.nojs.nojs === nojs.nojs);
          if (temp) {
            // JSON.stringify(temp) === JSON.stringify(dataMapNoc(e.data))
            //   ?
            // : console.log(false);
            setLoading({ load: false, data: true });
          } else {
            console.log("temp false");
            tempNoc = [...tempNoc, { nojs: nojs, data: dataMapNoc(e.data) }];
          }
          status--;
          status == 0 && setLoading({ load: false, data: true });

          setDataNoc(tempNoc);
        });
      });
    }
    status === 0 && setLoading({ load: false, data: false });
  };

  useEffect(() => {
    setNoOfPages(Math.ceil(dataApt1Nojs.length / itemsPerPage));
    const tempPage = parseInt(router.query.page);
    if (tempPage > 0) {
      handleChange("", parseInt(tempPage));
    }
  }, [dataApt1Nojs]);

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

          {loading.load && (
            <div className={classes.loading}>
              <img src={Infinity} alt="tes" />
            </div>
          )}

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
