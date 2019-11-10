import * as React from 'react';
import { Grid, Form, Table, Input, List, InputProps, Button } from 'semantic-ui-react';
import ORPGLogo from '../assets/images/d20_transparent.png';
import { die_eval, swap_drop, allow_drop, start_drag } from '../../common/scripts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

require('../css/section.css');
require('../scss/welcome.scss');

type TWelcomeState = {
    calcValue: string;
};

export default class WelcomeScreen extends React.Component<any, TWelcomeState> {
    constructor(props: any, context?: TWelcomeState) {
        super(props, context);
        this.state = {
            calcValue: '1d20'
        };

        this.handleCalcInputChange = this.handleCalcInputChange.bind(this);
    }

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
                            <this.GettingStarted />
                            <this.HomeUtils />
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        );
    }

    private GettingStarted = () => {
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
    };

    private handleCalcInputChange = (e: React.ChangeEvent<HTMLInputElement>, data: InputProps) => {
        // TODO(incomingstick): filter out bad characters
        e.preventDefault();
        this.setState({ calcValue: data.value });
    };

    private handleCalcSubmit = (e: React.SyntheticEvent, data: string) => {
        // TODO(incomingstick): filter out bad characters
        console.log('event: ', e);
        console.log('data: ', data);

        e.preventDefault();
        if (data !== undefined) this.setState({ calcValue: die_eval(data).toString() });
    };

    private Calculator = () => {
        const calcBtnClass = 'btn btn-fill btn-rect';
        let currValue = this.state.calcValue;

        return (
            <>
                <a href='#die-calculator' data-toggle='collapse' className='utility'>
                    <FontAwesomeIcon icon={faPlus} />
                    Die Calculator
                </a>
                <div id='die-calculator' className='collapse'>
                    <Form name='calc'>
                        <Table id='calc' border={0}>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell colSpan={3}>
                                        <Input
                                            id='calc-display'
                                            className='btn btn-rect'
                                            name='display'
                                            type='text'
                                            placeholder={currValue}
                                            value={currValue}
                                            onChange={this.handleCalcInputChange}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            className={calcBtnClass}
                                            content='C'
                                            onClick={() => {
                                                currValue = '';
                                                this.setState({ calcValue: currValue });
                                            }}
                                            title='Clear'
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Button
                                            className={calcBtnClass}
                                            content='1'
                                            onClick={() => this.setState({ calcValue: currValue += '1' })}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            className={calcBtnClass}
                                            content='2'
                                            onClick={() => this.setState({ calcValue: currValue += '2' })}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            className={calcBtnClass}
                                            content='3'
                                            onClick={() => this.setState({ calcValue: currValue += '3' })}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            className={calcBtnClass}
                                            content='+'
                                            onClick={() => this.setState({ calcValue: currValue += '+' })}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Button
                                            className={calcBtnClass}
                                            content='4'
                                            onClick={() => this.setState({ calcValue: currValue += '4' })}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            className={calcBtnClass}
                                            content='5'
                                            onClick={() => this.setState({ calcValue: currValue += '5' })}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            className={calcBtnClass}
                                            content='6'
                                            onClick={() => this.setState({ calcValue: currValue += '6' })}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            className={calcBtnClass}
                                            content='-'
                                            onClick={() => this.setState({ calcValue: currValue += '-' })}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Button
                                            className={calcBtnClass}
                                            content='7'
                                            onClick={() => this.setState({ calcValue: currValue += '7' })}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            className={calcBtnClass}
                                            content='8'
                                            onClick={() => this.setState({ calcValue: currValue += '8' })}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            className={calcBtnClass}
                                            content='9'
                                            onClick={() => this.setState({ calcValue: currValue += '9' })}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            className={calcBtnClass}
                                            content='x'
                                            onClick={() => this.setState({ calcValue: currValue += '*' })}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Button
                                            className={calcBtnClass}
                                            content='d'
                                            onClick={() => this.setState({ calcValue: currValue += 'd' })}
                                            title='XdY'
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            className={calcBtnClass}
                                            content='0'
                                            onClick={() => this.setState({ calcValue: currValue += '0' })}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            id='calc-eval'
                                            className={calcBtnClass}
                                            content='='
                                            onClick={(event: React.SyntheticEvent) => {
                                                this.handleCalcSubmit(event, currValue);
                                            }}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            className={calcBtnClass}
                                            content='/'
                                            onClick={() => this.setState({ calcValue: currValue += '/' })}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Form>
                </div>
            </>
        );
    };

    private HomeUtils = () => {
        return (
            <Grid.Column width={11}>
                <div className='homepage-utils'>
                    <h3>Utilities</h3>
                    <List>
                        {/* <!-- TODO All of these should be collapsed when program starts --> */}
                        <List.Item className='utils-panel'>
                            <this.Calculator />
                        </List.Item>

                        {/* <!-- TODO add name generator here --> */}
                        <List.Item className='utils-panel'>
                            <a href='#name-generator' data-toggle='collapse' className='utility'>
                                <FontAwesomeIcon icon={faPlus} />
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
                                <FontAwesomeIcon icon={faPlus} />
                                TODO Initiative Helper here
                            </a>
                            <div id='initiative-helper' className='collapse'>
                                <List ordered className='inner-utility'>
                                    <List.Item id='li1' onDrop={swap_drop} onDragOver={allow_drop}>
                                        <div id='drag1' draggable={true} onDragStart={start_drag} className='editable'>
                                            Char 1
                                        </div>
                                    </List.Item>
                                    <List.Item id='li2' onDrop={swap_drop} onDragOver={allow_drop}>
                                        <div id='drag2' draggable={true} onDragStart={start_drag} className='editable'>
                                            Char 2
                                        </div>
                                    </List.Item>
                                    <List.Item id='li3' onDrop={swap_drop} onDragOver={allow_drop}>
                                        <div id='drag3' draggable={true} onDragStart={start_drag} className='editable'>
                                            Char 3
                                        </div>
                                    </List.Item>
                                    <List.Item id='li4' onDrop={swap_drop} onDragOver={allow_drop}>
                                        <div id='drag4' draggable={true} onDragStart={start_drag} className='editable'>
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
    };
}
