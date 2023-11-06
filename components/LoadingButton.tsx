type LoadingButtonProps = {
	loading: boolean;
	children: React.ReactNode;
};

export const LoadingButton = ({ loading = false, children }: LoadingButtonProps) => {
	return (
		<button type='submit' className='btn btn-primary'>
			{loading ? (
				<>
					<span className="loading loading-spinner"></span>
					Loading...
				</>

			) : (
				children
			)}
		</button>

	);
};