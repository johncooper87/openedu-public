import React from 'react';
import { History, Location, useRoutes } from '@kemsu/router';
import pageNotFound from '@components/PageNotFound';
import Drawer from '@components/Drawer';
import UsersView from '@views/Users';
import CoursesView from '@views/Courses';
import UnitDataView from '@views/UnitData';
import { AdminLayout as useStyles } from './styles';

const routes = [
  [/.+\/users/, () => <UsersView />],
  [/.+\/courses/, () => <CoursesView />],
  [/.+\/units\/(?<id>\d+)/, ({ id }) => <UnitDataView id={Number(id)} />]
];

function AdminLayout() {
  
  if (Location.path === '/admin') History.replace('/admin/users');

  const classes = useStyles();
  return <>
    <Drawer />
    <div className={classes.view}>
      {useRoutes(routes) || pageNotFound}
    </div>
  </>;
}

export default React.memo(AdminLayout);