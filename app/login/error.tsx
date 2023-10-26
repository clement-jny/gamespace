'use client';

import React from 'react'

const Error = ({ error }: { error: Error }) => {
	return (
		<p>{error.message}</p>
	)
}

export default Error;