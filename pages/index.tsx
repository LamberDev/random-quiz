import React from 'react';
import { useEvent } from 'effector-react'
import { __INIT__ } from './../assets/effector/store'
import type { NextPage } from 'next'
import Head from 'next/head'
import { AnimatePresence } from 'framer-motion'
import { QuizContainer } from '../assets/components/QuizContainerComponent'

const Home: NextPage = () => {
	const [isLoading, setIsLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState<boolean>(false);
	const once = React.useRef<number>(1);
	const _INIT_ = useEvent(__INIT__);
	React.useEffect(() => {
		if (once.current === 1) {
			setIsLoading(() => true);
			_INIT_().then(() => setIsLoading(() => false));
			once.current--;
		}
	}, [])

	return (
		<div>
			<Head>
				<title>Quiz application</title>
				<meta name="description" content="This is quiz app!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<AnimatePresence>
				<QuizContainer
					isLoading={isLoading}
				/>
			</AnimatePresence>

		</div>
	)
}

export default Home
