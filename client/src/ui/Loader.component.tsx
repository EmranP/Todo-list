import { FC } from 'react'

export const Loader: FC = () => {
	return (
		<div className='lazy-loading-container'>
			<div className='spinner'>
				<div className='spinner-inner'></div>
			</div>
		</div>
	)
}
