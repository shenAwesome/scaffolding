

import * as React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { mainMenu, secondaryMenu } from './menu'
import { Router, createHistory, LocationProvider } from "@reach/router"
import createHashSource from 'hash-source'

import { Home } from './page/Home'
import { Dashboard } from './page/Dashboard'

const drawerWidth = 240

const source = createHashSource(),
    history = createHistory(source)

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarSpacer: theme.mixins.toolbar,
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        minHeight: '100vh',
        overflow: 'visible',
    }
})

class App extends React.Component {
    state = {
        open: true,
    }

    openDrawer = () => {
        this.setState({ open: true })
    }

    closeDrawer = () => {
        this.setState({ open: false })
    }

    render() {
        return <LocationProvider history={history}>
            <CssBaseline />
            {this.main()}
        </LocationProvider>
    }

    main() {
        const { classes } = this.props as any,
            { open } = this.state

        return <div className={classes.root}>
            <AppBar position="absolute" className={classNames('AppBar', classes.appBar, open && classes.appBarShift)} >
                <Toolbar disableGutters={!open} className={classes.toolbar}>
                    <IconButton color="inherit" aria-label="Open drawer" onClick={this.openDrawer}
                        className={classNames(classes.menuButton, open && classes.menuButtonHidden)}  >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" noWrap className={classes.title}>
                        Todo
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent"
                classes={{ paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose), }}
                open={open}  >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={this.closeDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainMenu}</List>
                <Divider />
                <List>{secondaryMenu}</List>
            </Drawer>
            <main className={classNames(classes.content, 'page')}>
                <div className={classes.appBarSpacer} />
                <Router>
                    <Home path="/" />
                    <Dashboard path="Dashboard" />
                </Router>
            </main>
        </div>
    }
}

export default withStyles(styles as any)(App) 