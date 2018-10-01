import * as React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { MapWidget } from './util/MapWidget'


class Main extends React.Component {
    render() {
        const { classes } = this.props as any
        return <div className={classes.full}>
            <MapWidget id='map1' />
        </div>
    }
}

//set styles 
const Map1 = withStyles((theme => {
    return {
        button: {
            margin: theme.spacing.unit,
        },
        full: {
            height: 'calc(100vh - 56px)',
            [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
                height: 'calc(100vh - 48px)'
            },
            [theme.breakpoints.up('sm')]: {
                height: 'calc(100vh - 64px)'
            }
        }
    }
}) as any)(Main) as any

export { Map1 }