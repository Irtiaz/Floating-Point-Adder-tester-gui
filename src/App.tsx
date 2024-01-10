import React, { useState } from 'react';
import {
  convertDecimalToFloatString,
  convertFloatStringToDecimal,
} from './util/decimalFloatConversion';

const App: React.FC<{}> = () => {
  const [num, setNum] = useState<number>(0);

  return (
    <div>
      <input onChange={(e) => setNum(parseFloat(e.target.value))} />
      <br />
      {num}: {convertDecimalToFloatString(num, 3, 3)} :{' '}
      {convertFloatStringToDecimal(
        convertDecimalToFloatString(num, 3, 3),
        3,
        3
      )}
    </div>
  );
};

export default App;
