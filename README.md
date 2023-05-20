# @dworac/config

This is an environment variables helper for typescript. It helps type and validate environment variables.
It read the environment variables from the `.env` file and from the `process.env` object.

## Installation

```shell
yarn add @dworac/config
```

## Usage

```typescript
import { ConfigVariable } from '@dworac/config';

class Config {
  @ConfigVariable(String, "defaultValue")
  STRING_VAR!: string;

  @ConfigVariable(Number, 0)
  NUMBER_VAR!: number;

  @ConfigVariable(Boolean, false)
  BOOLEAN_VAR!: boolean;
}

const config = new Config();

console.log(config.STRING_VAR); // "defaultValue"
console.log(config.NUMBER_VAR); // 0
console.log(config.BOOLEAN_VAR); // false
```

## Contributing
If you have any suggestions or improvements, please feel free to create a pull request or submit an issue.

## License
This project is licensed under the MIT license. Please see the LICENSE file for more information.


