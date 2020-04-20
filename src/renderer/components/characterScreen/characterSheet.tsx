import React from 'react';
import ScoreBar from './scoreBar';
import SavesPanel from './savesPanel';
import SkillsPanel from './skillsPanel';
import FlagInputBox from './flagInputBox';
import LabeledTextbox from './labeledTextbox';
import Slider from '../layout/slider';
import ActionTable from './actionTable';

export type ScoreList = {
    scoreName: string;
    scoreID: string;
}[];

export type SkillsList = {
    skillName: string;
    scoreID: string;
}[];

// TODO get this data via OpenRPG libs
export type CharacterData = {
    name: string;
    attributes: {
        str: number;
        dex: number;
        con: number;
        int: number;
        wis: number;
        cha: number;
    };
};

type CharacterSheetProps = {
    data?: CharacterData;
};

type CharacterSheetState = {
    data: CharacterData;
};

type HeaderProps = {
    name?: string;
};

type StatsProps = {
    scores: ScoreList;
    skills: SkillsList;
    attributes?: {
        str: number;
        dex: number;
        con: number;
        int: number;
        wis: number;
        cha: number;
    };
};

// TODO load this from OpenRPG libs
export const Scores: ScoreList = [
    {
        scoreName: 'Strength',
        scoreID: 'STR'
    },
    {
        scoreName: 'Dexterity',
        scoreID: 'DEX'
    },
    {
        scoreName: 'Constitution',
        scoreID: 'CON'
    },
    {
        scoreName: 'Intelligence',
        scoreID: 'INT'
    },
    {
        scoreName: 'Wiscom',
        scoreID: 'WIS'
    },
    {
        scoreName: 'Charisma',
        scoreID: 'CHA'
    }
];

// TODO load this from OpenRPG libs
export const Skills: SkillsList = [
    {
        skillName: 'Acrobatics',
        scoreID: 'DEX'
    },
    {
        skillName: 'Animal Handling',
        scoreID: 'WIS'
    },
    {
        skillName: 'Arcana',
        scoreID: 'INT'
    },
    {
        skillName: 'Athletics',
        scoreID: 'STR'
    },
    {
        skillName: 'Deception',
        scoreID: 'CHA'
    },
    {
        skillName: 'History',
        scoreID: 'INT'
    },
    {
        skillName: 'Insight',
        scoreID: 'WIS'
    },
    {
        skillName: 'Intimidation',
        scoreID: 'CHA'
    },
    {
        skillName: 'Investigation',
        scoreID: 'INT'
    },
    {
        skillName: 'Medicine',
        scoreID: 'WIS'
    },
    {
        skillName: 'Nature',
        scoreID: 'INT'
    },
    {
        skillName: 'Perception',
        scoreID: 'WIS'
    },
    {
        skillName: 'Performance',
        scoreID: 'CHA'
    },
    {
        skillName: 'Persuasion',
        scoreID: 'CHA'
    },
    {
        skillName: 'Religion',
        scoreID: 'INT'
    },
    {
        skillName: 'Sleight of Hand',
        scoreID: 'DEX'
    },
    {
        skillName: 'Stealth',
        scoreID: 'DEX'
    },
    {
        skillName: 'Survival',
        scoreID: 'WIS'
    },
    {
        skillName: 'Survival',
        scoreID: 'WIS'
    }
];

export default class CharacterSheet extends React.Component<CharacterSheetProps, CharacterSheetState> {
    private static Header = class extends React.Component<HeaderProps, any> {
        public render = () => {
            const nameLabePlaceholder = this.props.name ? this.props.name : 'Character Name';

            return (
                <header>
                    <section className='charName'>
                        <label htmlFor='charName'>Character Name</label>
                        <input name='charName' placeholder={nameLabePlaceholder} />
                    </section>
                    <section className='misc'>
                        <ul>
                            <li>
                                <label htmlFor='classlevel'>Class &amp; Level</label>
                                <input name='classlevel' placeholder='Class Levels' />
                            </li>
                            <li>
                                <label htmlFor='background'>Background</label>
                                <input name='background' placeholder='Background' />
                            </li>
                            <li>
                                <label htmlFor='playerName'>Player Name</label>
                                <input name='playerName' placeholder='Player Name' />
                            </li>
                            <li>
                                <label htmlFor='race'>Race</label>
                                <input name='race' placeholder='Race' />
                            </li>
                            <li>
                                <label htmlFor='alignment'>Alignment</label>
                                <input name='alignment' placeholder='Alignment' />
                            </li>
                            <li>
                                <label htmlFor='exp'>Experience Points</label>
                                <input name='exp' placeholder='Experience' />
                            </li>
                        </ul>
                    </section>
                </header>
            );
        };
    };

