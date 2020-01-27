# Slider

[![Npm Version](http://img.shields.io/npm/v/@dooboo-ui/native-slider.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-slider)
[![Downloads](http://img.shields.io/npm/dm/@dooboo-ui/native-slider.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-slider)

<img src="https://user-images.githubusercontent.com/11019960/73190141-dee25300-4168-11ea-8ba0-f806c2307f9a.png" width="400" />

## Props

|                      | necessary | types                   | default |
| -------------------- | --------- | ----------------------- | ------- |
| hideMark             |           | boolean                 |false    |
| hideLabel            |           | boolean                 |true     |
| autoLabel            |           | boolean                 |false    |
| step                 |           | number                  |1        |
| defaultValue         |           | number                  |0        |
| minValue             |           | number                  |0        |
| maxValue             |           | number                  |100      |
| onChange             |           | (value: number) => void |-        |

## Installation

```sh
yarn add @dooboo-ui/native
```

or

```sh
yarn add @dooboo-ui/native-slider
```

## Usage

```javascript
import React, { ReactElement } from 'react';

import { Slider } from '@dooboo-ui/native';
// or
import Slider from '@dooboo-ui/native-slider';
import styled from 'styled-components/native';

function Page(): ReactElement {
  const handleChange = (value) => {
    // Do something!
  };

  return (
    <Container>
      <Slider
        step={10}
        defaultValue={20}
        minValue={0}
        maxValue={100}
      />

      <Slider
        minValue={0}
        maxValue={5}
        step={1}
        hideLabel={false}
        autoLabel
        onChange={handleChange}
      />
    </Container>
  );
}

export default Page;
```

