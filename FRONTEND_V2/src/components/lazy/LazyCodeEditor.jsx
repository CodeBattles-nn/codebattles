import React, {Suspense} from 'react';


const LazyCodeEditor = (props) => {

    const __CodeEditor = React.lazy(() => import("../wraps/CodeEditor.jsx"))

    return (
        <Suspense fallback={<></>}>
            <__CodeEditor {...props}/>
        </Suspense>
    );
};

export default LazyCodeEditor;
