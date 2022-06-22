import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import reportWebVitals from "./reportWebVitals";
import { ProtectedRoute } from "./components";
import ReactDOM from "react-dom/client";
import Profile from "./routes/Profile";
import { Provider } from "react-redux";
import { store } from "./store";
import { theme } from "./theme";
import App from "./app";
import "./i18n";

import ApplicationsList from "./routes/Applications";
import Questionnaire from "./routes/Questionnaire";
import TeachersList from "./routes/Teachers";
import SchoolsList from "./routes/Schools";
import Login from "./routes/Login";
import ApplicationStatus from "./routes/ApplicationStatus";
import QuestionnaireReview from "./routes/QuestionnaireReview";
import QuestionnaireFeedback from "./routes/QuestionnaireFeedback";
import FeedbackList from "./routes/FeedbackList";
import FeedbackDetails from "./routes/FeedbackDetails";
import QuestionnaireObservationReview from "./routes/QuestionnaireObservationReview";
import GuideContent from "./routes/GuideContent";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Login />} />
            <Route
              path="choose-school"
              element={
                <ProtectedRoute>
                  <SchoolsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="teachers"
              element={
                <ProtectedRoute>
                  <TeachersList />
                </ProtectedRoute>
              }
            />
            <Route
              path="applications/:teacherId"
              element={
                <ProtectedRoute>
                  <ApplicationsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="application-status/:applicationId/:questionnaireId"
              element={
                <ProtectedRoute>
                  <ApplicationStatus />
                </ProtectedRoute>
              }
            />
            <Route
              path="questionnaire/:applicationId/:questionnaireId"
              element={
                <ProtectedRoute>
                  <Questionnaire />
                </ProtectedRoute>
              }
            />
            <Route
              path="questionnaire-observation-review/:applicationId"
              element={
                <ProtectedRoute>
                  <QuestionnaireObservationReview />
                </ProtectedRoute>
              }
            />
            <Route
              path="feedback-list/:applicationId"
              element={
                <ProtectedRoute>
                  <FeedbackList />
                </ProtectedRoute>
              }
            />
            <Route
              path="feedback-details/:applicationId/:feedbackId"
              element={
                <ProtectedRoute>
                  <FeedbackDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="guide-content"
              element={
                <ProtectedRoute>
                  <GuideContent />
                </ProtectedRoute>
              }
            />
            <Route
              path="questionnaire-feedback/:applicationId/:questionnaireId"
              element={
                <ProtectedRoute>
                  <QuestionnaireFeedback />
                </ProtectedRoute>
              }
            />
            <Route
              path="questionnaire-review/:applicationId"
              element={
                <ProtectedRoute>
                  <QuestionnaireReview />
                </ProtectedRoute>
              }
            />
            <Route
              path="questionnaire-review-details/:id"
              element={
                <ProtectedRoute>
                  <QuestionnaireReview />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

reportWebVitals();
