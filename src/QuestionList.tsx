import { FC, memo } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { gray5, accent2 } from './Styles';
import { QuestionData } from './QuestionData';
import { Question } from './Question';
import React from 'react';

interface Props {
  data: QuestionData[];
  renderItem?: (item: QuestionData) => JSX.Element;
}

export const QuestionList: FC<Props> = memo(({ data, renderItem }) => {
  console.log('Rendering QuestionList', data, renderItem);
  return (
    <ul
      css={css`
        list-style: none;
        margin: 10px 0 0 0;
        padding: 0px 20px;
        background-color: #fff;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        border-top: 3px solid ${accent2};
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.16);
      `}
    >
      {data.map((question) => (
        <li
          key={question.questionId}
          css={css`
            border-top: 1px solid ${gray5};
            :first-of-type {
              border-top: none;
            }
          `}
        >
          {renderItem ? renderItem(question) : <Question data={question} />}
        </li>
      ))}
    </ul>
  );
});
