import React, { useState, useEffect, useRef } from 'react';

const Codebox = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('javascript'); // Default language
  
    const textareaRef = useRef(null);
  
    useEffect(() => {
      const updateLineNumbers = () => {
        const lineNumbers = document.getElementById('line-numbers');
        if (lineNumbers && textareaRef.current) {
          const lines = textareaRef.current.value.split('\n');
          lineNumbers.innerHTML = lines
            .map((_, index) => `<div>${index + 1}</div>`)
            .join('');
        }
      };
  
      const handleScroll = () => {
        const textarea = textareaRef.current;
        const lineNumbers = document.getElementById('line-numbers');
        if (textarea && lineNumbers) {
          lineNumbers.scrollTop = textarea.scrollTop;
        }
      };
  
      updateLineNumbers(); // Initial update
      textareaRef.current.addEventListener('input', updateLineNumbers);
      textareaRef.current.addEventListener('scroll', handleScroll);
  
      return () => {
        textareaRef.current.removeEventListener('input', updateLineNumbers);
        textareaRef.current.removeEventListener('scroll', handleScroll);
      };
    }, [code]);
  
    const handleCodeChange = (e) => {
      setCode(e.target.value);
    };
  
    const handleLanguageChange = (e) => {
      setSelectedLanguage(e.target.value);
  
      // Clear output when the language is changed
      setOutput('');
    };
  
    const handleRunCode = () => {
      // Simulate code execution by logging the code and selected language to the console
      console.log('Running code:', code);
      console.log('Selected language:', selectedLanguage);
      // For a real online compiler, you would send the code and language to a backend for execution
      // and update the 'output' state with the result.
      setOutput('Code execution result will be shown here.');
    };
  
    return (
      <div className="compiler-container">
        <h1>Online Compiler</h1>
        <div className="options-container">
          <div className="language-dropdown">
            <label htmlFor="language" color='#fff'>Select Language:</label>
            <select id="language" value={selectedLanguage} onChange={handleLanguageChange}>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              {/* Add more language options as needed */}
            </select>
          </div>
          <div className="button-container">
            <button onClick={handleRunCode}>Run Code</button>
          </div>
        </div>
        <div className="editor-output-container">
          <div className="editor-container">
            <div id="line-numbers" className="line-numbers"></div>
            <textarea
              ref={textareaRef}
              placeholder="Enter your code here..."
              value={code}
              onChange={handleCodeChange}
            />
          </div>
          <div className="output-container">
            <h3>Output:</h3>
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    );
  };
  
export default Codebox
