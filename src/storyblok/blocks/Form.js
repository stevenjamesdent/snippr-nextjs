import * as CONSTANTS from '@snippr/constants';

import { storyblokEditable } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

import Content from "@/components/Content/Content";
import Form from "@/components/Form/Form";

const FormBlock = ({ blok }) => {
    const render_field = (field) => {
        const field_name = field.label.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '_').replace(/^-+|-+$/g, '');
        const unique_name = `${field_name}__${field._uid?.split('-')?.[0] ?? field._uid ?? ''}`

        switch (field.component) {
            case 'field_text' :
                return (
                    <Form.Text
                        label={field.label}
                        name={unique_name}
                        placeholder={field.placeholder ?? null}
                        required={field.required ?? false}
                    />
                );
            case 'field_email' :
                return (
                    <Form.Email
                        label={field.label}
                        name={CONSTANTS.SETTINGS.FORMS.FIELDS.EMAIL}
                        placeholder={field.placeholder ?? null}
                        required={field.required ?? false}
                    />
                );
            case 'field_textarea' :
                return (
                    <Form.TextArea
                        label={field.label}
                        name={unique_name}
                        placeholder={field.placeholder ?? null}
                        required={field.required ?? false}
                        rows={field.rows ?? 3}
                    />
                );
            case 'checkbox' :
                return (
                    <Form.Checkbox
                        label={field.label}
                        name={unique_name}
                        required={field.required ?? false}
                    />
                );
        }
    }

	return (
        <section className={`section theme-${blok.theme ?? 'default'}`} {...storyblokEditable(blok)}>
            <div className='gutter laptop:gutter-large'>
                {blok.content && <Content>{render(blok.content)}</Content>}
                <Form className='mt-5' id={blok._uid}>
                    {blok.fields.map((field) => render_field(field))}
                </Form>
            </div>
        </section>
	);
};

export default FormBlock;