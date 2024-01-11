import { useEffect, useState } from 'react';
import {
  convertDecimalToFloatString,
  convertFloatStringToDecimal,
} from './util/decimalFloatConversion';
import { nanoid } from 'nanoid';

interface Props {
  num: number;
  exponentBitsCount: number;
  significandsBitCount: number;
}

export const BitStringOutput: React.FC<Props> = ({
  num,
  exponentBitsCount,
  significandsBitCount,
}) => {
  const [bitStr, setBitStr] = useState<string | null>(null);
  const [overflow, setOverflow] = useState(false);
  const [underflow, setUnderflow] = useState(false);

  useEffect(() => {
    const { result, overflow, underflow } = convertDecimalToFloatString(
      num,
      exponentBitsCount,
      significandsBitCount
    );
    setOverflow(overflow);
    setUnderflow(underflow);

    setBitStr(overflow || underflow ? null : result);
  }, [num]);

  return (
    <div>
      {overflow && <div>Overflow occured</div>}
      {underflow && <div>Underflow occured</div>}

      {!overflow && !underflow && bitStr && (
        <div>
          <div>
            Number stored in memory:{' '}
            {convertFloatStringToDecimal(
              bitStr,
              exponentBitsCount,
              significandsBitCount
            )}
          </div>
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
