import {
  formatMinutesAndSeconds,
  queryStringBuild,
} from "@/common/utils/utils";
import { assert, describe, expect, it } from "vitest";

describe("suite name", () => {
  it("foo", () => {
    expect(1 + 1).toEqual(2);
    expect(true).to.be.true;
  });

  it("bar", () => {
    assert.equal(Math.sqrt(4), 2);
  });
});

describe("queryStringBuild test", () => {
  it("builds query as expected", () => {
    const query = queryStringBuild({ limit: 3, skip: 5, category: "test" });
    expect(query).toEqual("limit=3&skip=5&category=test");
  });
});

describe("formatMinutesAndSeconds test", () => {
  it("formats minutes and seconds as expected", () => {
    const formatted = formatMinutesAndSeconds(2, 5);
    expect(formatted).toEqual("02:05");
  });
  it("formats minutes and seconds as expected", () => {
    const formatted = formatMinutesAndSeconds(0, 5);
    expect(formatted).toEqual("00:05");
  });

  it("formats minutes and seconds as expected", () => {
    const formatted = formatMinutesAndSeconds(20, 0);
    expect(formatted).toEqual("20:00");
  });
});
