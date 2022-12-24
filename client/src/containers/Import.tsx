import React from 'react';

export default function Import() {
  return (
      <div className='import'>
          <h1>Import CSV</h1>
          <form>
              <input type={"file"} accept={".csv"} />
              <button>IMPORT CSV</button>
          </form>
      </div>
  );
}