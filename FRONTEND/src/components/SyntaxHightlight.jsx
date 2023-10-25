import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const SyntaxHighlight = ({ props, children }) => (
    <SyntaxHighlighter style={theme} language="javascript" showLineNumbers {...props}>
        {children}
    </SyntaxHighlighter>
);

export default SyntaxHighlight;