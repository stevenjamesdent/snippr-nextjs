import * as CONSTANTS from '@snippr/constants';
import { MoonLoader } from 'react-spinners';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import { get_app_check_token } from '@/utils/appcheck';

import useLoading from '@/hooks/useLoading';

import Button from '../Button/Button';
import Checkbox from './fields/Checkbox';
import Content from '../Content/Content';
import Divider from '../Divider/Divider';
import EmailField from './fields/Email';
import TextArea from './fields/TextArea';
import TextField from './fields/Text';

const Form = ({className, style, onSubmit, children, id}) => {
    const methods = useForm();

    const [error, set_error] = useState(null);
    const [submitted, set_submitted] = useState(false);

    if (!id) throw new Error('Error, form requires an ID');

    const [submit, submitting] = useLoading(async (data) => {
        const app_check_token = await get_app_check_token();

        if (!data.contact_by_fax && data[CONSTANTS.SETTINGS.LEGAL.PRIVACY.IDENTIFIER]) {
            axios.post(`${process.env.NEXT_PUBLIC_SNIPPR_API_URL}/submissions/forms/${id}`, {
                data: data,
                consent: {
                    [CONSTANTS.FIELDS.CONSENT.LEGAL_CONSENT]: {
                        [CONSTANTS.SETTINGS.LEGAL.PRIVACY.IDENTIFIER]: data[CONSTANTS.SETTINGS.LEGAL.PRIVACY.IDENTIFIER]
                    },
                    [CONSTANTS.FIELDS.CONSENT.MARKETING_CONSENT]: {
                        [CONSTANTS.SETTINGS.MARKETING.EMAIL.IDENTIFIER]: data[CONSTANTS.SETTINGS.MARKETING.EMAIL.IDENTIFIER],
                        [CONSTANTS.SETTINGS.MARKETING.PHONE_SMS.IDENTIFIER]: data[CONSTANTS.SETTINGS.MARKETING.PHONE_SMS.IDENTIFIER],
                        [CONSTANTS.SETTINGS.MARKETING.POST.IDENTIFIER]: data[CONSTANTS.SETTINGS.MARKETING.POST.IDENTIFIER],
                    },
                },
                client_metadata: {
                    source: 'snippr website',
                    submitted: new Date(),
                },
            }, {
                headers: {
                    [CONSTANTS.SETTINGS.NETWORK.HEADERS.APP_CHECK_TOKEN]: app_check_token,
                }
            }).then((response) => {
                set_error(false);
                set_submitted(true);
                onSubmit && onSubmit();
            }).catch((error) => {
                console.error(error);
                set_error(true);
            });
        } else {
            set_error(true);
        }
    });

    const render_privacy_link = () => {
        return (
            <Link
                href={CONSTANTS.SETTINGS.LEGAL.PRIVACY.URL}
                target='_blank'
                title={CONSTANTS.SETTINGS.LEGAL.PRIVACY.LABEL}
            >
                {CONSTANTS.SETTINGS.LEGAL.PRIVACY.LABEL}
            </Link>
        );
    }

    return submitted ? (
        <div className={clsx(className, 'message message_success')} style={style}>
            Thanks for getting in touch! We'll get back to you as soon as possible.
        </div>
    ) : (
        <div className={clsx(className, 'relative')} style={style}>
            {submitting &&
                <div className='loader'>
                    <MoonLoader color='#00AEBC' />
                </div>
            }
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(submit)} style={style}>
                    <div className='form mb-5 p-10'>
                        {children}
                    </div>

                    <Content className='message message_disclaimer py-8 px-10 mb-5'>
                        The information you enter here will be used by us to engage with you regarding your request and relevant services. By submitting this form you are confirming that you agree to these terms, and that you consent to being contacted by SNIPPR LTD regarding your submission (via the provided contact details and any others we may already hold). For more information, read our {render_privacy_link()}. Please confirm your consent using the checkbox below.
                        <Divider className='my-5' />
                        <div className='flex flex-wrap gap-10'>
                            <Checkbox
                                label={`I have read and agree to the ${CONSTANTS.SETTINGS.LEGAL.PRIVACY.LABEL}`}
                                name={CONSTANTS.SETTINGS.LEGAL.PRIVACY.IDENTIFIER}
                                required={`You must consent to the ${CONSTANTS.SETTINGS.LEGAL.PRIVACY.LABEL} to submit this form`}
                            />
                            <Checkbox
                                label={`I consent to being contacted via ${CONSTANTS.SETTINGS.MARKETING.EMAIL.LABEL}`}
                                name={CONSTANTS.SETTINGS.MARKETING.EMAIL.IDENTIFIER}
                                required={`${CONSTANTS.SETTINGS.MARKETING.EMAIL.LABEL} consent is required to submit this form`}
                            />
                            <Checkbox
                                label={`I consent to being contacted via ${CONSTANTS.SETTINGS.MARKETING.PHONE_SMS.LABEL}`}
                                name={CONSTANTS.SETTINGS.MARKETING.PHONE_SMS.IDENTIFIER}
                            />
                            <Checkbox
                                label={`I consent to being contacted via ${CONSTANTS.SETTINGS.MARKETING.POST.LABEL}`}
                                name={CONSTANTS.SETTINGS.MARKETING.POST.IDENTIFIER}
                            />
                        </div>
                    </Content>

                    <input
                        {...methods.register('contact_by_fax')}
                        autoComplete='off'
                        className='hidden'
                        tabIndex='-1'
                        type='checkbox'
                        value='1'
                    />

                    {error &&
                        <div className='message message_error mb-5'>
                            An unknown error occurred, please try again or contact us at <a href="mailto:contact@snippr.co.uk">contact@snippr.co.uk</a>
                        </div>
                    }

                    <Button
                        className='self-start'
                        onClick={methods.handleSubmit(submit)}
                        theme='tertiary'
                        title='Submit'
                    />
                </form>
            </FormProvider>
        </div>
    );
};

Form.Checkbox = Checkbox;
Form.Email = EmailField;
Form.Text = TextField;
Form.TextArea = TextArea;

export default Form;