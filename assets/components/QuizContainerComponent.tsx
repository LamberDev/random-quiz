import { QuizMainContainer } from "./QuizContainer"
import { QuizHeader } from "./QuizHeaderComponent"
import { StyledQuizContainer } from "./StyledComponents"

interface IProps {
    isLoading: boolean
}

export const QuizContainer: React.FC<IProps> = ({ isLoading }) => {
    return (
        <StyledQuizContainer>
            <QuizHeader />
            <QuizMainContainer
                isLoading={isLoading}
            />
        </StyledQuizContainer>
    )
}