function leftPad(value) {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
}

export default function toStringByFormatting(source, delimiter = "-") {
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());

  return [year, month, day].join(delimiter);
}
