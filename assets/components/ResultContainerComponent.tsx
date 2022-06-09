import Image from 'next/image';
import React from 'react';
import ApplicationFinishIcon from './../icons/undraw_winners_ao2o 2.svg';
import { StyledAgainButton, StyledResultContainer, StyledResultTitle, StyledScoreInfo, StyledScoreNumber, StyledScoreWrapper } from './StyledComponents';

interface IProps {
    generate: () => void,
    score: React.MutableRefObject<number>
}

export const ResultContainer: React.FC<IProps> = (props) => {

    const resetGame = () => {
        props.score.current = 0;
        props.generate();
    }

    return (
        <StyledResultContainer>
            <StyledScoreWrapper>
                <Image
                    src={ApplicationFinishIcon}
                    alt='Application finish icon'
                    width='230'
                    height='230'
                />
                <StyledResultTitle>results</StyledResultTitle>
                <StyledScoreInfo>You got: <StyledScoreNumber>{props.score.current}</StyledScoreNumber> correct answer{props.score.current > 1 ? 's' : ''}</StyledScoreInfo>
            </StyledScoreWrapper>
            <StyledAgainButton onClick={() => resetGame()}>Try again</StyledAgainButton>
        </StyledResultContainer>
    )
}
