import "react-spring-bottom-sheet/dist/style.css";
import React, { useEffect, useState } from "react";
import { selectCurrentUser, selectSchool } from "../../store/auth";
import { BottomSheet } from "react-spring-bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { useGetSchoolsMutation } from "../../service";
import { School, User } from "../../store/type";
import { useTranslation } from "react-i18next";
import { LoadingDots } from "../LoadingDots";
import { Container } from "../Container";
import { ListItem } from "../ListItem";
import { HeaderProps } from "./types";
import { Image } from "../Image";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { AddButton } from "../AddButton";
import { useNavigate } from "react-router-dom";

export const Header: React.FC<HeaderProps> = (props) => {
  const [open, setOpen] = useState(false);
  const user: User = useSelector(selectCurrentUser);
  const [getSchools, { data, isLoading }] = useGetSchoolsMutation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (open && user?.id) {
      getSchools(user.id);
    }
  }, [user, open, getSchools]);

  const chooseSchool = (school: School) => {
    dispatch(selectSchool(school));
    setOpen(false);
  };

  return (
    user && (
      <>
        <Container
          mt="-24px"
          height="94px"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Container onClick={() => setOpen(true)} alignItems="center">
            {user.selectedSchool?.image_url ? (
              <Image
                height={32}
                width={32}
                src={user.selectedSchool?.image_url}
                border="1px solid #F0F3F5"
                borderRadius="50%"
              />
            ) : (
              <Container
                width={48}
                height={48}
                borderRadius={24}
                alignItems="center"
                background="#F0F2F5"
                justifyContent="center"
              >
                <Icon name="university" size={24} />
              </Container>
            )}
            <Text
              ml="8px"
              fontSize="16px"
              fontWeight={600}
              color="#191A1B"
              lineHeight="24px"
              value={user.selectedSchool?.name}
            />
            <Icon ml="4px" name="chevron-bottom" size={24} />
          </Container>
        </Container>
        <BottomSheet open={open} onDismiss={() => setOpen(false)}>
          <Container flexDirection="column" p="16px">
            <Text
              mb="8px"
              fontSize="20px"
              color="#191A1B"
              fontWeight={600}
              lineHeight="32px"
              value={t("Schools.schools")}
            />

            {isLoading ? (
              <LoadingDots />
            ) : (
              data?.map((school, index) => (
                <ListItem
                  key={index}
                  title={school.name}
                  imageUrl={school.image_url}
                  onClick={() => chooseSchool(school)}
                  description={t("Schools.school_description", { value: 1 })}
                  leftContent={
                    !school.image_url && (
                      <Container
                        width={48}
                        height={48}
                        borderRadius={24}
                        alignItems="center"
                        background="#F0F2F5"
                        justifyContent="center"
                      >
                        <Icon name="university" size={24} />
                      </Container>
                    )
                  }
                  rigthContent={
                    <>
                      {user.selectedSchool?.id === school.id && (
                        <Container
                          width="24px"
                          height="24px"
                          alignItems="center"
                          borderRadius="12px"
                          background="#3373CC"
                          justifyContent="center"
                        >
                          <Icon name="check" size={18} color="#fff" />
                        </Container>
                      )}
                    </>
                  }
                />
              ))
            )}
            <AddButton
              onClick={() => navigate("/school-form")}
              label={t("Schools.new-school")}
            />
          </Container>
        </BottomSheet>
      </>
    )
  );
};
