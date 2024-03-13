import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message'

import TextField from './Text';

const EmailField = ({className, style, label, name, required = false, placeholder, ...props}) => {
    return (
        <TextField
            className={className}
            label={label}
            name={name}
            placeholder={placeholder}
            required={required}
            style={style}
            type='email'
            rules={{
                ...(props?.rules ?? {}),
                pattern: {
                    value: /(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                    message: "Please enter a valid email address"
                }
            }}
        />
    );
};

export default EmailField;