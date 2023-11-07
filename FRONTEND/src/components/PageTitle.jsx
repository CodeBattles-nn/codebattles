import React from 'react';
import {Helmet} from "react-helmet";

function PageTitle({title}) {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
}

export default PageTitle;