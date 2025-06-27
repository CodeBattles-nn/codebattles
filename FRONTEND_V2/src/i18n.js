import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            "Welcome to React": "Welcome to React and react-i18next",
            "Login to account": "Login to account",
            "Login": "Login",
            "Password": "Password",
            "Enter": "Enter",
            "Enter...": "Enter...",
            "Enter password": "Enter password",
            "Enter login": "Enter login",
            "Wrong login or password": "Wrong login or password",
            "Error. Try later": "Error. Try later",
            "header": {
                "toggle_navigation": "Toggle navigation",
                "competitions": "Competitions",
                "problems": "Problems",
                "rating": "Rating",
                "submissions": "Submissions",
                "profile": "Profile",
                "admin_panel": "Admin Panel",
                "help": "Help",
                "logout": "Logout"
            },
            "statusCodes": {
                "title": "Program execution statuses",
                "tableHeaders": {
                    "name": "Name",
                    "reason": "Reason"
                },
                "statusCodes": {
                    "WRONG_ANSWER": {
                        "name": "WRONG_ANSWER",
                        "description": "The program produces an incorrect answer (Most likely, your program is not working correctly)"
                    },
                    "SUCCESS": {
                        "name": "SUCCESS",
                        "description": "Correct answer"
                    },
                    "RUNTIME_ERROR": {
                        "name": "RUNTIME_ERROR",
                        "description": "Error during program execution (You may have submitted the wrong program. Try running it on your PC. If that doesn't help, you have an error in your program)"
                    },
                    "COMPILATION_ERROR": {
                        "name": "COMPILATION_ERROR",
                        "description": "Compilation error"
                    },
                    "TIME_LIMIT": {
                        "name": "TIME_LIMIT",
                        "description": "Your program exceeded the execution time limit (Most likely, your program is not optimized and therefore runs slowly)"
                    },
                    "NOT_EXECUTED": {
                        "name": "NOT_EXECUTED",
                        "description": "The program was not executed because TIME_LIMIT or MEMORY_LIMIT occurred in previous tests"
                    }
                }
            },
            "changePassword": {
                "title": "Change Password",
                "breadcrumbs": {
                    "profile": "Profile"
                },
                "errorMessage": "Incorrect current password",
                "form": {
                    "currentPassword": {
                        "label": "Current Password",
                        "required": "Current password is required"
                    },
                    "newPassword": {
                        "label": "New Password",
                        "required": "New password is required"
                    }
                },
                "buttons": {
                    "change": "Change",
                    "changing": "Changing...",
                    "cancel": "Cancel"
                }
            },
            "profile": {
                "title": "Profile",
                "breadcrumbs": {
                    "profile": "Profile"
                },
                "changePasswordButton": "Change Password",
                "successMessage": "Changes saved successfully",
                "formFields": {
                    "id": {
                        "label": "ID"
                    },
                    "username": {
                        "label": "Username"
                    },
                    "name": {
                        "label": "Name",
                        "required": "Name is required"
                    },
                    "roles": {
                        "label": "Roles"
                    }
                },
                "buttons": {
                    "save": "Save",
                    "saving": "Saving..."
                }
            }
        }
    },
    "ru": {
        translation: {
            "Welcome to React": "Добро пожаловать в React и react-i18next",
            "Login to account": "Вход в аккаунт",
            "Login": "Логин",
            "Password": "Пароль",
            "Enter": "Войти",
            "Enter...": "Введите...",
            "Enter password": "Введите пароль",
            "Enter login": "Введите логин",
            "Wrong login or password": "Неверный логин или пароль",
            "Error. Try later": "Ошибка. Попробуйте позже",
            "header": {
                "toggle_navigation": "Переключить навигацию",
                "competitions": "Соревнования",
                "problems": "Задачи",
                "rating": "Рейтинг",
                "submissions": "Посылки",
                "profile": "Профиль",
                "admin_panel": "Панель админа",
                "help": "Помощь",
                "logout": "Выход"
            },
            "statusCodes": {
                "title": "Статусы выполнения программ",
                "tableHeaders": {
                    "name": "Название",
                    "reason": "Причина"
                },
                "statusCodes": {
                    "WRONG_ANSWER": {
                        "name": "WRONG_ANSWER",
                        "description": "Программа выдает неверный ответ (Скорее всего, ваша программа работает неправильно)"
                    },
                    "SUCCESS": {
                        "name": "SUCCESS",
                        "description": "Верный ответ"
                    },
                    "RUNTIME_ERROR": {
                        "name": "RUNTIME_ERROR",
                        "description": "Ошибка во время работы программы (Возможно, вы отправили не ту программу. Попробуйте запустить ее на своем пк. Если это не помогает, у вас ошибка в программе)"
                    },
                    "COMPILATION_ERROR": {
                        "name": "COMPILATION_ERROR",
                        "description": "Ошибка компиляции"
                    },
                    "TIME_LIMIT": {
                        "name": "TIME_LIMIT",
                        "description": "Ваша программа привысила время на выполнение (Скорее всего, ваша программа написана неоптимально, из-за чего работает медленно)"
                    },
                    "NOT_EXECUTED": {
                        "name": "NOT_EXECUTED",
                        "description": "Программа не была запущена, т.к. в предыдущих тестах возникла TIME_LIMIT или MEMORY_LIMIT"
                    }
                }
            },
            "changePassword": {
                "title": "Смена пароля",
                "breadcrumbs": {
                    "profile": "Профиль"
                },
                "errorMessage": "Неправильный текущий пароль",
                "form": {
                    "currentPassword": {
                        "label": "Текущий пароль",
                        "required": "Текущий пароль обязательный"
                    },
                    "newPassword": {
                        "label": "Новый пароль",
                        "required": "Новый пароль обязательный"
                    }
                },
                "buttons": {
                    "change": "Сменить",
                    "changing": "Меняем...",
                    "cancel": "Отмена"
                }
            },
            "profile": {
                "title": "Профиль",
                "breadcrumbs": {
                    "profile": "Профиль"
                },
                "changePasswordButton": "Сменить пароль",
                "successMessage": "Изменения сохранены",
                "formFields": {
                    "id": {
                        "label": "ID"
                    },
                    "username": {
                        "label": "Логин"
                    },
                    "name": {
                        "label": "Имя",
                        "required": "Имя обязательно"
                    },
                    "roles": {
                        "label": "Роли"
                    }
                },
                "buttons": {
                    "save": "Сохранить",
                    "saving": "Сохраняем..."
                }
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        supportedLngs: ['en', 'ru'],
        fallbackLng: 'en',
        resources,
        interpolation: {
            escapeValue: false
        }
    });

console.log(i18n.language)

export default i18n;