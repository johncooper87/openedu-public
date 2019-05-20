import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Mutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog, Notifications } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { SECTIONS } from './Sections';

const DELETE_COURSE = ({ id = 'Int!' }) => `
  deleteSection(id: ${id})
`;
function onComplete() {
  refetch(SECTIONS);
    Notifications.push('Раздел был успешно удален.', 'success');
}
const deleteSection = new Mutation(DELETE_COURSE, { onComplete }).commit;

export default function ConfirmDeleteSectionDialog(close, { id, name }) {
  
  return <ConfirmDialog onClose={close} onConfirm={() => deleteSection({ id })} title="Удаление раздела" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить раздел {name}?
    </DialogContentText>
  </ConfirmDialog>;
}