import React from 'react';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import remarkGemoji from 'remark-gemoji'
import SyntaxHighlight from "./SyntaxHightlight";


const Markdown = ({text = ""}) => {

    const components = {
        table({node, inline, className = "", children, ...props}) {
            return (
                <table className={className + " table table-bordered"}>{children}</table>);
        },
        code({ node, inline, children, className, ...props }) {
            return <SyntaxHighlight children={children} lang={className}  {...props} />;
        },
    };

    return (
        <ReactMarkdown
            remarkPlugins={[gfm, remarkGemoji]}
            children={text}
            components={components}
        />
    )
};

export default Markdown;