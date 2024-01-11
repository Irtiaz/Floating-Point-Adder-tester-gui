import React, { useEffect, useState } from 'react';
import {
  convertDecimalToFloatString,
  convertFloatStringToDecimal,
} from './util/decimalFloatConversion';
import { nanoid } from 'nanoid';

interface Props {
  exponentBitsCount: number;
  significandBitsCount: number;
  changeHandler: (num: number | null) => void;
}

export const BitStringInput: React.FC<Props> = ({
  exponentBitsCount,
  significandBitsCount,
  changeHandler,
}) => {
  const [inputText, setInputText] = useState<string>('');
  const [overflow, setOverflow] = useState(false);
  const [underflow, setUnderflow] = useState(false);

  const [num, setNum] = useState<number | null>(null);
  const [bitStr, setBitStr] = useState<string | null>(null);

  useEffect(() => {
    setBitStr(null);
    setNum(null);
    const floatInput = parseFloat(inputText);
    if (floatInput) {
      const { result, overflow, underflow } = convertDecimalToFloatString(
        floatInput,
        exponentBitsCount,
        significandBitsCount
      );

      setOverflow(overflow);
      setUnderflow(underflow);
      if (!overflow && !underflow) {
        setBitStr(result);
      }
    }
  }, [exponentBitsCount, significandBitsCount]);

  useEffect(() => {
    if (bitStr) {
      setNum(
        convertFloatStringToDecimal(
          bitStr,
          exponentBitsCount,
          significandBitsCount
        )
      );
    }
  }, [bitStr]);

  useEffect(() => {
    if (num !== undefined) changeHandler(num);
  }, [num, changeHandler]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const floatInput = parseFloat(inputText);
          if (floatInput && ('' + floatInput).length === inputText.length) {
            const conversionResult = convertDecimalToFloatString(
              floatInput,
              exponentBitsCount,
              significandBitsCount
            );
            const flooredBitString = conversionResult.result;
            const { overflow, underflow } = conversionResult;
            setOverflow(overflow);
            setUnderflow(underflow);
            if (!overflow && !underflow) setBitStr(flooredBitString);
          } else {
            setBitStr(null);
            setNum(null);
          }
        }}
        style={{ display: 'flex' }}
      >
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ width: '90%' }}
        />
        <button type="submit">Process</button>
      </form>
      {overflow && <>Number is too large to be stored in memory</>}
      {underflow && <>Number is too small to be stored in memory</>}
      {!overflow && !underflow && num && (
        <div>Actual number stored in memory: {num}</div>
      )}

      {!overflow && !underflow && bitStr && (
        <div>
          {bitStr.split('').map((bit, i) => (
            <button
              style={{
                backgroundColor:
                  i === 0
                    ? 'var(--signBitColor)'
                    : i < 1 + exponentBitsCount
                    ? 'var(--exponentBitsColor)'
                    : 'var(--significandBitsColor)',
                cursor: 'pointer',
              }}
              key={nanoid()}
              onClick={() => {
                let copyOfBitStr = bitStr.slice();
                copyOfBitStr =
                  bitStr.substring(0, i) +
                  (bitStr[i] === '1' ? '0' : '1') +
                  bitStr.substring(i + 1);
                setBitStr(copyOfBitStr);
                setInputText('');
              }}
            >
              {bit}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
