import BreadcrumbsElement from "../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../components/UserLoginRequired.jsx";
import { AdminHeader } from "../../../components/AdminHeader.jsx";
import Card from "../../../components/bootstrap/Card.jsx";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../../../utils/settings.js";

export const AdminProblemsPageImportFromJSON = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();

    const [error, setError] = useState(false);
    const [done, setDone] = useState(false);

    const [problemJSON, setProblemJSON] = useState(null);

    const { t } = useTranslation();

    const onSubmit = async (data) => {
        const file = data.jsonFile[0];
        if (!file) return;

        try {
            // читаем json из файла
            const text = await file.text();
            const json = JSON.parse(text);

            // отправляем на сервер
            const response = await axiosInstance.post("/api/problems", json);

            // axiosInstance.post('/api/problems', sendData)
            //   .then(() => navigate("/admin/champs"))

            setProblemJSON(response.data);
            setError(false);
            setDone(true);
        } catch (e) {
            console.error(e);
            setError(true);
            setDone(false);
        }
    };

    return (
      <>
          <UserLoginRequired />

          <BreadcrumbsRoot>
              <BreadcrumbsElement name={t("adminProblems.problems")} url="/admin/problems" />
              <BreadcrumbsElement name={t("adminProblems.importFromPolygon")} />
          </BreadcrumbsRoot>

          <AdminHeader />

          <Card>
              <h2 className="mb-3">
                  {t("adminProblems.importFromJSONFile")}
              </h2>
              <Card>
                  <p>{t("adminProblems.uploadJadSONFile")}</p>
              </Card>
              <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
                  <div className="mb-3">
                      <input
                        type="file"
                        accept=".json"
                        {...register("jsonFile", { required: true })}
                        className="form-control"
                      />
                  </div>
                  <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary">
                          {t("adminProblems.addTask")}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                            reset();
                            setDone(false);
                            setError(false);
                        }}
                        className="btn btn-outline-secondary"
                      >
                          {t("adminProblems.clear")}
                      </button>
                  </div>
              </form>
              {error && (
                <div className="alert alert-danger">
                    {t("adminProblems.errorProcessingArchive")}
                </div>
              )}
              {done && (
                <>
                    <div className="alert alert-success">
                        {t("adminProblems.archiveProcessed", { name: problemJSON?.name })}
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/admin/problems/${problemJSON.id}/edit`)}
                    >
                        {t("adminProblems.openOnPlatform")}
                    </button>
                </>
              )}
          </Card>
      </>
    );
};
