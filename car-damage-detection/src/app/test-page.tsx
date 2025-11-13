'use client';

import { useState } from 'react';
// import fs from 'fs';
import path from 'path';

export default function TestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const imagePath = path.join(process.cwd(), 'public/images/car-damage.jpg');
//   const imageData = fs.readFileSync(imagePath, {
//     encoding: 'base64'
//   });

  const assessDamage = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/damage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData: "test"
        }),
      });

      const responseData = await response.json();
      setResult(responseData);

    } catch (error) {
      console.error('Test failed:', error);
      setResult({ error: 'Test failed' });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Roboflow API Test</h1>
      
      <button
        onClick={assessDamage}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? 'Testing...' : 'Test Roboflow API'}
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-lg font-semibold">Result:</h2>
          <pre className="bg-black-100 p-2 rounded mt-2 overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}