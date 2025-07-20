import { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';

function App() {
  const [prompt, setPrompt] = useState('');
  const [testData, setTestData] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async () => {
    if (!prompt) return;

    setDisplayedText('');
    setIsTyping(true);

    try {
      const res = await fetch('http://localhost:6969/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      setTestData(data.data);
    } catch (err) {
      setTestData('Error occurred');
    }
  };

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    if (!testData) return;

    const interval = setInterval(() => {
      setDisplayedText(prev => prev + testData.charAt(i));
      i++;
      if (i >= testData.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [testData]);

  return (
  <div className='min-h-screen bg-slate-800 flex flex-col  '>
    <h1 className='my-8 mx-auto text-5xl font-myfont text-gray-400 '>AI TEST GENERATOR</h1>
      <div className=' flex flex-col items-center justify-between gap-12 p-4 mx-6 my-10'>
      <textarea
        onChange={(e) => setPrompt(e.target.value)}
        type="text"
        placeholder="Enter prompt"
        className="w-[550px] min-h-[120px] max-h-[600px]  px-4 py-2 border rounded overflow-y-scroll focus:outline-none text-gray-300 bg-white/15 hide-scrollbar "
      />

      <Button handleClick={handleSubmit} value={"Generate"} />
      

      <div
        className="w-full  min-h-[120px] max-h-[600px] px-4 py-6 border rounded font-mono bg-white whitespace-pre-line overflow-y-scroll focus:outline-none text-gray-300 bg-white/15 hide-scrollbar "
      >
        {displayedText}
        {isTyping && <span className="blinking-cursor">|</span>}
      </div>
    </div>

<p className='text-center text-gray-500'>Created by Ritik Gaur</p>

  </div>
  );
}

export default App;
