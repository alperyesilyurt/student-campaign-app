import {
  formatMinutesAndSeconds,
  queryStringBuild,
  sanitizeStudentInfo,
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

describe("sanitizeStudentInfo test", () => {
  it("builds query as expected", () => {
    const result = sanitizeStudentInfo(dummyStudentStepsData);
    expect(result).toMatchSnapshot();
  });
});

const dummyStudentStepsData = {
  personalInfo: {
    interests: ["mongoid"],
    birthDay: "2021-05-05",
  },
  basicInfo: {
    name: "asd",
    surname: "z.string().min(2",
    email: "bed@x.itu.edu.tr",
    password: "123123123",
    confirmPassword: "123123123",
  },
  educationInfo: {
    graduationYear: 2021,
    university: "test",
  },
  verifyEmail: {
    code: 1234,
  },
};
