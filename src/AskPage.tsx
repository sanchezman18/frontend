import React, {FC, useEffect} from 'react';
import { Page } from './Page';
import { Form, required, minLength, Values, SubmitResult } from './Form';
import { PostQuestionData, QuestionData } from './QuestionData';
import { Field } from './Field';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {
  postQuestionActionCreator,
  AppState,
  clearPostedQuestionActionCreator
} from './Store';
import {AnyAction} from 'redux';

interface Props {
  postQuestion: (
    question: PostQuestionData,
  ) => Promise<void>;
  postedQuestionResult?: QuestionData;
  clearPostedQuestion: () => void;
}

export const AskPage: FC<Props> = (
  {
    postQuestion,
    postedQuestionResult,
    clearPostedQuestion,
  }
) => {

  useEffect(() => {
    return function cleanUp() {
      clearPostedQuestion();
    };
  }, [clearPostedQuestion]
  )

  const handleSubmit = (values: Values) => {
    /*const question = await postQuestion({
      title: values.title,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    });
    return { succes: question ? true : false };*/
    postQuestion({
      title: values.title,
content: values.content,
userName: "Fred",
created: new Date()

    });
  };

  let submitResult: SubmitResult | undefined;

  return (
    <Page title="Ask a question">
      <Form
        submitCaption="Submit Your Question"
        validationRules={{
          title: [{ validator: required }, { validator: minLength, arg: 10 }],
          content: [{ validator: required }, { validator: minLength, arg: 50 }],
        }}
        onSubmit={handleSubmit}
        submitResult = {submitResult}
        failureMessage="There was a problem with your question"
        succesMessage="Your question was succesfully submitted"
      >
        <Field name="title" label="Title" />
        <Field name="content" label="Content" type="TextArea" />
      </Form>
    </Page>
  );
};
//export default AskPage;

const mapStateToProps = (store: AppState) => {
  return {
  postedQuestionResult: store.questions.postedResult,
  };
  };
  const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AnyAction>,
  ) => {
  return {
  postQuestion: (question: PostQuestionData) =>
  dispatch(postQuestionActionCreator(question)),
  clearPostedQuestion: () =>
  dispatch(clearPostedQuestionActionCreator()),
  };
  };
  
  export default connect(
  mapStateToProps,
  mapDispatchToProps,
  )(AskPage);
