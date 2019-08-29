import React from 'react';
import BaseComponent from './components/BaseComponent/BaseComponent';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function App() {
  const classes = useStyles();
  return (<>
    <CssBaseline>
      <Container className={classes.container} maxWidth='lg'>
        <BaseComponent />
      </Container>
    </CssBaseline>
  </>);
}

export default App;
