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
      const apiPayload = {
        lang: selectedLanguage,
        code: code,
        max_cpu_time: 10, // Set the desired max CPU time
        max_memory: 104857600, // Set the desired max memory
      };
      // Make the API request
    fetch(`http://compile:8080/api/${selectedLanguage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiPayload),
    })
    .then((response) => response.json())
    .then((data) => {
      // Handle the API response
      if (data.error) {
        // Handle code error (if any)
        console.error('Comilation error:', data.error);
        setOutput('Comilation error:', data.error);
      } else {
        // Set the output state with the API response
        setOutput(data.output || 'Code execution Successfully');
      }
    })
    .catch((error) => {
      console.error('Error during API request:', error);
      setOutput('Error during code execution.');
    });
    };
  
    return (
      <div className="compiler-container">
        <h1>Online Compiler</h1>
        <div className="options-container">
          <div className="language-dropdown">
            <label htmlFor="language" color='#fff'>Select Language:</label>
            <select id="language" value={selectedLanguage} onChange={handleLanguageChange}>
              <option value="JS">JavaScript</option>
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
