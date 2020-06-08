import React, { Component } from 'react';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import * as moment from "moment" 


class EventList extends Component {

  formatTime = (itemTime) => {
    // let date = new Date(itemTime);
    // return date.toString();
    let options = { hour: 'numeric', minute: '2-digit' };
    let dateTime = new Date(itemTime)
    let justTime = dateTime.toLocaleTimeString(undefined, options);
    return justTime
  }
  // moment().format("MMM Do YY")

  render() {
    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );

    return (
      <>
        <List 
          itemLayout="vertical"
          size="large"
          dataSource={this.props.allEvents}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
              ]}
              extra={
                <img 
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.description}>{item.activity}</a>}
                description={`${moment(item.event_day).format("MMMM Do YYYY")} at ${this.formatTime(item.event_time)}`}


              />
              {item.description}

            </List.Item>
          )}
        >


        </List>
      </>
    );
  }
}

export default EventList;