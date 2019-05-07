import React from 'react';
import { useMutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { History } from '@kemsu/router';
import { TextField } from '@kemsu/inputs';
import { Form } from '@kemsu/core';
import { setAuthHeader } from '@lib/client';
import { UserInfo } from '@lib/UserInfo';
import { validateFirstname, validateLastname } from '@lib/validate';
import { Complete as useStyles } from './styles';

const completeAccountMutation = `
  mutation completeAccount($firstname: String!, $lastname: String!) {
    bearer: completeAccount(firstname: $firstname, lastname: $lastname)
  }
`;
function onComplete({ bearer }) {
  UserInfo.update({ complete: true, bearer });
  setAuthHeader(bearer);
  History.push('/');
}

function ConfirmAccount() {
  const completeAccount = useMutation(completeAccountMutation, { onComplete });
  const form = useForm(completeAccount);

  const classes = useStyles();
  return <Form form={form} actions='submit' submitText="Закончить" submitIcon={null}>
    <TextField comp={form} name="firstname" validate={validateFirstname}
      label="Имя" className={classes.firstname}
    />
    <TextField comp={form} name="lastname" validate={validateLastname}
      label="Фамилия" className={classes.lastname}
    />
  </Form>;
}

export default React.memo(ConfirmAccount);