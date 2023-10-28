import React from 'react';
import AceEditor from "react-ace";

const CodeEditor = (props) => {

    return <AceEditor
        style={{width: "100%"}}
        mode="python"
        theme="tomorrow"
        name="blah2"
        fontSize={14}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={``}
        editorProps={{$blockScrolling: true}}
        setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
        }}
        {...props}
    />

};

export default CodeEditor;