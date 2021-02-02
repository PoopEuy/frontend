import {
  apt2ApiGetVendor,
  apt2ApiAddVendor,
  apt2ApiEditVendor,
} from "@helpers/api/apt2";

export const settingTypes = {
  VENDOR: "VENDOR",
};

export const getVendor = () => (dispatch) => {
  const data = apt2ApiGetVendor();
  data.then((res) => {
    !res.error &&
      dispatch({
        type: settingTypes.VENDOR,
        payload: {
          data: res.data.data,
        },
      });
  });
};

export const editVendor = (id, data) => (dispatch) => {
  console.log({ id, data });
  apt2ApiEditVendor(id, data);
};

export const addVendor = (data) => (dispatch) => {
  apt2ApiAddVendor(data);
};
