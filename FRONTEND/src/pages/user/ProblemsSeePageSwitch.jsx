import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import getApiAddress from "../../utils/api";
import apiAxios from "../../apiAxios";
import PageTitle from "../../components/PageTitle";
import ProblemsPage from "./ProblemsPage";
import SeeProblemPage from "./SeeProblemPage/SeeProblemPage";

const ProblemSeePageSwitch = () => {

    return <SeeProblemPage/>
};

export default ProblemSeePageSwitch;