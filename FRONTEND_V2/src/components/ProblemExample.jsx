import Card from "./bootstrap/Card.jsx";

import "./css/ProblemExample.css"
import {useTranslation} from "react-i18next";
import {CopyToClipboard} from "react-copy-to-clipboard/src";

// eslint-disable-next-line react/prop-types
const ProblemExample = ({in_data, out_data}) => {

    const {t} = useTranslation()

    return (
        <div className="my-5">
            <div>
                <h6 className="width-inner">{t("seeProblem.inputData")}</h6>
                <CopyToClipboard text={in_data}>
                    <button className="btn example__btn btn-sm btn-outline-secondary">
                        {t("seeProblem.copy")}
                    </button>
                </CopyToClipboard>
            </div>
            <Card>
                <div style={{whiteSpace: "break-spaces"}}>
                    {in_data}
                </div>
            </Card>
            <h6>{t("seeProblem.outputData")}</h6>
            <Card>
                <div style={{whiteSpace: "break-spaces"}}>
                    {out_data}
                </div>
            </Card>
        </div>
    );
};

export default ProblemExample;
