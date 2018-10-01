

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
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import { fade } from '@material-ui/core/styles/colorManipulator';

import './css/App.scss'

import { Home } from './page/Home'
import { Dashboard } from './page/Dashboard'
import { Map1 } from './page/Map1'
import { Map2 } from './page/Map2'
import { connect } from './store/service'
import * as $ from "jquery";


const createBody = () => <Router>
    <Home path="/" />
    <Dashboard path="Dashboard" />
    <Map1 path='Map1' />
    <Map2 path='Map2' />
</Router>


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
    },

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
})


var HomeTitle = () => (
    <span>home</span>
) as any

var DashboardTitle = () => (
    <span>dashboard</span>
) as any

const mapState = (state) => ({
    loading: false //state.util.loading
})
@connect(mapState)
class App extends React.Component<{
    loading?: boolean
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


        //console.log('loading=' + loading)

        return <div className={classNames('AppRoot', device, classes.root, { drawerOpen })} ref={this.root}>
            {/* ---------the top bar  -----------*/}
            <AppBar position="absolute" className={classNames('header', classes.appBar, drawerOpen && classes.appBarShift)} >
                {loading && <LinearProgress className='progressbar' />}
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

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <Input
                            placeholder="Search…"
                            disableUnderline
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                    <Button color="inherit">Login</Button>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            {/* ---------the left menu -----------*/}
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
            {/* --------- main body -----------*/}
            <main className={classNames(classes.content, 'centre')} onMouseDown={this.onMouseDown}>
                <div className={classes.appBarSpacer} />
                {createBody()}
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
        console.log('check device')
    }

    onResize = () => {
        this.checkDevice()
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize)
        setTimeout(() => {
            $(window).trigger('resize')
        }, 200);

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize)
    }
}

export default withStyles(styles as any)(App) 