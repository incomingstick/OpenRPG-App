import * as React from 'react';
import { Grid, Form, Table, Input, List } from 'semantic-ui-react';

// TODO get this working
import * as Scripts from '../js/scripts';

const ORPGLogo = require('../assets/images/d20_transparent.png');

function GettingStarted() {
    return (
        <Grid.Column width={4}>
            <div className='getting-started'>
                <h3>Start</h3>
                <ul>
                    <li>
                        <a href='#'>New Character</a>
                    </li>
                    <li>
                        <a href='#'>Open Something...</a>
                    </li>
                    <li>
                        <a href='#'>Import Something...</a>
                    </li>
                </ul>
            </div>
            <div className='getting-started'>
                <h3>Recent</h3>
                <ul>
                    <li>No recent stuff</li>
                </ul>
            </div>
            <div className='getting-started'>
                <h3>Help</h3>
                <ul>
                    <li>
                        <a href='#' target='_blank' id='docs'>
                            Documentation
                        </a>
                    </li>
                    <li>
                        <a href='#' target='_blank' id='repo'>
                            Github Repository
                        </a>
                    </li>
                    <li>
                        <a href='#' target='_blank' id='blog'>
                            Blog
                        </a>
                    </li>

                    <script type='text/javascript'>
                        document.getElementById("docs").href = pkginfo.website.docs;
                        document.getElementById("repo").href = pkginfo.repository.url;
                        document.getElementById("blog").href = pkginfo.website.blog;
                    </script>
                </ul>
            </div>
        </Grid.Column>
    );
}

function Calculator() {
    const calcBtnClass = 'btn btn-fill btn-rect';
    let value: string;

    return (
        <>
            <a href='#die-calculator' data-toggle='collapse' className='utility'>
                <span className='fa fa-fw fa-plus'></span>
                Die Calculator
            </a>
            <div id='die-calculator' className='collapse'>
                <Form name='calc' onSubmit={() => false}>
                    <Table id='calc' border={0}>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell colSpan={3}>
                                    <Input id='calc-display' className='btn btn-rect' name='display' type='text' />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        className={calcBtnClass}
                                        type={'button'}
                                        value='C'
                                        onClick={() => (value = '')}
                                        title='Clear'
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Input
                                        className={calcBtnClass}
                                        type={'button'}
                                        value='1'
                                        onClick={() => (value += '1')}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        className={calcBtnClass}
                                        type={'button'}
                                        value='2'
                                        onClick={() => (value += '2')}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        className={calcBtnClass}
                                        type={'button'}
                                        value='3'
                                        onClick={() => (value += '3')}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        className={calcBtnClass}
                                        type={'button'}
                                        value='+'
                                        onClick={() => (value += '+')}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Input
                                        className={calcBtnClass}
                                        type={'button'}
                                        value='4'
                                        onClick={() => (value += '4')}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        className={calcBtnClass}
                                        type={'button'}
                                        value='5'
                                        onClick={() => (value += '5')}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        className={calcBtnClass}
                                        type={'button'}
                                        value='6'
                                        onClick={() => (value += '6')}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        className={calcBtnClass}
                                        type={'button'}
                                        value='-'
                                        onClick={() => (value += '-')}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Input
                                        className={calcBtnClass}
                                        type={'button'}
                                        value='7'
                                        onClick={() => (value += '7')}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        className={calcBtnClass}
                                        type={'button'}
                                        value='8'
                                        onClick={() => (value += '8')}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        className={calcBtnClass}
                                        type={'button'}
                                        value='9'
                                        onClick={() => (value += '9')}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        className={calcBtnClass}
                                        type={'button'}
                                        value='x'
                                        onClick={() => (value += '*')}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Input
                                        className={calcBtnClass}
                                        type={'button'}
                                        value='d'
                                        onClick={() => (value += 'd')}
                                        title='XdY'
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        className={calcBtnClass}
                                        type={'button'}
                                        value='0'
                                        onClick={() => (value += '0')}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        id='calc-eval'
                                        className={calcBtnClass}
                                        type={'button'}
                                        value='='
                                        onClick={() => (value = Scripts.die_eval(value).toString())}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        className={calcBtnClass}
                                        type={'button'}
                                        value='/'
                                        onClick={() => (value += '/')}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Form>
            </div>
        </>
    );
}

