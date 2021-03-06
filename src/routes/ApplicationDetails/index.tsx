import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { OnboardingApplicationModal } from "./OnboardingApplicationModal";
import { Container, Footer, Icon, LoadingDots, Text } from "../../components";
import { useGetApplicationMutation } from "../../service";

const ApplicationDetails: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [getApplication, { data, isLoading }] = useGetApplicationMutation();
  const { applicationId } = useParams<{
    applicationId: string;
  }>();

  useEffect(() => {
    if (applicationId) {
      getApplication({ id: parseInt(applicationId, 10) });
    }
  }, [applicationId, getApplication]);

  useEffect(() => {
    if (applicationId) {
      getApplication({ id: parseInt(applicationId, 10) });
    }
  }, [applicationId, getApplication]);

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
              value={data?.name || "-"}
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
                    ? navigate(`/questionnaire/${applicationId}`)
                    : navigate(
                        `/questionnaire-observation-review/${applicationId}`
                      )
                }
              >
                <Icon
                  mr="8px"
                  size={24}
                  color="#191A1B"
                  name="clipboard-notes"
                />
                <Text
                  fontSize="12px"
                  color="#191A1B"
                  fontWeight={500}
                  value={t("ApplicationStatus.label-observation")}
                />
                <Icon
                  ml="auto"
                  name="chevron-right"
                  size={24}
                  color="#191A1B"
                />
              </Container>

              <Container
                p="12px"
                mr="6px"
                flex={1}
                borderRadius="12px"
                alignItems="center"
                flexDirection="row"
                background={
                  data?.status !== "PENDING_RESPONSE" ? "#F0F2F5" : "#F9FAFB"
                }
                onClick={() =>
                  data?.status !== "PENDING_RESPONSE" &&
                  navigate(`/feedback-list/${applicationId}`)
                }
              >
                <Icon
                  mr="8px"
                  name="comments"
                  size={24}
                  color={
                    data?.status !== "PENDING_RESPONSE" ? "#191A1B" : "#94979E"
                  }
                />
                <Text
                  fontSize="12px"
                  fontWeight={500}
                  color={
                    data?.status !== "PENDING_RESPONSE" ? "#191A1B" : "#94979E"
                  }
                  value={t("ApplicationStatus.label-feedback")}
                />
                <Icon
                  ml="auto"
                  name="chevron-right"
                  size={24}
                  color={
                    data?.status !== "PENDING_RESPONSE" ? "#191A1B" : "#94979E"
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
              {data?.notes.map((note, index) => (
                <Container
                  key={index}
                  p="12px"
                  mb="24px"
                  minHeight="80px"
                  borderRadius="12px"
                  width="calc(50% - 32px)"
                  border="1px solid #E3E5E8"
                  onClick={() =>
                    navigate(`/questionnaire-review-details/${note.id}`)
                  }
                >
                  <Text
                    fontSize="12px"
                    color="#191A1B"
                    lineHeight="16px"
                    value={`${note.text.substring(0, 50)}${
                      note.text.length > 50 ? "..." : ""
                    }`}
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
                  navigate(`/questionnaire-review/${applicationId}`)
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

      <OnboardingApplicationModal />
    </Container>
  );
};

export default ApplicationDetails;
