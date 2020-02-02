import * as React from 'react';
import _ from 'lodash';
import { Grid, Form, Table, Input, List, InputProps, Button, Accordion, Card } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { die_eval, swap_drop, allow_drop, start_drag } from '../../common/scripts';
import { ORPG_DOCS, ORPG_REPO, ORPG_BLOG } from '../../common/globals';
import { ControlFunctionMap } from './appContainer';

require('../scss/welcome.scss');

type WelcomeState = {
    calcValue: string;
    activeUtilIndex: number;
};

export type WelcomeCallbackData = {
    screen?: string;
    action?: (...data: any[]) => void;
    data?: any;
};

type WelcomeProps = {
    welcomeScreenCallback: (callbackData: WelcomeCallbackData) => void;
    controlFuncMap: ControlFunctionMap;
};

export default class WelcomeScreen extends React.Component<WelcomeProps, WelcomeState> {
    public constructor(props: WelcomeProps, context?: WelcomeState) {
        super(props, context);
        this.state = {
            calcValue: '1d20',
            activeUtilIndex: -1
        };

        this.handleCalcInputChange = this.handleCalcInputChange.bind(this);
    }

    public render() {
        return (
            <div className='section-template'>
                <div id='welcome-section'>
                    <div className='welcome-header'>
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

    private GettingStarted = () => (
        <Grid.Column width={4}>
            <div className='getting-started'>
                <List>
                    <List.Header as='h3'>Start</List.Header>
                    <List.Item>
                        <a onClick={this.handleNewCharacterClick}>New Character</a>
                    </List.Item>
                    <List.Item>
                        <a href='#'>Open Something...</a>
                    </List.Item>
                    <List.Item>
                        <a href='#'>Import Something...</a>
                    </List.Item>
                </List>
            </div>
            <div className='getting-started'>
                <List>
                    <List.Header as='h3'>Recent</List.Header>
                    <List.Item>No recent stuff</List.Item>
                </List>
            </div>
            <div className='getting-started'>
                <List>
                    <List.Header as='h3'>Help</List.Header>
                    <List.Item>
                        <a href={ORPG_DOCS} target='_blank' id='docs'>
                            Documentation
                        </a>
                    </List.Item>
                    <List.Item>
                        <a href={ORPG_REPO} target='_blank' id='repo'>
                            Github Repository
                        </a>
                    </List.Item>
                    <List.Item>
                        <a href={ORPG_BLOG} target='_blank' id='blog'>
                            Blog
                        </a>
                    </List.Item>
                </List>
            </div>
        </Grid.Column>
    );

    private handleNewCharacterClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // TODO(incomingstick): Open CharacterScreen and start new character dialog
        e.preventDefault();

        const item = this.props.controlFuncMap.find((obj) => obj.functionAlias === 'newCharacter');

        this.props.welcomeScreenCallback({ screen: item?.control, action: item?.function });
    };

    private handleCalcInputChange = (e: React.ChangeEvent<HTMLInputElement>, data: InputProps) => {
        // TODO(incomingstick): filter out bad characters
        e.preventDefault();
        this.setState({ calcValue: data.value });
    };

    private handleCalcSubmit = (e: React.SyntheticEvent, data: string) => {
        // TODO(incomingstick): filter out bad characters
        e.preventDefault();
        this.setState({ calcValue: die_eval(data)?.toString() });
    };

    private handleUtilHeaderClick = (e: React.MouseEvent, data: InputProps) => {
        e.preventDefault();

        const index = data.index;
        const activeIndex = this.state.activeUtilIndex;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({ activeUtilIndex: newIndex });
    };

    private Calculator = () => {
        const calcBtnClass = 'btn btn-fill btn-rect';
        let currValue = this.state.calcValue;

        return (
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
        );
    };

    private HomeUtils = () => {
        const activeIndex = this.state.activeUtilIndex;

        return (
            <Grid.Column width={11}>
                <div className='homepage-utils'>
                    <h3>Utilities</h3>
                    <Accordion>
                        <Card className='utils-panel' fluid>
                            <Accordion.Title
                                className='utility'
                                as={Card.Header}
                                index={0}
                                active={activeIndex === 0}
                                onClick={this.handleUtilHeaderClick}>
                                <FontAwesomeIcon icon={faPlus} />
                                Die Calculator
                            </Accordion.Title>
                            <Accordion.Content id='die-calculator' as={Card.Content} active={activeIndex === 0}>
                                <this.Calculator />
                            </Accordion.Content>
                        </Card>
                        <Card className='utils-panel' fluid>
                            <Accordion.Title
                                className='utility'
                                as={Card.Header}
                                index={1}
                                active={activeIndex === 1}
                                onClick={this.handleUtilHeaderClick}>
                                <FontAwesomeIcon icon={faPlus} />
                                TODO Name Generator here
                            </Accordion.Title>
                            <Accordion.Content id='name-generator' as={Card.Content} active={activeIndex === 1}>
                                <div className='inner-utility'>Lorem ipsum dolor text....</div>
                            </Accordion.Content>
                        </Card>
                        <Card className='utils-panel' fluid>
                            <Accordion.Title
                                className='utility'
                                as={Card.Header}
                                index={2}
                                active={activeIndex === 2}
                                onClick={this.handleUtilHeaderClick}>
                                <FontAwesomeIcon icon={faPlus} />
                                TODO Initiative Helper here
                            </Accordion.Title>
                            <Accordion.Content id='initiative-helper' as={Card.Content} active={activeIndex === 2}>
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
                            </Accordion.Content>
                        </Card>
                    </Accordion>
                </div>
            </Grid.Column>
        );
    };
}
