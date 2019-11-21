import React from 'react';
import ScoreBar from './scoreBar';
import SavesPanel from './savesPanel';
import SkillsPanel from './skillsPanel';

export type ScoreList = {
    scoreName: string;
    scoreID: string;
}[];

export type SkillsList = {
    skillName: string;
    scoreID: string;
}[];

export default class CharacterSheet extends React.Component<any, any> {
    private scores: ScoreList = [
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
            scoreName: 'Chrisma',
            scoreID: 'CHA'
        }
    ];

    private skills: SkillsList = [
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

    public render() {
        return (
            <div className='row'>
                <form className='charSheet'>
                    <this.HeaderSeciton />
                    <this.MainSection />
                </form>
            </div>
        );
    }

    private HeaderSeciton = () => (
        <header>
            <section className='charName'>
                <label htmlFor='charName'>Character Name</label>
                <input name='charName' placeholder='Character Name' />
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

    // TODO continue pulling this out into components
    private MainSection = () => (
        <main>
            <section>
                <section className='attributes'>
                    <ScoreBar scoreList={this.scores} />
                    <div className='attr-applications'>
                        <div className='inspiration box'>
                            <div className='label-container'>
                                <label htmlFor='inspiration'>Inspiration</label>
                            </div>
                            <input name='inspiration' type='checkbox' />
                        </div>
                        <div className='proficiencybonus box'>
                            <div className='label-container'>
                                <label htmlFor='proficiencybonus'>Proficiency Bonus</label>
                            </div>
                            <input name='proficiencybonus' placeholder='+0' />
                        </div>
                        <SavesPanel scoreList={this.scores} />
                        <SkillsPanel skillList={this.skills} />
                    </div>
                </section>
                <div className='passive-perception box'>
                    <div className='label-container'>
                        <label htmlFor='passiveperception'>Passive Wisdom (Perception)</label>
                    </div>
                    <input name='passiveperception' placeholder='10' />
                </div>
                <div className='otherprofs box textblock'>
                    <label htmlFor='otherprofs'>Other Proficiencies and Languages</label>
                    <textarea name='otherprofs' placeholder='Extra Proficiencies and Languages here'></textarea>
                </div>
            </section>
            <section>
                <section className='combat'>
                    <div className='armorclass'>
                        <div>
                            <label htmlFor='ac'>Armor Class</label>
                            <input name='ac' placeholder='10' type='text' />
                        </div>
                    </div>
                    <div className='initiative'>
                        <div>
                            <label htmlFor='initiative'>Initiative</label>
                            <input name='initiative' placeholder='+0' type='text' />
                        </div>
                    </div>
                    <div className='speed'>
                        <div>
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
                </section>
                <section className='attacksandspellcasting'>
                    <div>
                        <label>Attacks &amp; Spellcasting</label>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Atk Bonus</th>
                                    <th>Damage/Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input name='atkname' type='text' />
                                    </td>
                                    <td>
                                        <input name='atkbonus' type='text' />
                                    </td>
                                    <td>
                                        <input name='atkdamage' type='text' />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input name='atkname' type='text' />
                                    </td>
                                    <td>
                                        <input name='atkbonus' type='text' />
                                    </td>
                                    <td>
                                        <input name='atkdamage' type='text' />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input name='atkname' type='text' />
                                    </td>
                                    <td>
                                        <input name='atkbonus' type='text' />
                                    </td>
                                    <td>
                                        <input name='atkdamage' type='text' />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
            <section>
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
                <section className='features'>
                    <div>
                        <label htmlFor='features'>Features &amp; Traits</label>
                        <textarea name='features' placeholder='Features & Traits here'></textarea>
                    </div>
                </section>
            </section>
        </main>
    );
}
