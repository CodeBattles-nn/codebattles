import React from 'react';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkGemoji from 'remark-gemoji'
import SyntaxHighlight from "./SyntaxHightlight";
import dompurify from 'dompurify';


const Markdown = ({text = ""}) => {

    const components = {
        table({node, inline, className = "", children, ...props}) {
            return (
                <table className={className + " table table-bordered"} {...props}>{children}</table>);
        },
        code({node, inline, children, className, ...props}) {
            return <SyntaxHighlight children={children} lang={className}  {...props} />;
        },
        img({node, inline, children, className = "", ...props}) {
            return <img className={className + " w-100 img-fluid"} {...props} />;
        },
    };

    return (
        <ReactMarkdown
            remarkPlugins={[gfm, remarkGemoji]}
            rehypePlugins={[rehypeRaw]}
            children={
            dompurify.sanitize(text)
            }
            components={components}
        />
    )
};

export default Markdown;