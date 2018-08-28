import * as React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import DataGrid from 'react-datagrid2'
import 'react-datagrid2/index.css'

class Main extends React.Component {
    render() {
        var data = [
            { id: '1', firstName: 'John', lastName: 'Bobson' },
            { id: '2', firstName: 'Bob', lastName: 'Mclaren' }
        ]
        var columns = [
            { name: 'firstName' },
            { name: 'lastName' }
        ]


        return <div>
            Home page
            <DataGrid idProperty="id" dataSource={data} columns={columns} />
        </div>
    }
}

//set styles 
const Home = withStyles((theme => ({

})) as any)(Main) as any

export { Home }