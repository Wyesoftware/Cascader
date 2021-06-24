# Cascader

Cascader Component for React.JS/React.TS

## Install package

```bash
npm i @wyesoftware/cascader
```

```bash
yarn add @wyesoftware/cascader
```

## Usage

```jsx
import Cascader from "@wyesoftware/cascader";

const App = () => {
  return <Cascader />;
};
```

### TypeScript

This component has full typescript support.

## Available props

| Property    | Description                                      | Type                                         | Default | Required |
| ----------- | ------------------------------------------------ | -------------------------------------------- | ------- | -------- |
| name        | Form name                                        | string                                       | -       | false    |
| placeholder | Input placeholder                                | string                                       | -       | false    |
| options     | Cascader options                                 | Array (see example)                          | -       | true     |
| value       | The input content value                          | string / number / undefined                  | -       | false    |
| onChange    | Callback when user input                         | (value: string / number / undefined) => void | -       | false    |
| allowClear  | If allow to remove input content with clear icon | boolean                                      | false   | false    |

# Options example

```jsx
const options = [
  {
    label: "Test",
    value: 123,
    children: [
      {
        label: "Test in test",
        value: 456,
        children: [
          {
            label: "Test in test in test",
            value: 789,
          },
        ],
      },
    ],
  },
  {
    label: "Test1",
    value: 987,
    children: [
      {
        label: "Test in test1",
        value: 654,
      },
    ],
  },
  {
    label: "Test2",
    value: 321,
  },
];
```
