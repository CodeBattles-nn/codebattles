import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkGemoji from 'remark-gemoji'
import dompurify from "dompurify";
import LazySyntaxHighlight from "../lazy/LazySyntaxHightlight.jsx";


// eslint-disable-next-line react/prop-types
const Markdown = ({text = ""}) => {

    console.log("MD")

    const components = {
        // eslint-disable-next-line no-unused-vars
        table({node, inline, className = "", children, ...props}) {
            return (
                <table className={className + " table table-bordered"} {...props}>{children}</table>);
        },
        // eslint-disable-next-line no-unused-vars
        code({node, inline, children, className, ...props}) {
            return <LazySyntaxHighlight lang={className}  {...props} >
                {children}
            </LazySyntaxHighlight>;
        },
        // eslint-disable-next-line no-unused-vars
        img({node, inline, children, className = "", ...props}) {
            return <img className={className + " w-100 img-fluid"} {...props} />;
        },
    };

    return (
        <ReactMarkdown
            remarkPlugins={[gfm, remarkGemoji]}
            rehypePlugins={[rehypeRaw]}
            components={components}
        >
            {dompurify.sanitize(text)}
        </ReactMarkdown>

    )
};

export default Markdown;