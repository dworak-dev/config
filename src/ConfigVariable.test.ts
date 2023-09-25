/**
 * @file sum.test.ts
 * @author dworak <esteban@dworak.dev>
 *
 * This file contains the unit testing for the sum function.
 */
// eslint-disable-next-line max-classes-per-file
import ConfigVariable from "./ConfigVariable";

// Mocking process.env
process.env = Object.assign(process.env, {
  TEST_VAR: "testValue",
  TEST_NUMBER_VAR: "42",
  TEST_BOOLEAN_VAR: "true",
});

class TestClass {
  @ConfigVariable(String, "defaultValue")
  TEST_VAR!: string;

  @ConfigVariable(Number, 0)
  TEST_NUMBER_VAR!: number;

  @ConfigVariable(Boolean, false)
  TEST_BOOLEAN_VAR!: boolean;

  @ConfigVariable(String, "defaultValue")
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
        @ConfigVariable(String)
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
        @ConfigVariable(Date, "defaultValue")
        NON_EXISTENT_VAR!: Date;
      }
    }).toThrowError(
      "Unsupported type 'Date' for environment variable 'NON_EXISTENT_VAR'"
    );
  });
});
