import React, { Component } from 'react';
import { Header, Image, Table, TableBody } from 'semantic-ui-react'

class Event extends Component {
    render() {
        return (
            <>
                <Table.Row>
                    <Table.Cell>
                        <Header as='h4' image>
                            <Image src='/images/avatar/small/lena.png' rounded size='mini' />
                            <Header.Content>
                            Lena
                            <Header.Subheader>Human Resources</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>22</Table.Cell>
                </Table.Row>
            </>
        );
    }
}

export default Event;