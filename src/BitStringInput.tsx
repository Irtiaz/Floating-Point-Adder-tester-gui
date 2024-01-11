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

  const [splitBits, setSplitBits] = useState<boolean>(false);

  useEffect(() => {
    const floatInput = parseFloat(inputText);
    if (floatInput) {
      const { result, overflow, underflow } = convertDecimalToFloatString(
        floatInput,
        exponentBitsCount,
        significandBitsCount
      );

      setOverflow(overflow);
      setUnderflow(underflow);
      if (overflow || underflow) {
        setBitStr(null);
        setNum(null);
      } else {
        console.log({ result });
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
          setBitStr(null);
          const floatInput = parseFloat(inputText);
          if (floatInput) {
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
            else setNum(null);
          }
        }}
      >
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ width: '100%' }}
        />
      </form>
      {overflow && <>Number is too large to be stored in memory</>}
      {underflow && <>Number is too small to be stored in memory</>}
      {!overflow && !underflow && num && (
        <div>Actual number stored in memory: {num}</div>
      )}

      {!overflow && !underflow && bitStr && (
        <div>
          <label>Split bits to segments</label>
          <input
            type="checkbox"
            checked={splitBits}
            onChange={(e) => setSplitBits(e.target.checked)}
          />
        </div>
      )}

      {!overflow && !underflow && bitStr && !splitBits && (
        <div>
          {bitStr.split('').map((bit, i) => (
            <button
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
      {!overflow && !underflow && bitStr && splitBits && (
        <div>
          <div>
            Sign bit{' '}
            <button
              onClick={() => {
                setBitStr((bitStr[0] == '1' ? '0' : '1') + bitStr.substring(1));
                setInputText('');
              }}
            >
              {bitStr[0]}
            </button>
          </div>
          <div>
            Exponent{' '}
            {bitStr
              .substring(1, 1 + exponentBitsCount)
              .split('')
              .map((bit, i) => (
                <button
                  key={nanoid()}
                  onClick={() => {
                    let copyOfBitStr = bitStr.slice();
                    copyOfBitStr =
                      bitStr.substring(0, i + 1) +
                      (bitStr[i + 1] === '1' ? '0' : '1') +
                      bitStr.substring(i + 2);
                    setBitStr(copyOfBitStr);
                    setInputText('');
                  }}
                >
                  {bit}
                </button>
              ))}
          </div>
          <div>
            Significands:
            {bitStr
              .substring(1 + exponentBitsCount)
              .split('')
              .map((bit, i) => (
                <button
                  key={nanoid()}
                  onClick={() => {
                    let copyOfBitStr = bitStr.slice();
                    copyOfBitStr =
                      bitStr.substring(0, 1 + exponentBitsCount + i) +
                      (bitStr[1 + exponentBitsCount + i] === '1' ? '0' : '1') +
                      bitStr.substring(exponentBitsCount + i + 2);
                    setBitStr(copyOfBitStr);
                    setInputText('');
                  }}
                >
                  {bit}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
