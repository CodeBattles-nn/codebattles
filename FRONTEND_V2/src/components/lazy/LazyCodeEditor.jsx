import React, {Suspense, useMemo} from 'react';


const LazyCodeEditor = (props) => {

    const __CodeEditor =
        useMemo(() => {
            return React.lazy(
                () => import("../wraps/CodeEditor.jsx"))
        }, []);

    // const __CodeEditor = React.lazy(
    //     () => import("../wraps/CodeEditor.jsx"))


    return (
        <Suspense fallback={<></>}>
            <__CodeEditor {...props}/>
        </Suspense>
    );
};

export default LazyCodeEditor;
