import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MapIcon from '@material-ui/icons/Map';
import * as classNames from 'classnames'


import { Router, Link } from "@reach/router"

class Item {
    constructor(public path: string, public label: string, public icon: any) {

    }
}

const items = [
    new Item('/', 'Home', HomeIcon),
    new Item('/Dashboard', 'Dashboard', DashboardIcon),
    new Item('/Orders', 'Orders', ShoppingCartIcon),
    new Item('/Map1', 'Map1', MapIcon),
    new Item('/Map2', 'Map2', MapIcon)
].map(item => {
    return <Link to={item.path} key={item.path} getProps={({ isCurrent }) => ({
        className: classNames('ListItem', { selected: isCurrent })
    })}>
        <ListItem button  >
            <ListItemIcon>
                <item.icon />
            </ListItemIcon>
            <ListItemText primary={item.label} />
        </ListItem>
    </Link >
})

const mainMenu = (
    <div className='mainMenu'>
        {items}
    </div>
)

const secondaryMenu = (
    <div className='secondaryMenu'>
        <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItem>
    </div>
)

export { mainMenu, secondaryMenu }