import React, { useState } from 'react';
import { BitStringInput } from './BitStringInput';

const App: React.FC<{}> = () => {
  const [exponentBitsCount, setExponentBitsCount] = useState(3);
  const [significandBitsCount, setSignificandBitsCount] = useState(3);

  return (
    <div>
      <div>
        <input
          type="number"
          min={1}
          max={31 - significandBitsCount}
          value={exponentBitsCount}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (val && val >= 0 && val < 31 - significandBitsCount)
              setExponentBitsCount(val);
          }}
        />
        <input
          type="number"
          min={1}
          max={31 - exponentBitsCount}
          value={significandBitsCount}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (val && val >= 0 && val < 31 - exponentBitsCount)
              setSignificandBitsCount(val);
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <div>Number 1</div>
          <BitStringInput
            exponentBitsCount={exponentBitsCount}
            significandBitsCount={significandBitsCount}
            changeHandler={(num) => console.log(num)}
          />
        </div>
        <div>
          <div>Number 2</div>
          <BitStringInput
            exponentBitsCount={exponentBitsCount}
            significandBitsCount={significandBitsCount}
            changeHandler={(num) => console.log(num)}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
