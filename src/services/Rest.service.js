import Vue from "vue";
import axios from "axios";

const ERROR_MESSAGE = "Some error occurred in our server:";
const API_KEY = "AIzaSyAw-vOe62P0yNqd2IIpm8y6YHaDTU07lzQ";
const SHEET_ID = "1TOkyHFvnJz1qBM7jxXEL7xL9BBpZY_PhVIYWG_F4c2k"
const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}`;

const RestService = {
  /**
   * Get request to the given endpoint
   * @param {string} endpoint
   * @param {object} params
   * @returns {object} request results
   */
  async get(sheetTab, params) {
    const headers = this.getHeaders();
    const URL = `${BASE_URL}/values/${sheetTab}?key=${API_KEY}`;
    // const URL = `${BASE_URL}?key=${API_KEY}`;
    try {
      const response = await axios.get(
        URL,
        { params, headers }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw response.status;
      }
    } catch (error) {
      Vue.prototype.$errors = `${ERROR_MESSAGE} ${error}`;
    }
  },

  /**
   * Headers getter
   * @returns {object}
   */
  getHeaders() {
    return {
      "Content-Type": "application/json",
    };
  },
};

export default RestService;
