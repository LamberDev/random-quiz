import styled, { StyledComponent } from "styled-components";
import { ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion';


export const StyledQuizContainer: StyledComponent<'div', any, {}> = styled.div`
    display: flex;
    flex-direction: column;
	width: 500px;
	min-height: 450px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform:translate(-50%, -50%);

	@media screen and (max-width: 650px){
		width: 90%;
		margin: 0 auto;
	}

	@media screen and (max-width: 400px){
		width: 100%;
		margin: 0;
		min-height: fit-content;
	}

`

export const StyledQuizHeader: StyledComponent<'header', any, {}> = styled.header`

`

export const StyledQuizMainContainer: StyledComponent<'main', any, {}> = styled.main`
    background-color: #fff;
	border-radius: 20px;
	color: #6066D0CC;
	min-height: inherit;
	height: 100%;
`

export const StyledQuizTitle: StyledComponent<'h1', any, {}> = styled.h1`
	font-family: "Poppins Bold";
	text-transform: uppercase;
	color: white;
	font-size: 2rem;

	@media screen and (max-width: 400px){
		font-size: 1.8rem
	}


`

export const ImageContainer: StyledComponent<'div', any, {}> = styled.div`
	position: absolute;
	top: -10px;
	right:0;

	@media screen and (max-width: 550px){
		display:none;
	}

`

export const StyledQuizContentContainer: StyledComponent<'div', any, {}> = styled.div`
	padding: 3rem 1rem 2rem;
	padding-inline: 1rem;
	overflow: hidden;

	@media screen and (max-width: 550px){
		padding-top: 1.5rem;
	}

`

export const QuizQuestion: StyledComponent<'span', any, {}> = styled.span`
	font-family: "Poppins Bold";
	color: #2F527B;
	display: flex;
	align-items: center;
	gap: .3rem;
`

export const QuizQuestionContent: StyledComponent<'span', any, {}> = styled.span`	
	flex-shrink: 2;

	@media screen and ( max-width: 400px){
		font-size: .8rem;
	}

`;

export const AnswersList: StyledComponent<'ul', any, {}> = styled.ul`
	list-style: none;
	margin-top: 1rem;
`

export const Answer: StyledComponent<ForwardRefComponent<HTMLLIElement, HTMLMotionProps<'li'>>, any, {}> = styled(motion.li)`
	width: 100%;

	&:not(:last-of-type){
		margin-bottom: 1rem;
	}

	@media screen and (max-width: 400px){
		font-size: .7rem;
	}

`

export const Answerbutton: StyledComponent<'button', any, {}> = styled.button`
	width 100%;
	padding: 0.25rem .5rem;
	border-radius: 10px;
	border: 1px solid #6066D0B2;
	transition: 300ms ease;
	display: flex;
	gap: 1rem;
	font-family: "Poppins Light";
	justify-content: space-between;
	position: relative;
	overflow: hidden;
	align-items: center;
	padding-right: 21px;

	&>i{
		position: absolute;
		right: .5rem;
		color: transparent;
		transition: 300ms ease;
		transform: translateY(-30px);
	}

	&:hover{
		background-color: #F9A826;
		border-color: #F9A826;
		color: #fff;
	}

	&.correct{
		background-color: #60BF88;
		color: #fff;
		border-color: #60BF88;

		&>.correct_icon{
			transform: translateY(0);
			color: #fff;
		}

	}

	&.incorrect{
		background-color: #EA8282;
		color: #fff;
		border-color: #EA8282;

		&>.incorrect_icon{
			transform: translateY(0);
			color: #fff
		}

	}

`;

export const AnswerContent: StyledComponent<'span', any, {}> = styled.span`
	width:100%;
`

export const NextButton: StyledComponent<"button", any, {}> = styled.button`
	all: unset;
	border-radius: 10px;
	color: #fff;
	background-color: #F9A826;
	padding: .5rem 1.5rem;
	margin-top: 1rem;
	margin-left: 100%;
	transform: translateX(-100%);
	cursor: pointer;

	&.disabled{
		display: none
	}

`

export const StyledResultContainer: StyledComponent<'div', any, {}> = styled.div`
	
`;

export const StyledResultTitle: StyledComponent<'h2', any, {}> = styled.h2`
	text-transform: capitalize;
	color: #1D355D;
	font-size: 2.5rem;
`

export const StyledScoreInfo: StyledComponent<'span', any, {}> = styled.span`
	font-family: "Poppins Regular";
	color: #1D355D;
`

export const StyledScoreNumber: StyledComponent<'span', any, {}> = styled.span`
	color: #6fcf97;
	font-family: "Poppins Medium";
	font-size: 1.75rem;
`

export const StyledAgainButton: StyledComponent<'button', any, {}> = styled.button`
	border-radius: 10px;
	border: 1.5px solid #1D355D;
	color: #1D355D;
	padding: .5rem 2.5rem;
	font-family: "Poppins Medium";
	transition: 200ms ease-in;
	text-align: center;
	margin: 0 auto;
	display: block;

	&:hover{
		background-color: #1d355d;
		color: #fff;
	}

`

export const StyledScoreWrapper: StyledComponent<'div', any, {}> = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin-bottom: 1.25rem;
`