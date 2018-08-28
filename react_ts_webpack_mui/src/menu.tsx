import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { Router, Link } from "@reach/router"

import './css/menu.scss'

class Item {
    constructor(public path: string, public label: string, public icon: any) {

    }
}

const items = [
    new Item('/', 'Home', HomeIcon),
    new Item('/Dashboard', 'Dashboard', DashboardIcon),
    new Item('/Orders', 'Orders', ShoppingCartIcon)
].map(item => {
    return <Link to={item.path} key={item.path}>
        <ListItem button className='ListItem'>
            <ListItemIcon>
                <item.icon />
            </ListItemIcon>
            <ListItemText primary={item.label} />
        </ListItem>
    </Link>
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