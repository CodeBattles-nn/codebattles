import {useTranslation} from 'react-i18next';
import Card from "../../components/bootstrap/Card.jsx";
import {Link} from "react-router-dom";

const ChangeLanguagePage = () => {
    const {t, i18n} = useTranslation();
    const currentLanguage = i18n.language;

    const languages = [
        {code: 'en', name: 'English', flag: 'EN'},
        {code: 'ru', name: 'Русский', flag: '🇷🇺'},
        // Add more languages as needed
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        // localStorage.setItem('i18nextLng', lng); // Save preference
        // navigate(-1); // Go back to previous page
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Card>
                        <h2 className="text-center mb-4">{t('languageSelection.title')}</h2>
                        <div className="d-flex flex-column gap-3">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang.code)}
                                    // variant={currentLanguage === lang.code ? 'primary' : 'outline-primary'}
                                    className="btn btn-outline-secondary text-white d-flex align-items-center justify-content-between py-3"
                                >
                  <span>
                    {lang.flag} {lang.name}
                  </span>
                                    {currentLanguage === lang.code && (
                                        <span className="badge bg-success text-white text-dark ms-2">
                      {t('languageSelection.selected')}
                    </span>
                                    )}
                                </button>
                            ))}
                        </div>
                        <Link to="/champs" className="btn btn-primary mt-4">
                            {t('languageSelection.toMain')}
                        </Link>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ChangeLanguagePage;