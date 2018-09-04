import * as React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { dispatch, connect } from '../store'


@connect(state => ({
    name: state.cart.name,
    count: state.cart.products.length
}), calc => ({
    total: calc.cart.total()
}))
class Main extends React.Component {
    add1 = () => {
        dispatch.cart.add({
            name: 'test',
            price: 100,
            amount: 2
        })
    }

    add2 = () => {
        dispatch.cart.addAsync({
            name: 'test',
            price: 120,
            amount: 2
        })
    }

    render() {
        const { classes, name, count, total } = this.props as any

        return <div >
            <Paper elevation={1}>
                <Typography variant="headline" component="h3">
                    {name} 's total is {count}, totoal price is {total} !
                </Typography>
                <Typography component="p">
                    Paper can be used to build surface or other elements for your application.
                </Typography>
            </Paper>
            <Button variant="outlined" className={classes.button} onClick={this.add1}>
                add1
            </Button>
            <Button variant="outlined" className={classes.button} onClick={this.add2}>
                add2
            </Button>

            <div className='imageDiv' />
        </div>
    }
}

//set styles 
const Home = withStyles((theme => ({
    button: {
        margin: theme.spacing.unit,
    }
})) as any)(Main) as any

export { Home }