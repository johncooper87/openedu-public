import React from 'react';
import { useMutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { History } from '@kemsu/router';
import { TextField } from '@kemsu/inputs';
import { Form } from '@kemsu/core';
import { setAuthHeader } from '@lib/client';
import { UserInfo } from '@lib/UserInfo';
import { validatePasskey } from '@lib/validate';
import { Verify as useStyles } from './styles';

const verifyAccountMutation = `
  mutation verifyAccount($passkey: String!) {
    bearer: verifyAccount(passkey: $passkey)
  }
`;
function onComplete({ bearer }) {
  UserInfo.update({ verified: true, bearer });
  setAuthHeader(bearer);
  History.push('/');
}

function VerifyAccount() {
  const verifyAccount = useMutation(verifyAccountMutation, { onComplete });
  const form = useForm(verifyAccount);

  const classes = useStyles();
  return <Form form={form} actions='submit' submitText="Подтвердить" submitIcon={null}>
    <TextField comp={form} name="passkey" validate={validatePasskey}
      label="Ключ подтверждения" className={classes.passkey}
    />
  </Form>;
}

export default React.memo(VerifyAccount);