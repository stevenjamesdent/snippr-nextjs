import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message'

const Checkbox = ({className, style, label, name, required = false, rules = {}, ...props}) => {
    const { formState: { errors }, register } = useFormContext();

    return (
        <div style={style} className={clsx(className, 'fieldwrap', errors?.[name] && 'fieldwrap_error')}>
            <label className='checkbox' htmlFor={name}>
                <input
                    className={clsx('checkbox_input')}
                    id={name}
                    type='checkbox'
                    {...props}
                    {
                        ...register(
                            name,
                            {
                                required: required
                                            ? typeof required === 'string' || required instanceof String
                                                ? required
                                                : `${label ?? 'This field'} is required`
                                            : false,
                                ...rules,
                            }
                        )
                    }
                />
                <span className='checkbox_field'></span>
                {label && <span className='label label_collapse'>{label}{required ? ' *' : ''}</span>}
            </label>
            <ErrorMessage
                errors={errors}
                name={name}
                render={({message}) => <span className='error'>{message}</span>}
            />
        </div>
    );
};

export default Checkbox;