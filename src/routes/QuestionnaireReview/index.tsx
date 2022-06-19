import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Container, Text, TextArea } from "../../components";
import { QuestionnaireHeader } from "../Questionnaire/QuestionnaireHeader";
import { useGetNoteMutation, useSaveNoteMutation } from "../../service";

const QuestionnaireReview: React.FC<{}> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const [saveNote] = useSaveNoteMutation();
  const [getNote, { data }] = useGetNoteMutation();
  const { id, applicationId } = useParams<{
    id: string;
    applicationId: string;
  }>();

  useEffect(() => {
    if (id) getNote(parseInt(id, 10));
  }, [id, getNote]);

  const sendQuestionnaire = async () => {
    if (applicationId) {
      saveNote({
        questionnaire_application_id: parseInt(applicationId, 10),
        text: note,
      });
    }

    navigate(-1);
    setNote("");
  };

  return (
    <Container flex={1} flexDirection="column">
      <QuestionnaireHeader title={t("Questionnaire.title-review")} />
      {!data?.text ? (
        <>
          <TextArea onChangeText={setNote} />
          <Container
            left="0"
            right="0"
            bottom="0"
            p="24px 16px"
            position="absolute"
          >
            <Button
              mt={3}
              width="100%"
              isDisabled={!note}
              onClick={() => sendQuestionnaire()}
              value={t("Questionnaire.save")}
            />
          </Container>
        </>
      ) : (
        <Text mt="24px" fontWeight={500} fontSize="16px" value={data.text} />
      )}
    </Container>
  );
};

export default QuestionnaireReview;
