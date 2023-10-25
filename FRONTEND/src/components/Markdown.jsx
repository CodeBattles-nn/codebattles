import React from 'react';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";


const Markdown = ({text = ""}) => {
    return (
        <ReactMarkdown remarkPlugins={[gfm]} children={text}/>
    )
};

export default Markdown;