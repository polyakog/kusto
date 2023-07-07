import React, {useEffect, useState} from "react"
import {Formik} from "formik"
import {getLayout} from "../../../common/components/Layout/BaseLayout/BaseLayout"
import {WrapperContainerAuth} from "../../../features/auth/WrapperContainerAuth"
import {Button} from "../../../common/components/Button/Button"
import {FormikLabel} from "../../../common/components/Formik/FormikLabel"
import {
  StyledAuthForm,
  StyledRecoveryWrapper,
  StyledSignIn,
  StyledSignInWrapper,
  StyledText
} from "../../../styles/styledComponents/auth/FormikAuth.styled"
import {useSendRecoveryLinkMutation} from "../../../assets/store/api/auth/authApi"
import {FormValueRecovery, ResetForm} from "../../../common/components/Formik/types"
import {validateRecoveryEn, validateRecoveryRu} from "../../../common/utils/validateRecovery"
import {EmailSentModal} from "../../../common/components/PopUpModal/EmailSentModal"
import {baseTheme} from "../../../styles/styledComponents/theme"
import Image from "next/image"
import {StyledContainerAuth} from "../../../styles/styledComponents/auth/Auth.styled";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {GetStaticPropsContext} from "next"
import config from 'next-i18next.config.js'
import {useTranslation} from 'next-i18next'
import {ThemeButton} from "../../../common/enums/themeButton";
import {Path} from "../../../common/enums/path";

export async function getStaticProps(context: GetStaticPropsContext) {
  const {locale} = context as any
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], config)),
    }
  }
}

export default function Recovery() {
  const initialAuthValues = {
    email: ""
  }

  const [isMessageSent, setIsMessageSent] = useState(false)
  const [email, setEmail] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [recoveryHandler, result] = useSendRecoveryLinkMutation()

  const {t, i18n} = useTranslation()

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (result.isSuccess) {
      setIsModalOpen(true)
      setIsMessageSent(true)
    }
  }, [result])

  const handleSubmit = async (values: FormValueRecovery, {resetForm}: ResetForm) => {
    const data = {
      email: values.email
    }

    await recoveryHandler(data)
      .unwrap()
      .then(() => {
        setEmail(values.email)
        resetForm()
      })
  }

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={t("rec_password_title")}>
        <Formik
          initialValues={initialAuthValues}
          validationSchema={i18n.language == 'en' ? validateRecoveryEn : validateRecoveryRu}
          onSubmit={handleSubmit}
        >
          {({errors, touched, values, setFieldValue}) => (
            <StyledAuthForm errorShow={true}>
              <FormikLabel
                name="email"
                onChange={(e) => setFieldValue("email", e)}
                value={values.email}
                type={"email"}
                title={"Email"}
                border={errors.email?.length && touched.email ? "red" : "white"}
                errors={errors}
                touched={touched}
                errorShow={true}
              />
              <StyledRecoveryWrapper>
                <StyledText color={baseTheme.colors.light[950]}>
                  {t("enter_email_text")}
                </StyledText>
                {isMessageSent && (
                  <StyledText>{t("link_sent_text")}</StyledText>
                )}
              </StyledRecoveryWrapper>

              <Button width="100%" theme={ThemeButton.PRIMARY} type="submit">
                {isMessageSent ? t("send_again_btn") : t("send_link_btn")}
              </Button>
            </StyledAuthForm>
          )}
        </Formik>
        <StyledSignInWrapper>
          <StyledSignIn href={Path.LOGIN}>{t("back_singIn_btn")}</StyledSignIn>
        </StyledSignInWrapper>
        <Image priority alt="Captcha" width={260} height={60} src="/captcha.png"/>
      </WrapperContainerAuth>
      {isModalOpen && (
        <EmailSentModal
          title={t("email_modal_title")}
          bodyText={t("email_modal_text") + ' ' + `${email}`}
          handleModalClose={handleModalClose}
        ></EmailSentModal>
      )}
    </StyledContainerAuth>
  )
}


Recovery.getLayout = getLayout
