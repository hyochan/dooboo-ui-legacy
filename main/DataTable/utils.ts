export default function isHasValue(hasValue: any) {
    if (typeof hasValue === 'boolean') {
        return hasValue ? 'O' : 'X';
    }
    return hasValue;
}