    private static Stats = class extends React.Component<StatsProps, any> {
        public render = () => (
            <section>
                <section className='attributes'>
                    <ScoreBar scoreList={this.props.scores} data={this.props.attributes} />
                    <div className='row'>
                        <section className='attr-applications'>
                            <FlagInputBox label='Inspiration' className='inspiration' placeholder='0' />
                            <FlagInputBox label='Proficiency Bonus' className='proficiencybonus' placeholder='+0' />
                            <SavesPanel scoreList={this.props.scores} />
                            <SkillsPanel skillList={this.props.skills} />
                            <FlagInputBox
                                label='Passive Wisdom (Perception)'
                                className='passive-perception'
                                placeholder='10'
                            />
                        </section>
                        <section className='combat'>
                            <div className='row'>
                                <div className='initiative'>
                                    <label htmlFor='initiative'>Initiative</label>
                                    <input name='initiative' placeholder='+0' type='text' />
                                </div>
                                <div className='armorclass'>
                                    <label htmlFor='ac'>Armor Class</label>
                                    <input name='ac' placeholder='10' type='text' />
                                </div>
                                <div className='speed'>
                                    <label htmlFor='speed'>Speed</label>
                                    <input name='speed' placeholder='30' type='text' />
                                </div>
                            </div>
                            <div className='hp'>
                                <div className='regular'>
                                    <div className='max'>
                                        <label htmlFor='maxhp'>Hit Point Maximum</label>
                                        <input name='maxhp' placeholder='10' type='text' />
                                    </div>
                                    <div className='current'>
                                        <label htmlFor='currenthp'>Current Hit Points</label>
                                        <input name='currenthp' type='text' />
                                    </div>
                                </div>
                                <div className='temporary'>
                                    <label htmlFor='temphp'>Temporary Hit Points</label>
                                    <input name='temphp' type='text' />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='hitdice'>
                                    <div>
                                        <div className='total'>
                                            <label htmlFor='totalhd'>Total</label>
                                            <input name='totalhd' placeholder='2d10' type='text' />
                                        </div>
                                        <div className='remaining'>
                                            <label htmlFor='remaininghd'>Hit Dice</label>
                                            <input name='remaininghd' type='text' />
                                        </div>
                                    </div>
                                </div>
                                <div className='deathsaves'>
                                    <div>
                                        <div className='label'>
                                            <label>Death Saves</label>
                                        </div>
                                        <div className='marks'>
                                            <div className='deathsuccesses'>
                                                <label>Successes</label>
                                                <div className='bubbles'>
                                                    <input name='deathsuccess' type='checkbox' />
                                                    <input name='deathsuccess' type='checkbox' />
                                                    <input name='deathsuccess' type='checkbox' />
                                                </div>
                                            </div>
                                            <div className='deathfails'>
                                                <label>Failures</label>
                                                <div className='bubbles'>
                                                    <input name='deathfail' type='checkbox' />
                                                    <input name='deathfail' type='checkbox' />
                                                    <input name='deathfail' type='checkbox' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <LabeledTextbox
                                label='Other Proficiencies and Languages'
                                className='otherprofs'
                                placeholder='Extra Proficiencies and Languages here'
                            />
                        </section>
                    </div>
                </section>
            </section>
        );
    };

    private static Equipment = class extends React.Component<any, any> {
        public render = () => (
            <section className='actions'>
                <section className='attacksandspellcasting'>
                    <div>
                        <label>Attacks &amp; Spellcasting</label>
                        <ActionTable length={3} />
                        <textarea placeholder='Attacks & Spells here'></textarea>
                    </div>
                </section>
                <section className='equipment'>
                    <div>
                        <label>Equipment</label>
                        <div className='money'>
                            <ul>
                                <li>
                                    <label htmlFor='cp'>cp</label>
                                    <input name='cp' />
                                </li>
                                <li>
                                    <label htmlFor='sp'>sp</label>
                                    <input name='sp' />
                                </li>
                                <li>
                                    <label htmlFor='ep'>ep</label>
                                    <input name='ep' />
                                </li>
                                <li>
                                    <label htmlFor='gp'>gp</label>
                                    <input name='gp' />
                                </li>
                                <li>
                                    <label htmlFor='pp'>pp</label>
                                    <input name='pp' />
                                </li>
                            </ul>
                        </div>
                        <textarea placeholder='Equipment list here'></textarea>
                    </div>
                </section>
            </section>
        );
    };

    private static Personality = class extends React.Component<any, any> {
        public render = () => (
            <section className='roleplay'>
                <section className='flavor'>
                    <div className='personality'>
                        <label htmlFor='personality'>Personality</label>
                        <textarea name='personality' placeholder='Personality here'></textarea>
                    </div>
                    <div className='ideals'>
                        <label htmlFor='ideals'>Ideals</label>
                        <textarea name='ideals' placeholder='Ideals here'></textarea>
                    </div>
                    <div className='bonds'>
                        <label htmlFor='bonds'>Bonds</label>
                        <textarea name='bonds' placeholder='Bonds here'></textarea>
                    </div>
                    <div className='flaws'>
                        <label htmlFor='flaws'>Flaws</label>
                        <textarea name='flaws' placeholder='Flaws here'></textarea>
                    </div>
                </section>
                <LabeledTextbox label='Features & Traits' className='features' placeholder='Features & Traits here' />
            </section>
        );
    };

    private static Notes = class extends React.Component<any, any> {
        public render = () => (
            <section>
                <LabeledTextbox
                    label='Campaign & Character Notes'
                    className='notes'
                    placeholder='Campaign & Character Notes'
                />
            </section>
        );
    };

    public constructor(props: CharacterSheetProps, context?: any) {
        super(props, context);

        this.state = {
            data: {
                name: this.props.data?.name ? this.props.data?.name : '',
                attributes: this.props.data?.attributes
                    ? this.props.data?.attributes
                    : { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }
            }
        };
    }

    public render() {
        const name = this.props.data?.name;
        const attributes = this.props.data?.attributes;

        return (
            <form className='character-sheet'>
                <CharacterSheet.Header name={name} />
                <main>
                    <Slider key={name}>
                        <CharacterSheet.Stats scores={Scores} skills={Skills} attributes={attributes} />
                        <CharacterSheet.Equipment />
                        <CharacterSheet.Personality />
                        <CharacterSheet.Notes />
                    </Slider>
                </main>
            </form>
        );
    }
}
