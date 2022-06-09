import React from 'react';
import Image from 'next/image';
import { $countries, __INIT__ } from './../effector/store';
import { useStore } from 'effector-react'
import {
    ImageContainer,
    QuizQuestion,
    StyledQuizContentContainer,
    StyledQuizMainContainer,
    NextButton,
    QuizQuestionContent
} from "./StyledComponents"
import ApplicationStaticIcon from './../icons/undraw_adventure_4hum 1.svg';
import { CreateQuestion } from './../methods/functions';
import CircularProgress from '@mui/material/CircularProgress';
import { ResultContainer } from './ResultContainerComponent';
import { AnimatePresence } from 'framer-motion';

import type { ICountry, IQuestion } from '../types';
import { Answers } from './AnswersComponent';

interface IProps {
    isLoading: boolean
}

export const QuizMainContainer: React.FC<IProps> = ({ isLoading }) => {
    const score: React.MutableRefObject<number> = React.useRef<number>(0);
    const once: React.MutableRefObject<number> = React.useRef<number>(1);
    const end: React.MutableRefObject<boolean> = React.useRef<boolean>(false);
    const NextButtonRef: React.MutableRefObject<HTMLButtonElement | null> = React.useRef(null);

    const countries: Array<ICountry> = useStore($countries);
    const [question, setQuestion]: [IQuestion | null, React.Dispatch<React.SetStateAction<IQuestion | null>>] = React.useState<IQuestion | null>(null);

    const generate = React.useCallback(() => {
        let generatedQuestions: IQuestion | null = CreateQuestion($countries.getState());
        setQuestion(() => generatedQuestions);
    }, []);

    const nextQuestion = React.useCallback(() => {
        if (end.current) {
            switchToTheEndOfGame();
            return;
        }
        generate();
        if (NextButtonRef.current) {
            NextButtonRef.current.classList.add('disabled');
        }
    }, [generate]);

    const switchToTheEndOfGame = () => {
        setQuestion(() => null);
        end.current = false;
        return;
    }

    React.useEffect(() => {
        if (countries.length && once.current) {
            generate();
            once.current--;
        }
    }, [countries, generate]);

    return (
        <AnimatePresence>
            <StyledQuizMainContainer>
                {
                    question &&
                    <ImageContainer>
                        <Image
                            src={ApplicationStaticIcon}
                            alt='Application static icon'
                        />
                    </ImageContainer>
                }
                {
                    !question && !isLoading &&
                    <ResultContainer
                        generate={generate}
                        score={score}
                    />
                }
                {
                    isLoading &&
                    <CircularProgress
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(50%, -50%)"
                        }}
                    />
                }
                {
                    !!question &&
                    <StyledQuizContentContainer>
                        <QuizQuestion>
                            <QuizQuestionContent>
                                {
                                    question.question
                                }
                            </QuizQuestionContent>
                            {
                                question.type === "NAME" &&
                                <Image
                                    src={question.image + ''}
                                    alt='Country flag icon'
                                    width='70'
                                    height='40'
                                />
                            }
                        </QuizQuestion>
                        <Answers
                            question={question}
                            score={score}
                            NextButtonRef={NextButtonRef}
                            end={end}
                        />
                        <NextButton
                            as={NextButton}
                            ref={NextButtonRef}
                            onClick={() => nextQuestion()}
                            className="disabled"
                        >
                            Next
                        </NextButton>
                    </StyledQuizContentContainer>
                }
            </StyledQuizMainContainer>

        </AnimatePresence>
    )
}
