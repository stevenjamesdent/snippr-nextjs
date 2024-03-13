import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message'

const TextField = ({className, style, label, name, required = false, placeholder, rules = {}, ...props}) => {
    const { formState: { errors }, register } = useFormContext();

    return (
        <div style={style} className={clsx(className, 'fieldwrap', errors?.[name] && 'fieldwrap_error')}>
            {label && <label className='label' htmlFor={name}>{label}{required ? ' *' : ''}</label>}
            <input
                className={clsx('field')}
                id={name}
                placeholder={placeholder}
                type='text'
                {...props}
                {
                    ...register(
                        name,
                        {
                            required: required ? `${label ?? 'This field'} is required` : false,
                            ...rules,
                        }
                    )
                }
            />
            <ErrorMessage
                errors={errors}
                name={name}
                render={({message}) => <span className='error'>{message}</span>}
            />
        </div>
    );
};

export default TextField;