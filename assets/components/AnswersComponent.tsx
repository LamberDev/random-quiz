import React from 'react';
import { Answer, Answerbutton, AnswerContent, AnswersList } from "./StyledComponents"
import { v4 as uuid4 } from 'uuid'
import { IQuestion } from '../types';

interface IProps {
    question: IQuestion,
    score: React.MutableRefObject<number>,
    NextButtonRef: React.MutableRefObject<HTMLButtonElement | null>,
    end: React.MutableRefObject<boolean>
}

export const Answers: React.FC<IProps> = ({ question, score, NextButtonRef, end }) => {
    const QUESTION_ANSWER_MARKS: React.MutableRefObject<string[]> = React.useRef(['A', 'B', 'C', 'D']);
    const ListRef: React.MutableRefObject<HTMLUListElement | null> = React.useRef(null);

    const ButtonsClickhandler = React.useCallback((e: React.SyntheticEvent) => {
        if (question.answered) return;
        let element: HTMLElement | HTMLButtonElement | null = e.target as HTMLElement;
        if (element.tagName !== 'BUTTON') {
            element = element.closest('button');
        }

        if (element) {
            if (element.children[1].textContent === question.correctAnswer + '') {
                element.classList.add('correct');
                score.current++;
            }
            else {
                if (ListRef.current) {
                    const children: Array<Element> = Array.from(ListRef.current.children);
                    children.forEach(child => {
                        let button: Element | null = child.children[0],
                            mainElement: Element | null = button.children[1],
                            text: string = '';
                        if (button && mainElement && mainElement.textContent) {
                            text = mainElement.textContent.trim();
                        }
                        if (text === question.correctAnswer + '') {
                            button.classList.add('correct');
                        }
                    })
                    end.current = true;
                    element.classList.add('incorrect');
                }

            }
            if (NextButtonRef.current) {
                NextButtonRef.current.classList.remove('disabled');
            }
            question.answered = true;

        }
    }, [question, end, NextButtonRef, score])

    return <AnswersList
        ref={ListRef}
        as={AnswersList}
    >
        {
            question.answers.map((e, i) => <Answer
                initial={{
                    x: -500
                }}
                animate={{
                    x: 0
                }}
                transition={{
                    delay: i * 0.1
                }}
                key={uuid4()}
            >
                <Answerbutton
                    onClick={(e: React.SyntheticEvent) => ButtonsClickhandler(e)}
                >
                    <span>{QUESTION_ANSWER_MARKS.current[i]}</span>
                    <AnswerContent>{e + ''}</AnswerContent>
                    <i
                        className="bi bi-check-circle correct_icon"
                    ></i>
                    <i className="bi bi-x-circle incorrect_icon"></i>
                </Answerbutton>
            </Answer>)
        }
    </AnswersList>
}