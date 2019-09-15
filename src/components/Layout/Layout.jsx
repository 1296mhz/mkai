import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './LayoutTheme';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Icon } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import MainRouter from '../../MainRouter';
import { Link } from 'react-router-dom';

// import { set, unset, map } from 'lodash';
class LayoutComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            drawerOpen: false,
            leftMenu: [
                {
                    id: 0,
                    title: 'Status',
                    link: '/',
                    icon: 'dashboard',
                },
                {
                    id: 1,
                    title: 'Stacks',
                    link: '/stacks',
                    icon: 'list',
                },
                {
                    id: 2,
                    title: 'Settings',
                    link: '/settings',
                    icon: 'settings_applications',
                }
            ]
        }
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
    }

    handleDrawerOpen() {
        let newState = {
            ...this.state,
            drawerOpen: true
        };
        this.setState(newState);
    }

    handleDrawerClose() {
        let newState = {
            ...this.state,
            drawerOpen: false
        };
        this.setState(newState);
    }

    render() {
        const { classes } = this.props;
        const CreateLink = React.forwardRef((props, ref) => (
            <Link innerRef={ref} to="/" {...props} />
        ));

        return (
            <>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: this.state.drawerOpen,
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, this.state.drawerOpen && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap>
                                Kubernetes Application Integrate
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={this.state.drawerOpen}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={this.handleDrawerClose}>
                                {classes.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            {this.state.leftMenu.map((text, index) => (
                                <ListItem button key={text.id} component={<Link to={text.link} />}>
                                    <ListItemIcon><Icon>{text.icon}</Icon></ListItemIcon>
                                    <ListItemText primary={text.title} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['About'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                    <main
                        className={clsx(classes.content, {
                            [classes.contentShift]: this.state.drawerOpen,
                        })}
                    >
                        <div className={classes.drawerHeader} />
                        <Container className={classes.container} maxWidth='lg'>
                            <MainRouter />
                        </Container>
                    </main>
                </div>
            </>
        )
    }
}

export default withStyles(styles)(LayoutComponent);