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

| Property       | Description                                  | Type                                         | Default | Required |
| -------------- | -------------------------------------------- | -------------------------------------------- | ------- | -------- |
| dir            | Direction of the component                   | "ltr" / "rtl"                                | "ltr"   | false    |
| dirFromElement | Set component direction from outside element | "html" / "body" / string (for id)            | -       | false    |
| inputRef       | Ref for input                                | Ref<HTMLInputElement>                        | -       | false    |
| name           | Form name                                    | string                                       | -       | false    |
| value          | The input content value                      | string / number / undefined                  | -       | false    |
| placeholder    | Custom input placeholder                     | string                                       | -       | false    |
| onChange       | Callback when user input                     | (value: string / number / undefined) => void | -       | false    |
| onBlur         | Callback when user click outside             | (e?: FocusEvent<HTMLInputElement>) => void   | -       | false    |
| options        | Cascader options                             | Array (see example)                          | -       | true     |
| disabled       | Set input disabled mode                      | boolean                                      | false   | false    |
| readOnly       | Set input readOnly mode                      | boolean                                      | false   | false    |
| allowClear     | Show clear input button                      | boolean                                      | false   | false    |
| onClear        | Callback when user clear input               | () => void                                   | -       | false    |
| className      | Set classes for main container               | string                                       | -       | false    |

### Options example

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

## Future updates

More features....
