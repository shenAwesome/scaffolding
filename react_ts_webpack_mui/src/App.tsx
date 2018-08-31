

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
import { Router, createHistory, LocationProvider, Location } from "@reach/router"
import createHashSource from 'hash-source'
import LinearProgress from '@material-ui/core/LinearProgress'


import { Home } from './page/Home'
import { Dashboard } from './page/Dashboard'
import './css/App.scss'

import { connect } from './store'

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


var HomeTitle = () => (
    <span>home</span>
) as any

var DashboardTitle = () => (
    <span>dashboard</span>
) as any

const mapState = (state) => ({
    loading: state.util.loading
})
@connect(mapState)
class App extends React.Component<{
    loading?: number
    classes?: any
}> {
    state = {
        device: 'desktop',
        drawerOpen: true,
    }

    openDrawer = () => {
        this.setState({ drawerOpen: true })
    }

    closeDrawer = () => {
        this.setState({ drawerOpen: false })
    }

    onLocationChange(newLoc: string, oldLoc: string) {
        if (this.isPhone && this.state.drawerOpen) {
            this.closeDrawer()
        }
    }

    pathname = ''
    render() {
        return <LocationProvider history={history}>
            <CssBaseline />
            <Location>{({ location }) => {
                let newLoc = location.pathname
                if (newLoc !== this.pathname) {
                    this.onLocationChange(newLoc, this.pathname)
                }
                this.pathname = newLoc
            }}</Location>
            {this.main()}
        </LocationProvider>
    }

    main() {
        const { classes, loading } = this.props,
            { drawerOpen, device } = this.state

        console.log('loading=' + loading)

        return <div className={classNames('AppRoot', device, classes.root, { drawerOpen })} ref={this.root}>

            <AppBar position="absolute" className={classNames('header', classes.appBar, drawerOpen && classes.appBarShift)} >
                {(loading > 0) && <LinearProgress className='progressbar' />}
                <Toolbar disableGutters={!drawerOpen} className={classes.toolbar}>
                    <IconButton color="inherit" aria-label="Open drawer" onClick={this.openDrawer}
                        className={classNames(classes.menuButton, drawerOpen && classes.menuButtonHidden)}  >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" noWrap className={classes.title}>
                        <Router>
                            <HomeTitle path="/" />
                            <DashboardTitle path="Dashboard" />
                        </Router>
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" className={classNames('left', { open: drawerOpen, close: !drawerOpen })}
                classes={{ paper: classNames(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose), }}
                open={drawerOpen}  >
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
            <main className={classNames(classes.content, 'centre')} onMouseDown={this.onMouseDown}>
                <div className={classes.appBarSpacer} />
                <Router>
                    <Home path="/" />
                    <Dashboard path="Dashboard" />
                </Router>
            </main>
        </div>
    }

    get isPhone() {
        return this.state.device == 'phone'
    }

    onMouseDown = () => {
        if (this.isPhone && this.state.drawerOpen) {
            this.setState({ drawerOpen: false })
        }
    }

    root = React.createRef<HTMLDivElement>()

    checkDevice = () => {
        let width = window.innerWidth,
            height = window.innerHeight,
            length = width + height
        let device = 'desktop'
        if (width < 1100) device = 'tablet'
        if (length < 1200) device = 'phone'
        this.setState({ device })
        if (device != 'desktop') this.setState({ drawerOpen: false })
    }

    componentWillMount() {
        this.checkDevice()
    }
}

export default withStyles(styles as any)(App) 