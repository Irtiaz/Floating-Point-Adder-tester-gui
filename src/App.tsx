import React, { useState } from 'react';
import { BitStringInput } from './BitStringInput';

const App: React.FC<{}> = () => {
  const [exponentBitsCount, setExponentBitsCount] = useState(3);
  const [significandBitsCount, setSignificandBitsCount] = useState(3);

  const [numberA, setNumberA] = useState<number | null>(null);
  const [numberB, setNumberB] = useState<number | null>(null);

  return (
    <div>
      <div>
        <div>
          Exponent bits
          <input
            type="number"
            min={1}
            max={31 - significandBitsCount}
            value={exponentBitsCount}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val && val >= 0 && val <= 31 - significandBitsCount)
                setExponentBitsCount(val);
            }}
          />
        </div>
        <div>
          Significand bits
          <input
            type="number"
            min={1}
            max={31 - exponentBitsCount}
            value={significandBitsCount}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val && val >= 0 && val <= 31 - exponentBitsCount)
                setSignificandBitsCount(val);
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <div style={{ textAlign: 'center' }}>A</div>
          <BitStringInput
            exponentBitsCount={exponentBitsCount}
            significandBitsCount={significandBitsCount}
            changeHandler={(num) => setNumberA(num)}
          />
        </div>
        <div>
          <div style={{ textAlign: 'center' }}>B</div>
          <BitStringInput
            exponentBitsCount={exponentBitsCount}
            significandBitsCount={significandBitsCount}
            changeHandler={(num) => setNumberB(num)}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
