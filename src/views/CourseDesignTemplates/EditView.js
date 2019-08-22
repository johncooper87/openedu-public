import React from 'react';
import Typography from '@material-ui/core/Typography';
import { History } from '@kemsu/router';
import { useMutation, useQuery } from '@kemsu/graphql-client';
import { useForm, Fields } from '@kemsu/form';
import { TextField, Editor, deserializeEditorContent, DragAndDropImageDialog } from '@kemsu/inputs';
import { Link, FormErrors, Notifications, Loader } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import UpdateFab from '@components/UpdateFab';
import ResetButton from '@components/ResetButton';
import { validateCourseName } from '@lib/validate';
import { CourseForm as useStyles } from './styles';

function EditCourseDesignTemplate() {
  
  const classes = useStyles();
  return <div className={classes.root}>
    <TextField className={classes.name} name="name" validate={validateCourseName} label="Название"/>
    <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
    <Editor className={classes.description} name="description" label="Полное описание" />
    <DragAndDropImageDialog className={classes.picture} name="picture" label="Изображение" />
  </div>;
}
EditCourseDesignTemplate = React.memo(EditCourseDesignTemplate);

const UPDATE_COURSE_DESIGN_TEMPLATE = ({
  id = 'Int!',
  name = 'String',
  summary = 'String',
  description = 'JSON',
  picture = 'JSON'
}) => `
  updateCourseDesignTemplate(
    id: ${id}
    name: ${name}
    summary: ${summary}
    description: ${description}
    picture: ${picture}
  )
`;
function onComplete() {
  History.push('/admin/course-design-templates');
  Notifications.push('Шаблон курса был успешно обновлен.', 'success');
}

export const COURSE_DESIGN_TEMPLATE = ({ id = 'Int!' }) => `
  courseDesignTemplate(id: ${id}) {
    name
    summary
    description
    picture
  }
`;

function deserialize(values) {
  if (values.description) values.description = deserializeEditorContent(values.description);
}

export default (
  ({ id }) => {
    const [{ courseDesignTemplate }, loading, errors] = useQuery(COURSE_DESIGN_TEMPLATE, { id });
    const updateCourseDesignTemplate = useMutation(UPDATE_COURSE_DESIGN_TEMPLATE, { onComplete }, { id });
    const form = useForm(updateCourseDesignTemplate, courseDesignTemplate, null, { deserialize });

    return <Fields comp={form}>
      <AdminView.AppBar>
        <AdminView.LeftBar>
          <RouteBackBtn path="/admin/course-design-templates" />
          <Typography variant="h6">Редактирование шаблона курса: {courseDesignTemplate?.name}</Typography>
        </AdminView.LeftBar>
        <ResetButton {...{ loading, errors }}>Сбросить</ResetButton>
      </AdminView.AppBar>
      <AdminView.Breadcrumbs>
        <Typography>Администрирование</Typography>
        <Link styled path="/admin/course-design-templates">Дизайн курсов</Link>
        <Typography color="textPrimary">Изменить шаблон</Typography>
      </AdminView.Breadcrumbs>
      <AdminView.Paper>
        <Loader loading={loading} errors={errors}>
          {courseDesignTemplate && <EditCourseDesignTemplate />}
        </Loader>
      </AdminView.Paper>
      <AdminView.Div>
        <FormErrors />
      </AdminView.Div>
      <UpdateFab {...{ loading, errors }} />
    </Fields>;
  }
) |> React.memo(#);