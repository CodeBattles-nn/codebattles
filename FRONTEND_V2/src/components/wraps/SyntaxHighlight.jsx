import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {nord as theme} from 'react-syntax-highlighter/dist/cjs/styles/prism';

const SyntaxHighlight = ({ props, children, lang = "" }) => {

    lang = lang.replace("language-","")

    return (<SyntaxHighlighter style={theme} language={lang} showLineNumbers {...props}>
        {children}
    </SyntaxHighlighter>)
};

export default SyntaxHighlight;