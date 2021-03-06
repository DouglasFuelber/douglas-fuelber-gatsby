import React, { useRef, useCallback, useMemo } from 'react';
import { useIntl } from 'gatsby-plugin-react-intl';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
// import ReCAPTCHA from 'react-google-recaptcha';
import * as Yup from 'yup';

import config from '../data/site-data';

import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import Input from '../components/Input';
import Textarea from '../components/Textarea';

import getValidationErrors from '../utils/getValidationErrors';

import { Container, ContentRow, Button } from '../styles/contact-styles';

interface ContactFormData {
  Name: string;
  Email: string;
  Subject: string;
  Message: string;
}

const ContactPage: React.FC = () => {
  const intl = useIntl();
  const formRef = useRef<FormHandles>(null);

  const action = useMemo(() => {
    return config.defaultLanguage !== intl.locale
      ? `/${intl.locale}/success/`
      : `/success/`;
  }, []);

  const handleSubmit = useCallback(
    async (data: ContactFormData, { reset }, event) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          Name: Yup.string().required(
            intl.formatMessage({ id: 'contact.nameRequired' }),
          ),
          Email: Yup.string()
            .required(intl.formatMessage({ id: 'contact.emailRequired' }))
            .email(intl.formatMessage({ id: 'contact.emailInvalid' })),
          Subject: Yup.string().required(
            intl.formatMessage({ id: 'contact.subjectRequired' }),
          ),
          Message: Yup.string().required(
            intl.formatMessage({ id: 'contact.messageRequired' }),
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        event.target.submit();
        return true;
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        return false;
      }
    },
    [],
  );

  return (
    <Layout
      pageTitle={intl.formatMessage({ id: 'contact.pageTitle' })}
      pageRelativeUrl="contact"
    >
      <PageTitle title={intl.formatMessage({ id: 'contact.pageTitle' })} />
      <Container>
        <p>{intl.formatMessage({ id: 'contact.sentence' })}</p>
        <Form
          ref={formRef}
          action={action}
          name="Contact Form"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="Contact Form" />

          <ContentRow>
            <Input
              name="Name"
              placeholder={intl.formatMessage({ id: 'contact.nameLabel' })}
            />

            <Input
              name="Email"
              placeholder={intl.formatMessage({ id: 'contact.emailLabel' })}
            />
          </ContentRow>

          <ContentRow>
            <Input
              name="Subject"
              placeholder={intl.formatMessage({ id: 'contact.subjectLabel' })}
            />
          </ContentRow>

          <ContentRow>
            <Textarea
              name="Message"
              rows={5}
              placeholder={intl.formatMessage({ id: 'contact.messageLabel' })}
            />
          </ContentRow>

          <ContentRow>
            {/* <ReCAPTCHA
              sitekey={process.env.SITE_RECAPTCHA_KEY || ''}
              hl={intl.locale}
              size="invisible"
            /> */}
            <Button type="submit">
              {intl.formatMessage({ id: 'contact.buttonLabel' })}
            </Button>
          </ContentRow>
        </Form>
      </Container>
    </Layout>
  );
};

export default ContactPage;
