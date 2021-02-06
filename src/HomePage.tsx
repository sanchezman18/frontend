import React, {FC} from 'react';
import { PrimaryButton } from './Styles';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { QuestionList } from './QuestionList';
import { QuestionData } from './QuestionData';
import { useEffect, useState } from 'react';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { async } from 'q';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {getUnansweredQuestionsActionCreator,
  AppState} from './Store';
import { RouteComponentProps } from 'react-router-dom';

const renderQuestion = (question: QuestionData) => <div>{question.title}</div>;

interface Props extends RouteComponentProps {
  getUnansweredQuestions: () => Promise<void>;
  questions: QuestionData[] | null;
  questionsLoading: boolean;
}

const HomePage: FC<Props> = ({
  history,
  questions,
  questionsLoading,
  getUnansweredQuestions
})=>{
 // const [questions, setQuestions] = useState<QuestionData[] | null>(null);
 // const [questionsLoading, setQuestionsLoading] = useState(true);
  const [count, setCount] = useState(0);
  useEffect(() => {
    //  console.log('first rendered');
  //  const doGetUnansweredQuestions = async () => {
  //    const unansweredQuestions = await getUnansweredQuestions();
  //    setQuestions(unansweredQuestions);
  //    setQuestionsLoading(false);
  //  };
  //  doGetUnansweredQuestions();
  if (questions === null) {
    getUnansweredQuestions();
  }
  }, [questions, getUnansweredQuestions]
  );
  const handleAskQuestionClick = () => {
    // setCount(count + 1);
    // console.log('TODO - move to the AskPage');
    window.location.assign('http://localhost:3000/ask');
  };

  return (
    <Page>
      <div
        css={css`
          margin: 50px auto 20px auto;
          padding: 30px 20px;
          max-width: 600px;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <PageTitle>Unanswered Questions</PageTitle>

          <PrimaryButton onClick={handleAskQuestionClick}>
            Ask a question
          </PrimaryButton>
        </div>
        {questionsLoading ? (
          <div
            css={css`
              font-size: 16px;
              font-style: italic;
            `}
          >
            Loading...
          </div>
        ) : (
          <QuestionList data={questions || []} />
        )}
      </div>
    </Page>
  );
};

const mapStateToProps = (store: AppState) => {
  return {
    questions: store.questions.unanswered,
    questionsLoading: store.questions.loading
  };
};

const mapDispatchToTrops =(
  dispatch: ThunkDispatch<any, any, AnyAction>,
) => {
  return {
    getUnansweredQuestions: () => 
      dispatch(getUnansweredQuestionsActionCreator()),
  };
;}

export default connect(
  mapStateToProps,
  mapDispatchToTrops
)(HomePage);