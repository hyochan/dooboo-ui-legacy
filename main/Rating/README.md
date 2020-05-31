# Rating

> Simple rating component for react-native. This component supports 'rating' with several options like changing with total number, read-only and disabled option.

## Props

| Property | Required | Types   | Default  | Description                |
| -------- | --------- | ------- | -------- | -------------------------- |
| total    | ✓         | number  |         | set the total rating value |
| value    | ✓         | number  |         | set the rating value that will show on the screen. (The value will automatically round down.) |
| onChange |           | func    | () => {} | set the handler to handle change event |
| disabled |           | boolean | false    | disabled state of rating   |

## Usage

```
interface RatingChangeProps {
  value: number;
}

const [value, setValue] = React.useState(0);

const handleChange = (props: RatingChangeProps): void => {
    setValue(props.value);
}

// Change rating value with press each of components
<Rating total={5} value={value} onChange={handleChange} />

// Read only
<Rating total={5} value={value} />

// Disabled
<Rating total={5} value={value} disabled />
```