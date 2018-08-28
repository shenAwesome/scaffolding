import * as React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import SimpleLineChart from './SimpleLineChart'
import SimpleTable from './SimpleTable'
import Typography from '@material-ui/core/Typography'

class Main extends React.Component {
    render() {
        const { classes } = this.props as any
        return <>
            <Typography variant="display1" gutterBottom>
                Orders
                        </Typography>
            <Typography component="div" className={classes.chartContainer}>
                <SimpleLineChart />
            </Typography>
            <Typography variant="display1" gutterBottom>
                Products
                        </Typography>
            <div className={classes.tableContainer}>
                <SimpleTable />
            </div>
        </>
    }
}
//set styles 
const Dashboard = withStyles((theme => ({
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
})) as any)(Main) as any


export { Dashboard }