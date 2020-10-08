import axios from "axios";
import { getAdvisors, getLanguages, ERROR } from "./api";

const resp = { data: "fake data", status: 200 };

describe("api", () => {
  describe("getAdvisors", () => {
    test("should return data property when status 200", async () => {
      axios.get.mockResolvedValueOnce(resp);
      const res = await getAdvisors();

      expect(res).toEqual(resp.data);
    });
    test("should return ERROR when status is not 200", async () => {
      axios.get.mockResolvedValueOnce({});
      const res = await getAdvisors();

      expect(res).toEqual(ERROR);
    });
  });

  describe("getLanguages", () => {
    test("should return data property when status 200", async () => {
      axios.get.mockResolvedValueOnce(resp);
      const res = await getLanguages();

      expect(res).toEqual(resp.data);
    });
    test("should return ERROR when status is not 200", async () => {
      axios.get.mockResolvedValueOnce({});
      const res = await getAdvisors();

      expect(res).toEqual(ERROR);
    });
  });
});
