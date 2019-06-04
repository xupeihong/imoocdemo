import React, { Component } from 'react';
import {Card,Table} from 'antd'
class HighTable extends Component {
  state={}
  componentDidMount(){
      const dataSource=[]
      this.setState({
        dataSource
      })
  }
  render() {
    const columns=[

    ]
    return (
      <div>
        <Card title='高级表格'>
          <Table columns={columns} dataSource={this.state.dataSource}>

          </Table>
        </Card>
      </div>
    );
  }
}

export default HighTable;