import {Link} from "react-router-dom";
import Card from "./bootstrap/Card.jsx";
import { useTranslation } from 'react-i18next';

export const AdminHeader = () => {
    const { t } = useTranslation();
    return (
        <Card>
            <Link to="/admin/champs" className="btn">{t('header.competitions')}</Link>
            <Link to='/admin/problems' className="btn border-0">{t('header.problems')}</Link>
            <Link to='/admin/users' className="btn border-0">{t('adminUsers.users')}</Link>
            <Link to="/admin/checkers" className="btn">{t('adminCheckers.checkers')}</Link>
            <Link to="/champs" className="btn">{t('header.student_interface')}</Link>
        </Card>
    );
};

