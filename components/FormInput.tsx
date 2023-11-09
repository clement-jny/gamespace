import { HTMLInputTypeAttribute } from 'react';
import { useFormContext } from 'react-hook-form';

type FormInputProps = {
	label: string;
	name: string;
	type?: HTMLInputTypeAttribute;
};

export const FormInput = ({ label, name, type = 'text' }: FormInputProps) => {
	const { register, formState: { errors } } = useFormContext();

	return (
		<div className='form-control w-full'>
			<label htmlFor={name} className='label font-bold'>
				<span className='label-text'>{label}</span>
			</label>

			<input id={name} type={type} placeholder='Type here' className={`input input-bordered w-full ${errors[name] && 'input-error'}`} {...register(name)} />

			{
				errors[name] && <span className='label-text-alt text-error pt-1'>{errors[name]?.message as string}</span>
			}
		</div>
	);
}