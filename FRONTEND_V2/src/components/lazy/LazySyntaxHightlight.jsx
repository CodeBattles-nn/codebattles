import React, {Suspense} from 'react';


const LazySyntaxHighlight = (props) => {

    const __SyntaxHighlight = React.lazy(() => import("../wraps/SyntaxHighlight.jsx"))

    return (
        <Suspense fallback={<></>}>
            <__SyntaxHighlight {...props}/>
        </Suspense>
    );
};

export default LazySyntaxHighlight;
