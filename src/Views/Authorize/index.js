import React from 'react';
import { Router } from '@kemsu/router';
import SignIntoAccountView from './SignIntoAccount';
import CreateAccountView from './CreateAccount';
import VerifyAccountView from './VerifyAccount';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useStyles from './styles';

function handleTabChange(event, value) {
  if (value === 0) Router.push('/account/signin');
  if (value === 1) Router.push('/account/signup');
}

const tabs = {
  'signin': [0, <SignIntoAccountView />, '500px'],
  'signup': [1, <CreateAccountView />, '600px'],
  'verify': [-1, <VerifyAccountView />, '500px']
};

function Authorize({ variant }) {
  const [tabValue, tabView, width] = tabs[variant];
  
  const classes = useStyles();
  return <div className={classes.root}>
    <Paper className={classes.paper} style={{ width }}>

      {tabValue >= 0 &&
        <Tabs value={tabValue} onChange={handleTabChange}
          indicatorColor="primary" textColor="primary" className={classes.tabs}
        >
          <Tab label="Вход" className={classes.tab} />
          <Tab label="Регистрация" className={classes.tab} />
        </Tabs>
      }

      <div>
        {tabView}
      </div>

    </Paper>
  </div>;
}

export default React.memo(Authorize);