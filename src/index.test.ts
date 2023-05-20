/**
 * @file sum.test.ts
 * @author dworac <mail@dworac.com>
 *
 * This file contains the unit testing for the sum function.
 */
// eslint-disable-next-line max-classes-per-file
import { ConfigVariable } from "./index";

// test("sum", () => {
//   process.env.TEST_STRING = "test";
//
//   class MyConfig {
//     @ConfigVariable("d")
//     public APP_SECRETT!: string;
//
//     @ConfigVariable(1234)
//     public API_KEY!: number;
//   }
//
//   const myConfig = new MyConfig();
//
//   console.log(myConfig.APP_SECRETT); // logs the environment variable APP_SECRET or 'defaultSecret' if not set
//   console.log(myConfig.API_KEY); // logs the environment variable API_KEY or 1234 if not set
//   expect(myConfig.API_KEY).not.toBe(4);
// });
// Mocking process.env
process.env = Object.assign(process.env, {
  TEST_VAR: "testValue",
  TEST_NUMBER_VAR: "42",
  TEST_BOOLEAN_VAR: "true",
});

class TestClass {
  @ConfigVariable("defaultValue")
  TEST_VAR!: string;

  @ConfigVariable(0)
  TEST_NUMBER_VAR!: number;

  @ConfigVariable(false)
  TEST_BOOLEAN_VAR!: boolean;

  @ConfigVariable("defaultValue")
  NON_EXISTENT_VAR!: string;
}

describe("ConfigVariable", () => {
  const testClassInstance = new TestClass();

  test("returns correct string from environment variable", () => {
    expect(testClassInstance.TEST_VAR).toBe("testValue");
  });

  test("returns correct number from environment variable", () => {
    expect(testClassInstance.TEST_NUMBER_VAR).toBe(42);
  });

  test("returns correct boolean from environment variable", () => {
    expect(testClassInstance.TEST_BOOLEAN_VAR).toBe(true);
  });

  test("returns default value when environment variable does not exist", () => {
    expect(testClassInstance.NON_EXISTENT_VAR).toBe("defaultValue");
  });

  test("throws an error when environment variable and default value do not exist", () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      class ErrorClass {
        @ConfigVariable()
        NON_EXISTENT_VAR!: string;
      }
    }).toThrowError(
      "Environment variable 'NON_EXISTENT_VAR' not set and no default provided"
    );
  });

  test("throws an error when environment variable type is not supported", () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      class ErrorClass {
        @ConfigVariable("defaultValue")
        NON_EXISTENT_VAR!: bigint;
      }
    }).toThrowError(
      "Unsupported type 'BigInt' for environment variable 'NON_EXISTENT_VAR'"
    );
  });
});
