import * as React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { MapWidget } from './util/MapWidget'


class Main extends React.Component {
    render() {
        return <div className='FillSpacePage'>
            <MapWidget id='map1' />
        </div>
    }
}

//set styles 
const Map1 = withStyles((theme => ({
    button: {
        margin: theme.spacing.unit,
    }
})) as any)(Main) as any

export { Map1 }