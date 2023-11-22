import React, { useState, useEffect, useRef } from 'react';

const Codebox = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('JS'); // Default language
  const textArea= document.getElementById("textArea");

  const textareaRef = useRef(null);
  const regex = /\/\//;

  const editorText= document.getElementById("editorText");
const textAreaChange = (e)=>
{
  // console.log(e);
    let outputString ="";
    let commented=0;
    let mulCommented =0;

    for (let i=0; i<e.target.value.length;i++)
    {

      // FOR JS
        if (selectedLanguage=="JS" || selectedLanguage=="C" || selectedLanguage=="C++" || selectedLanguage=="Java" || selectedLanguage=="php")
        {

          if (e.target.value[i]== "/" && e.target.value[i+1]=="/")
          {
            commented =1;
            outputString+='<span style="color: green;">';
          }
          if (e.target.value[i]== "/" && e.target.value[i+1]=="*")
          {
            mulCommented =1;
            outputString+='<span style="color: green;">';
          }
          if (commented==1 && e.target.value[i]=="\n")
          {
            commented=0;
            outputString+="</span>";
          }
          /* fklsdjklfj
          */
         if (mulCommented==1 && e.target.value[i-2]=="*" && e.target.value[i-1]=="/")
         {
           mulCommented=0;
           outputString+="</span>";
          }
        }

        // For PYTHON
        if (selectedLanguage=="python" || selectedLanguage=="php")
        {

          if (e.target.value[i]== "#")
          {
            commented =1;
            outputString+='<span style="color: green;">';
          }
          // if (e.target.value[i]== "\"" && e.target.value[i+1]=="\"" && e.target.value[i+2]=="\"")
          // {
          //   mulCommented =1;
          //   outputString+='<span style="color: green;">';
          // }
          if (commented==1 && e.target.value[i]=="\n")
          {
            commented=0;
            outputString+="</span>";
          }
          /* fklsdjklfj
          */
        //  if (mulCommented==1 && e.target.value[i-3]=="\"" && e.target.value[i-2]=="\"" && e.target.value[i-1]=="\"")
        //  {
        //    mulCommented=0;
        //    outputString+="</span>";
        //   }
        }
        

        outputString+=e.target.value[i];
    }
    outputString+="\n\r";
    editorText.innerHTML=outputString;
}

const handleEditorClick =()=>
{
  textArea.focus();
}


  // const [editableContent, setEditableContent] = useState(`<div class="red-text textInput" >This is a red line.</div>
  // <div class="blue-text textInput">This is a blue line.</div>
  // <div class="textInput">>This is a default black line.</div>
  // `);

  const textInputs = document.getElementsByClassName("textInput");

  useEffect(() => {
    const updateLineNumbers = () => {
      const lineNumbers = document.getElementById('line-numbers');
      // console.log(textareaRef);
      if (lineNumbers && textareaRef.current) {
        // console.log(textareaRef.current);
        const lines = textareaRef.current.value.split('\n');
        // const lines = Array.from(textInputs);
        // console.log(lines);
        // lines.map((_,index)=>
        // {
        //   // console.log("Line ",index," : ",_);
        // })
        lineNumbers.innerHTML = lines
          .map((_, index) => `<div>${index + 1}</div>`)
          .join('');
      }
    };






    const handleScroll = () => {
      const textarea = textareaRef.current;
      // console.log("textarea: ",textarea);
      const lineNumbers = document.getElementById('line-numbers');
      const editorText = document.getElementById('editorText');
      // console.log(editorText);
      // if (textarea && lineNumbers && editorText) {
      if (textarea && lineNumbers ) {
        lineNumbers.scrollTop = textarea.scrollTop;
        editorText.scrollTop = textarea.scrollTop;
        // lineNumbers.scrollTop = editorText.scrollTop;
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
    setCode("");
    editorText.innerHTML="";
    
    // Clear output when the language is changed
    setOutput('');
  };
  const totalInputLines = document.getElementById('totalInputs');


  // const handleLines = (e) => {
    
  //   console.log(e);

  //   console.log(e.key);

    
    
    
    
  //   const textValue = e.target.value;
  //   const targetElement = e.target;
  //   console.log(targetElement);
  //   if (e.key =="ArrowDown")
  //   {
  //     console.log(e.srcElement.nextElementSibling)
  //     e.srcElement.nextElementSibling.focus();
  //     // e.srcElement.nextElementSibling.focus();
  //   }
  //   else if (e.key=="ArrowUp")
  //   {
  //     console.log(e.srcElement.previousElementSibling)
  //     e.srcElement.previousElementSibling.focus();
      
  //   }
  //   // const inputText = e.target.value;
  //   if (textValue.search(regex) != -1) {
  //     targetElement.style.color = "green";
  //   }
  //   else {
  //     targetElement.style.color = "white";
  //   }
  //   // console.log(textValue.search(regex));
  //   // console.log(inputText.split('\r'));
  //   if (e.key == "Enter") {
  //     // console.log(totalInputLines.innerHTML);
  //     // Append the text node to the "li" node:
  //     // node.appendChild(textnode);

  //     // Append the "li" node to the list:
  //     // document.getElementById("myList").appendChild(node);
  //     // Log the focused element
  //     // console.log(e);
  //     // $(`<input className="textInput" type='text'/>`).insertAfter(targetElement);
  //     // console.log("Enter Pressed");
  //     // totalInputLines.innerHTML+=totalInputLines.innerHTML;
  //   }
  // }

  // useEffect(() => {

  //   for (let i = 0; i < textInputs.length; i++) {
  //     // console.log(textInputs[i]);
  //     // console.log("Event lggyaa!");
  //     textInputs[i].addEventListener("keyup", handleLines);
  //   }
  // }, []);

  // textInputs

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
    fetch(`http://testnhire.centralindia.cloudapp.azure.com:8080/api/${selectedLanguage}`, {
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
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
      <div style={{ display: 'flex', alignSelf: "center", flex: 1 }}>
        <h1>Online Compiler</h1>
      </div>

      <div className="options-container">
        <div className="language-dropdown">
          <label htmlFor="language" color='#fff'>Select Language:</label>
          <select id="language" value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="JS">JavaScript</option>
            <option value="python">Python</option>
            <option value="C">C</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="php">PHP</option>
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
          {/* <div id="totalInputs" style={{display:"flex",flexDirection:"column",height:"425px",backgroundColor:"black"}}>

           <input placeholder='This is input'  type="text" ></input>
           <input placeholder='This is input2'></input>
          </div> */}
          {/* <div id="editableDiv" dangerouslySetInnerHTML={{ __html: editableContent }} contentEditable={true} >
  </div> */}
          {/* <div className='totalTextInputs'>
            <input className="textInput blue-text" type='text' placeholder="Editable content 1" />
            <input className="textInput" type='text' />
            <input className="textInput" type='text'/>
          </div> */}

        <div className='textBox'>

          <div className="editorText" id="editorText" onClick={handleEditorClick}></div>
          
          <textarea
            id="textArea"
            ref={textareaRef}
            placeholder="Enter your code here..."
            value={code}
            onChange={handleCodeChange}
            onKeyUp={textAreaChange}
          />
        </div>
          {/* <div className="inputTextArea">
          </div> */}
        </div>
        <div className="output-container">
          <div>
            <h3>Output:</h3>

          </div>
          <div className="actualOutput">

            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Codebox