function HomeUtils() {
    return (
        <Grid.Column width={11}>
            <div className='homepage-utils'>
                <h3>Utilities</h3>
                <List>
                    {/* <!-- TODO All of these should be collapsed when program starts --> */}
                    <List.Item className='utils-panel'>
                        <Calculator />
                    </List.Item>

                    {/* <!-- TODO add name generator here --> */}
                    <List.Item className='utils-panel'>
                        <a href='#name-generator' data-toggle='collapse' className='utility'>
                            <span className='fa fa-fw fa-plus'></span>
                            TODO Name Generator here
                        </a>
                        <div id='name-generator' className='collapse'>
                            <div className='inner-utility'>Lorem ipsum dolor text....</div>
                        </div>
                    </List.Item>

                    {/* <!-- TODO Finish this
                                    - Ensure security of accepting label input
                                    - Allow adding more tags
                                    - Allow removing tags. Currently if a tag becomes empty it no longer allows  --> */}
                    <List.Item className='utils-panel'>
                        <a href='#initiative-helper' data-toggle='collapse' className='utility'>
                            <span className='fa fa-fw fa-plus'></span>
                            TODO Initiative Helper here
                        </a>
                        <div id='initiative-helper' className='collapse'>
                            <List ordered className='inner-utility'>
                                <List.Item
                                    id='li1'
                                    onDrop={Scripts.swapDrop(event)}
                                    onDragOver={Scripts.allowDrop(event)}>
                                    <div
                                        id='drag1'
                                        draggable={true}
                                        onDragStart={Scripts.drag(event)}
                                        className='editable'>
                                        Char 1
                                    </div>
                                </List.Item>
                                <List.Item
                                    id='li2'
                                    onDrop={Scripts.swapDrop(event)}
                                    onDragOver={Scripts.allowDrop(event)}>
                                    <div
                                        id='drag2'
                                        draggable={true}
                                        onDragStart={Scripts.drag(event)}
                                        className='editable'>
                                        Char 2
                                    </div>
                                </List.Item>
                                <List.Item
                                    id='li3'
                                    onDrop={Scripts.swapDrop(event)}
                                    onDragOver={Scripts.allowDrop(event)}>
                                    <div
                                        id='drag3'
                                        draggable={true}
                                        onDragStart={Scripts.drag(event)}
                                        className='editable'>
                                        Char 3
                                    </div>
                                </List.Item>
                                <List.Item
                                    id='li4'
                                    onDrop={Scripts.swapDrop(event)}
                                    onDragOver={Scripts.allowDrop(event)}>
                                    <div
                                        id='drag4'
                                        draggable={true}
                                        onDragStart={Scripts.drag(event)}
                                        className='editable'>
                                        Char 4
                                    </div>
                                </List.Item>
                            </List>
                        </div>
                    </List.Item>
                </List>
            </div>
        </Grid.Column>
    );
}

export default class WelcomeScreen extends React.Component<any, any> {
    public handleItemClick = (e: any, { name }: any) => {
        this.setState({ activeItem: name });
    };

    public render() {
        return (
            <div className='section-template'>
                <div id='welcome-section' className='section js-section is-shown'>
                    <div className='welcome-header'>
                        <img src={ORPGLogo} height={45} />
                        <h1>OpenRPG</h1>
                        <h2>Your tabletop RPG workbench</h2>
                    </div>

                    <Grid className='container'>
                        <Grid.Row className='row'>
                            <GettingStarted />
                            <HomeUtils />
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        );
    }
}
