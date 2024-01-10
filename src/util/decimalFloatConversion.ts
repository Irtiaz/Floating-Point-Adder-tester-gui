export function convertDecimalToFloatString(
  num: number,
  exponentBitsCount: number,
  significandBitsCount: number
): string {
  let result = '';
  result += num >= 0 ? '0' : '1';
  const absNum = Math.abs(num);

  const exponent = Math.floor(Math.log2(absNum));
  const bias = (1 << (exponentBitsCount - 1)) - 1;
  const fraction = absNum / Math.pow(2, exponent) - 1;

  result += convertDecimalIntToBinary(exponent + bias, exponentBitsCount);
  result += convertDecimalFractionToBinary(fraction, significandBitsCount);

  return result;
}

export function convertFloatStringToDecimal(
  str: string,
  exponentBitsCount: number,
  significandBitsCount: number
): number {
  const exponentString = str.substr(1, exponentBitsCount);
  const exponentInMemory = convertBinaryIntStringToDecimal(exponentString);
  const bias = (1 << (exponentBitsCount - 1)) - 1;
  const exponent = exponentInMemory - bias;

  const significandString = str.substr(
    1 + exponentBitsCount,
    significandBitsCount
  );
  const significand = convertBinaryFractionStringToDecimal(significandString);

  let result = (1 + significand) * Math.pow(2, exponent);
  return str[0] === '1' ? -result : result;
}

function convertDecimalIntToBinary(num: number, totalBits: number): string {
  let result = '';
  for (let mask = 1 << (totalBits - 1); mask; mask >>= 1) {
    result += num & mask ? '1' : '0';
  }
  return result;
}

function convertDecimalFractionToBinary(
  num: number,
  totalBits: number
): string {
  let result = '';

  for (let i = 0; i < totalBits; ++i) {
    num *= 2;
    result += Math.floor(num) === 0 ? '0' : '1';
    num -= Math.floor(num);
  }

  return result;
}

function convertBinaryIntStringToDecimal(str: string): number {
  let result: number = 0;
  for (let i = str.length - 1, multiplier = 1; i >= 0; --i, multiplier <<= 1) {
    const bit = parseInt(str[i]);
    result += bit * multiplier;
  }
  return result;
}

function convertBinaryFractionStringToDecimal(str: string) {
  return convertBinaryIntStringToDecimal(str) / (1 << str.length);
}
