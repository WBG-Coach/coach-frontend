import React, { useEffect } from "react";
import {
  AddButton,
  Container,
  Footer,
  Icon,
  Image,
  ListItem,
  Text,
} from "../../components";
import { LoadingDots } from "../../components/LoadingDots";
import { useGetTeachersMutation } from "../../service";
import { selectCurrentUser } from "../../store/auth";
import { Header } from "../../components/Header";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TeachersList: React.FC<{}> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [getTeachers, { data, isLoading }] = useGetTeachersMutation();

  useEffect(() => {
    if (user.id && user.selectedSchool?.id)
      getTeachers({ coach_id: user.id, school_id: user.selectedSchool?.id });
  }, [user, getTeachers]);

  return (
    <>
      <Header />
      <Container width="100%" height="100%" mb="100px" flexDirection="column">
        <Text
          mb="16px"
          mt="32px"
          fontSize={20}
          lineHeight="24px"
          fontWeight={600}
          color="#00121A"
          value={t("Teachers.last-seasons")}
        />

        <Container flexDirection="row">
          {data &&
            data.length > 0 &&
            data.map((teacher, index) => (
              <Container
                key={index}
                p="12px"
                mr="16px"
                width="120px"
                height="120px"
                borderRadius="12px"
                flexDirection="column"
                border="1px solid #E3E5E8"
                justifyContent="space-between"
              >
                <Image
                  src={teacher.image_url || ""}
                  width="24px"
                  height="24px"
                  borderRadius="12px"
                />
                <Container flexDirection="column">
                  <Text
                    color="#494B50"
                    fontSize="12px"
                    lineHeight="16px"
                    value={teacher.name?.split(" ")[0]}
                  />
                  <Text
                    fontSize="16px"
                    fontWeight={600}
                    lineHeight="24px"
                    value={t("TeacherDetails.item-description", {
                      value: index + 1,
                    })}
                  />
                </Container>
              </Container>
            ))}
        </Container>

        <Text
          mb="4px"
          mt="32px"
          fontSize={20}
          lineHeight="24px"
          fontWeight={600}
          color="#00121A"
          value={t("Teachers.title")}
        />
        <Text
          mb="24px"
          fontSize={14}
          fontWeight={400}
          color="#2B363B"
          lineHeight="20px"
          value={t("Teachers.description")}
        />

        {isLoading ? (
          <LoadingDots />
        ) : (
          <Container flexDirection="column">
            {data && data.length > 0 ? (
              data.map((teacher, index) => (
                <ListItem
                  key={index}
                  title={teacher.name || ""}
                  imageUrl={teacher?.image_url || ""}
                  onClick={() => navigate(`/teacher/${teacher.id}`)}
                  description={t("Teachers.teacher_description", {
                    subject: teacher.subject,
                  })}
                  children={
                    <Container mt="8px" flexDirection="row">
                      <Container
                        mr="8px"
                        px="8px"
                        height="24px"
                        alignItems="center"
                        borderRadius="24px"
                        justifyContent="center"
                        background="#33CC5A"
                      >
                        <Icon size={16} color="#fff" name="thumbs-up" />
                        <Text
                          ml="4px"
                          value="3"
                          fontSize="12px"
                          color="#ffffff"
                        />
                      </Container>

                      <Container
                        mr="8px"
                        px="8px"
                        height="24px"
                        alignItems="center"
                        borderRadius="24px"
                        justifyContent="center"
                        background="#FF3333"
                      >
                        <Icon size={16} color="#fff" name="thumbs-down" />
                        <Text
                          ml="4px"
                          value="2"
                          fontSize="12px"
                          color="#ffffff"
                        />
                      </Container>
                    </Container>
                  }
                />
              ))
            ) : (
              <Text value={t("Teachers.empty")} />
            )}
          </Container>
        )}

        <AddButton label={t("Teachers.add-teacher")} onClick={() => {}} />
      </Container>
      <Footer />
    </>
  );
};

export default TeachersList;