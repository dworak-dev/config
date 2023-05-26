/**
 * @file index.ts
 * @author dworac <mail@dworac.com>
 *
 * This is the entry point for the library.
 */
import "dotenv/config";

/**
 * This decorator is used to retrieve the value of an environment variable.
 *
 * @param {any} type - Type of the config Variable.
 * @param {string|number|boolean} defaultValue The default value to return if the environment variable is not set.
 * @returns {string} The value of the environment variable or the default value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ConfigVariable(type: any, defaultValue?: string | number | boolean) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any, key: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = process.env[key];

    // If there is no value in the environment, use the default value
    if (value === undefined) {
      if (defaultValue !== undefined) {
        value = defaultValue as string;
      } else {
        // If there is no default value, throw an error
        throw new Error(
          `Environment variable '${key}' not set and no default provided`
        );
      }
    }

    switch (type) {
      case String:
        // already a string, no conversion necessary
        break;
      case Number:
        value = parseFloat(value);
        break;
      case Boolean:
        // if is string, convert to boolean
        if (typeof value === "string") {
          value = value.toLowerCase() === "true";
        }
        break;
      default:
        throw new Error(
          `Unsupported type '${type.name}' for environment variable '${key}'`
        );
    }

    Object.defineProperty(target, key, {
      value,
      writable: false,
    });
  };
}

// eslint-disable-next-line import/prefer-default-export
export { ConfigVariable };
