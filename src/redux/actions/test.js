import { GET_INFO, GET_INFO_SUCCESS, GET_INFO_ERROR } from "./types";
import axios from "axios";
import { doCORSRequest } from "../../utils/proxy";

export const getInfo = () => async dispatch => {
  try {
    dispatch({
      type: GET_INFO
    });
    doCORSRequest(
      {
        method: "GET",
        url:
          "https://mychannel.nunchee.tv/api/generic/playlists/details/5b845b8346cc29000e4f186a? itemsPerPage=10"
      },
      result => {
        dispatch({
          type: GET_INFO_SUCCESS,
          data: JSON.parse(result).data
        });
      }
    );
  } catch (e) {
    console.log(e);
    dispatch({
      type: GET_INFO_ERROR,
      error: e
    });
  }
};
