import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Footer, Icon, LoadingDots, Text } from "../../components";
import { Modal } from "../../components/Modal";
import {
  useGetAnswersMutation,
  useGetApplicationMutation,
} from "../../service";
import {
  getLocalHideOnBoardingApplication,
  getLocalNotes,
  setLocalHideOnboardingApplication,
} from "../../storage";

const ApplicationStatus: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [notes, setNotes] = useState<string[]>([]);
  const [onboarding, setOnboarding] = useState(
    !getLocalHideOnBoardingApplication()
  );
  const [getApplication, { data, isLoading }] = useGetApplicationMutation();
  const [getAnswers, answerRequest] = useGetAnswersMutation();
  const { applicationId } = useParams<{
    applicationId: string;
  }>();

  useEffect(() => {
    setNotes(getLocalNotes());
  }, []);

  useEffect(() => {
    if (applicationId) {
      getApplication({ id: parseInt(applicationId, 10) });
    }
  }, [applicationId, getApplication]);

  useEffect(() => {
    if (data?.id && data?.status !== "PENDING_RESPONSE") {
      getAnswers(data?.id);
    }
  }, [data, getAnswers]);

  useEffect(() => {
    if (applicationId) {
      getApplication({ id: parseInt(applicationId, 10) });
    }
  }, [applicationId, getApplication]);

  const closeOnboarding = () => {
    setLocalHideOnboardingApplication(true);
    setOnboarding(false);
  };

  return (
    <Container width="100%" height="100%" mb="100px" flexDirection="column">
      {isLoading ? (
        <LoadingDots />
      ) : (
        <>
          <Container mb="24px" flexDirection="row" p="16px 0" mt="-16px">
            <Container onClick={() => navigate(-1)}>
              <Icon name="arrow-left" size={24} />
            </Container>
          </Container>

          <Container mt="16px" flexDirection="column">
            <Text
              mb="32px"
              fontSize="24px"
              color="#191A1B"
              fontWeight={600}
              lineHeight="32px"
              value={t("ApplicationStatus.title", { value: data?.id })}
            />

            <Container mb="40px" flexDirection="column">
              <Container
                p="12px"
                mr="6px"
                mb="12px"
                flex={1}
                borderRadius="12px"
                alignItems="center"
                flexDirection="row"
                background="#F0F2F5"
                onClick={() =>
                  data?.status === "PENDING_RESPONSE"
                    ? navigate(
                        `/questionnaire/${applicationId}/${data?.questionnaire_id}`
                      )
                    : navigate(
                        `/questionnaire-review/${applicationId}/${data?.questionnaire_id}`
                      )
                }
              >
                <Icon mr="8px" name="clipboard-notes" size={24} />
                <Text
                  fontSize="12px"
                  fontWeight={500}
                  color="#191A1B"
                  value={t("ApplicationStatus.label-observation")}
                />
                <Icon ml="auto" name="chevron-right" size={24} />
              </Container>

              <Container
                p="12px"
                mr="6px"
                flex={1}
                borderRadius="12px"
                alignItems="center"
                flexDirection="row"
                background={
                  data?.status === "PENDING_FEEDBACK" ? "#F0F2F5" : "#F9FAFB"
                }
                onClick={() =>
                  data?.status === "PENDING_FEEDBACK" &&
                  navigate(`/feedback-list/${applicationId}`)
                }
              >
                <Icon
                  mr="8px"
                  name="comments"
                  size={24}
                  filter={
                    data?.status !== "PENDING_FEEDBACK"
                      ? "invert(65%) sepia(3%) saturate(562%) hue-rotate(184deg) brightness(91%) contrast(89%);"
                      : undefined
                  }
                />
                <Text
                  fontSize="12px"
                  fontWeight={500}
                  color={
                    data?.status === "PENDING_FEEDBACK" ? "#191A1B" : "#94979E"
                  }
                  value={t("ApplicationStatus.label-feedback")}
                />
                <Icon
                  ml="auto"
                  name="chevron-right"
                  size={24}
                  filter={
                    data?.status !== "PENDING_FEEDBACK"
                      ? "invert(65%) sepia(3%) saturate(562%) hue-rotate(184deg) brightness(91%) contrast(89%);"
                      : undefined
                  }
                />
              </Container>

              {data?.status === "PENDING_RESPONSE" && (
                <Container mt="16px">
                  <Text
                    fontSize="12px"
                    color="#494B50"
                    value={t("ApplicationStatus.info")}
                  />
                </Container>
              )}
            </Container>

            {answerRequest?.isSuccess && !!answerRequest.data.length && (
              <>
                <Text
                  mb="12px"
                  fontSize="20px"
                  color="#191A1B"
                  fontWeight={600}
                  lineHeight="24px"
                  value={t("ApplicationStatus.competences")}
                />

                <Container
                  flexDirection="row"
                  pt="12px"
                  overflowX="scroll"
                  mb="40px"
                >
                  {answerRequest.data.map(
                    ({ option }, index) =>
                      option.question.competence && (
                        <Container
                          p="12px"
                          mr="12px"
                          overflow="visible"
                          position="relative"
                          minWidth="100px"
                          minHeight="100px"
                          borderRadius="8px"
                          flexDirection="column"
                          justifyContent="space-between"
                          border="1px solid #E3E5E8"
                        >
                          <Text
                            mb="8px"
                            fontWeight={600}
                            value={index.toString()}
                          />
                          <Text
                            color="#191A1B"
                            fontSize={12}
                            value={option.question.competence.subtitle}
                          />
                          <Container
                            background={option.selected_color}
                            position="absolute"
                            p="4px"
                            borderRadius="50%"
                            top={-8}
                            right={-8}
                          >
                            <Icon
                              name={option.selected_icon}
                              size={16}
                              filter="invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);"
                            />
                          </Container>
                        </Container>
                      )
                  )}
                </Container>
              </>
            )}

            <Text
              mb="24px"
              fontSize="20px"
              color="#191A1B"
              fontWeight={600}
              lineHeight="24px"
              value={t("ApplicationStatus.label-review")}
            />

            <Container
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="space-between"
            >
              {notes.map((note, index) => (
                <Container
                  key={index}
                  p="12px"
                  mb="24px"
                  minHeight="80px"
                  borderRadius="12px"
                  width="calc(50% - 32px)"
                  border="1px solid #E3E5E8"
                  onClick={() => navigate(`/questionnaire-review/${index}`)}
                >
                  <Text
                    fontSize="12px"
                    color="#191A1B"
                    lineHeight="16px"
                    value={note}
                  />
                </Container>
              ))}
              <Container
                p="12px"
                mb="24px"
                minHeight="80px"
                borderRadius="12px"
                alignItems="center"
                flexDirection="column"
                justifyContent="center"
                width="calc(50% - 32px)"
                border="1px solid #E3E5E8"
                onClick={() =>
                  navigate(
                    `/questionnaire-review/${applicationId}/${data?.questionnaire_id}`
                  )
                }
              >
                <Icon mb="8px" name="plus" size={24} />
                <Text
                  fontSize="14px"
                  color="#191A1B"
                  value={t("ApplicationStatus.new-review")}
                />
              </Container>
            </Container>
          </Container>
        </>
      )}

      <Footer />
      <Modal isOpen={onboarding} onClose={closeOnboarding}></Modal>
    </Container>
  );
};

export default ApplicationStatus;