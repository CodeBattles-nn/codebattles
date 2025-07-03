import AceEditor from "react-ace";

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-terminal';

const CodeEditor = (props) => {

    return <AceEditor
        style={{width: "100%"}}
        placeholder="..."
        mode="python"
        theme="terminal"
        fontSize={14}
        lineHeight={19}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value='print("Hello, world!")'
        minLines={10}
        maxLines={100000}
        setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
        }}
        {...props}
    />


};

export default CodeEditor;