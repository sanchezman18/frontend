import React from 'react';
import { FC, useState, Fragment, useEffect } from 'react';
import { Page } from './Page';
import { QuestionData, getQuestion, postAnswer } from './QuestionData';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { gray3, gray6 } from './Styles';
import { Form, required, minLength, Values } from './Form';
import { Field } from './Field';
import { RouteComponentProps } from 'react-router';
import { async } from 'q';

//export const QuestionPage = () => <Page>Question Page</Page>;
interface RouteParams {
  questionId?: string;
}

export const QuestionPage: FC<RouteComponentProps<RouteParams>> = ({
  match,
}) => {
  const [question, setQuestion] = useState<QuestionData | null>(null);

  useEffect(() => {
    const doGetQuestion = async (questionId: number) => {
      const foundQuestion = await getQuestion(questionId);
      setQuestion(foundQuestion);
    };
    if (match.params.questionId) {
      const questionId = Number(match.params.questionId);
      doGetQuestion(questionId);
    }
  }, [match.params.questionId]);

  const handleSubmit = async (values: Values) => {
    const result = await postAnswer({
      questionId: question!.questionId,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    });
    return { succes: result ? true : false };
  };

  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {question === null ? '' : question.title}
        </div>
        {question !== null && (
          <Fragment>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
              `}
            >
              {question.content}
            </p>
            <div
              css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};
              `}
            >
              {`Asked by ${question.userName}`} on $
              {question.created.toLocaleDateString()}
              {question.created.toLocaleTimeString()}>
            </div>
            <div
              css={css`
                margin-top: 20px;
              `}
            >
              <Form
                submitCaption="Submit Your Answer"
                validationRules={{
                  content: [
                    { validator: required },
                    { validator: minLength, arg: 50 },
                  ],
                }}
                onSubmit={handleSubmit}
                failureMessage="There was a problem with you answer"
                succesMessage="Your answer was succesfully submitted"
              >
                <Field
                  name="content"
                  label="Your Answer"
                  type="TextArea"
                ></Field>
              </Form>
            </div>
          </Fragment>
        )}
      </div>
    </Page>
  );
};
