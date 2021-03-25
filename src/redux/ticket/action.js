import { apiGetTicket, apiAddTicket, apiEditTicket } from "@helpers/api/apt2";

export const ticketTypes = {
  TICKET: "TICKET",
};

export const getTicket = () => (dispatch) => {
  const data = apiGetTicket();
  data.then((res) => {
    !res.error &&
      dispatch({
        type: ticketTypes.TICKET,
        payload: {
          data: res.data.data,
        },
      });
  });
};

export const editTicket = (id, data) => (dispatch) => {
  apiEditTicket(id, data);
};

export const addTicket = (data) => (dispatch) => {
  apiAddTicket(data);
};
