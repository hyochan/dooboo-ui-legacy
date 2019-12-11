# Rating

> Simple rating component for react-native. This component supports 'rating' with several options like changing with total number, read-only and disabled option.

## Props

|          | necessary | types   | default  |
| -------- | --------- | ------- | -------- |
| total    | ✓         | number  | 5        |
| value    | ✓         | number  | 0        |
| onChange |           | func    | () => {} |
| disabled |           | boolean | false    |

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
