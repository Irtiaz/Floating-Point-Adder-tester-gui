import React, { useState } from 'react';
import { BitStringInput } from './BitStringInput';
import { BitStringOutput } from './BitStringOutput';

const App: React.FC<{}> = () => {
  const [exponentBitsCount, setExponentBitsCount] = useState(3);
  const [significandBitsCount, setSignificandBitsCount] = useState(3);

  const [numberA, setNumberA] = useState<number | null>(null);
  const [numberB, setNumberB] = useState<number | null>(null);

  return (
    <div style={{ margin: '1em 0 0 1em' }}>
      <div>
        <div>
          Exponent bits
          <input
            style={{ marginLeft: '0.5em' }}
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
            style={{ marginLeft: '0.5em' }}
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

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '2em',
          marginBottom: '5em',
        }}
      >
        <div style={{ border: '1px solid red', padding: '1em' }}>
          <div style={{ textAlign: 'center' }}>A</div>
          <BitStringInput
            exponentBitsCount={exponentBitsCount}
            significandBitsCount={significandBitsCount}
            changeHandler={(num) => setNumberA(num)}
          />
        </div>
        <div style={{ border: '1px solid green', padding: '1em' }}>
          <div style={{ textAlign: 'center' }}>B</div>
          <BitStringInput
            exponentBitsCount={exponentBitsCount}
            significandBitsCount={significandBitsCount}
            changeHandler={(num) => setNumberB(num)}
          />
        </div>
      </div>

      {numberA && numberB && (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <div style={{ marginBottom: '0.5em', color: 'blue' }}>Result</div>
          <BitStringOutput
            num={numberA + numberB}
            exponentBitsCount={exponentBitsCount}
            significandsBitCount={significandBitsCount}
          />
        </div>
      )}
    </div>
  );
};

export default App;
