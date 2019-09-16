import * as React from 'react';
import { Grid, Header } from 'semantic-ui-react';

export default class CharacterScreen extends React.Component<any, any> {
  public render() {
    return (
      <Grid verticalAlign='middle' columns='2' centered container stretched>
        <Grid.Row stretched>
          <Grid.Column stretched textAlign='center'>
            <Header inverted>These are some mighty cool characters.</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

{
  /* <template class="section-template">
    <section id="character-section" class="section js-section">
        <link rel="stylesheet" href="css/characterSheet.css">
        <div class="character-header">
            <div>
                <h1>Characters</h1>
            </div>
            <h2>Your Characters</h2>
        </div>

        <div class="container">
            <h3>TODO Do character creator and other character stuff here</h3>
            <nav>
                <div class="nav nav-tabs" id="char-list-nav-tab" role="tablist">
                    <a class="nav-item nav-link active" id="nav-char-1-tab" data-toggle="tab" href="#nav-char-1" role="tab" aria-controls="nav-char-1"
                        aria-selected="true">Char 1</a>
                    <a class="nav-item nav-link" id="nav-char-2-tab" data-toggle="tab" href="#nav-char-2" role="tab" aria-controls="nav-char-2"
                        aria-selected="false">Char 2</a>
                    <a class="nav-item nav-link" id="nav-char-3-tab" data-toggle="tab" href="#nav-char-3" role="tab" aria-controls="nav-char-3"
                        aria-selected="false">Char 3</a>
                </div>
            </nav>
            <div class="tab-content" id="char-list-nav-tabContent">
                <div class="tab-pane fade show active" id="nav-char-1" role="tabpanel" aria-labelledby="nav-char-1-tab">
                    <!-- Start Character Sheet -->
                    <div class="row">
                        <form class="charSheet">
                            <header>
                                <section class="charName">
                                    <label for="charName">Character Name</label>
                                    <input name="charName" placeholder="Character Name" />
                                </section>
                                <section class="misc">
                                    <ul>
                                        <li>
                                            <label for="classLevel">Class &amp; Level</label>
                                            <input name="classLevel" placeholder="Class Levels" />
                                        </li>
                                        <li>
                                            <label for="background">Background</label>
                                            <input name="background" placeholder="Background" />
                                        </li>
                                        <li>
                                            <label for="playerName">Player Name</label>
                                            <input name="playerName" placeholder="Player Name">
                                        </li>
                                        <li>
                                            <label for="race">Race</label>
                                            <input name="race" placeholder="Race" />
                                        </li>
                                        <li>
                                            <label for="alignment">Alignment</label>
                                            <input name="alignment" placeholder="Alignment" />
                                        </li>
                                        <li>
                                            <label for="exp">Experience Points</label>
                                            <input name="exp" placeholder="Experience" />
                                        </li>
                                    </ul>
                                </section>
                            </header>
                            <main>
                                <section>
                                    <section class="attributes">
                                        <div class="scores">
                                            <ul>
                                                <li>
                                                    <div class="score">
                                                        <label for="strScore">Strength</label>
                                                        <input name="strScore" placeholder="10" />
                                                    </div>
                                                    <div class="modifier">
                                                        <input name="strMod" placeholder="+0" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="score">
                                                        <label for="dexScore">Dexterity</label>
                                                        <input name="dexScore" placeholder="10" />
                                                    </div>
                                                    <div class="modifier">
                                                        <input name="dexMod" placeholder="+0" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="score">
                                                        <label for="conScore">Constitution</label>
                                                        <input name="conScore" placeholder="10" />
                                                    </div>
                                                    <div class="modifier">
                                                        <input name="conMod" placeholder="+0" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="score">
                                                        <label for="wisScore">Wisdom</label>
                                                        <input name="wisScore" placeholder="10" />
                                                    </div>
                                                    <div class="modifier">
                                                        <input name="wisMod" placeholder="+0" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="score">
                                                        <label for="intScore">Intelligence</label>
                                                        <input name="intScore" placeholder="10" />
                                                    </div>
                                                    <div class="modifier">
                                                        <input name="intMod" placeholder="+0" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="score">
                                                        <label for="chaScore">Charisma</label>
                                                        <input name="chaScore" placeholder="10" />
                                                    </div>
                                                    <div class="modifier">
                                                        <input name="chaMod" placeholder="+0" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="attr-applications">
                                            <div class="inspiration box">
                                                <div class="label-container">
                                                    <label for="inspiration">Inspiration</label>
                                                </div>
                                                <input name="inspiration" type="checkbox" />
                                            </div>
                                            <div class="proficiencybonus box">
                                                <div class="label-container">
                                                    <label for="proficiencybonus">Proficiency Bonus</label>
                                                </div>
                                                <input name="proficiencybonus" placeholder="+0" />
                                            </div>
                                            <div class="saves list-section box">
                                                <ul>
                                                    <li>
                                                        <label for="Strength-save">Strength</label>
                                                        <input name="Strength-save" placeholder="+0" type="text" />
                                                        <input name="Strength-save-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Dexterity-save">Dexterity</label>
                                                        <input name="Dexterity-save" placeholder="+0" type="text" />
                                                        <input name="Dexterity-save-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Constitution-save">Constitution</label>
                                                        <input name="Constitution-save" placeholder="+0" type="text" />
                                                        <input name="Constitution-save-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Wisdom-save">Wisdom</label>
                                                        <input name="Wisdom-save" placeholder="+0" type="text" />
                                                        <input name="Wisdom-save-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Intelligence-save">Intelligence</label>
                                                        <input name="Intelligence-save" placeholder="+0" type="text" />
                                                        <input name="Intelligence-save-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Charisma-save">Charisma</label>
                                                        <input name="Charisma-save" placeholder="+0" type="text" />
                                                        <input name="Charisma-save-prof" type="checkbox" />
                                                    </li>
                                                </ul>
                                                <div class="label">
                                                    Saving Throws
                                                </div>
                                            </div>
                                            <div class="skills list-section box">
                                                <ul>
                                                    <li>
                                                        <label for="Acrobatics">Acrobatics
                                                            <span class="skill">(Dex)</span>
                                                        </label>
                                                        <input name="Acrobatics" placeholder="+0" type="text" />
                                                        <input name="Acrobatics-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Animal Handling">Animal Handling
                                                            <span class="skill">(Wis)</span>
                                                        </label>
                                                        <input name="Animal Handling" placeholder="+0" type="text" />
                                                        <input name="Animal Handling-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Arcana">Arcana
                                                            <span class="skill">(Int)</span>
                                                        </label>
                                                        <input name="Arcana" placeholder="+0" type="text" />
                                                        <input name="Arcana-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Athletics">Athletics
                                                            <span class="skill">(Str)</span>
                                                        </label>
                                                        <input name="Athletics" placeholder="+0" type="text" />
                                                        <input name="Athletics-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Deception">Deception
                                                            <span class="skill">(Cha)</span>
                                                        </label>
                                                        <input name="Deception" placeholder="+0" type="text" />
                                                        <input name="Deception-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="History">History
                                                            <span class="skill">(Int)</span>
                                                        </label>
                                                        <input name="History" placeholder="+0" type="text" />
                                                        <input name="History-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Insight">Insight
                                                            <span class="skill">(Wis)</span>
                                                        </label>
                                                        <input name="Insight" placeholder="+0" type="text" />
                                                        <input name="Insight-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Intimidation">Intimidation
                                                            <span class="skill">(Cha)</span>
                                                        </label>
                                                        <input name="Intimidation" placeholder="+0" type="text" />
                                                        <input name="Intimidation-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Investigation">Investigation
                                                            <span class="skill">(Int)</span>
                                                        </label>
                                                        <input name="Investigation" placeholder="+0" type="text" />
                                                        <input name="Investigation-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Medicine">Medicine
                                                            <span class="skill">(Wis)</span>
                                                        </label>
                                                        <input name="Medicine" placeholder="+0" type="text" />
                                                        <input name="Medicine-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Nature">Nature
                                                            <span class="skill">(Int)</span>
                                                        </label>
                                                        <input name="Nature" placeholder="+0" type="text" />
                                                        <input name="Nature-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Perception">Perception
                                                            <span class="skill">(Wis)</span>
                                                        </label>
                                                        <input name="Perception" placeholder="+0" type="text" />
                                                        <input name="Perception-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Performance">Performance
                                                            <span class="skill">(Cha)</span>
                                                        </label>
                                                        <input name="Performance" placeholder="+0" type="text" />
                                                        <input name="Performance-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Persuasion">Persuasion
                                                            <span class="skill">(Cha)</span>
                                                        </label>
                                                        <input name="Persuasion" placeholder="+0" type="text" />
                                                        <input name="Persuasion-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Religion">Religion
                                                            <span class="skill">(Int)</span>
                                                        </label>
                                                        <input name="Religion" placeholder="+0" type="text" />
                                                        <input name="Religion-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Sleight of Hand">Sleight of Hand
                                                            <span class="skill">(Dex)</span>
                                                        </label>
                                                        <input name="Sleight of Hand" placeholder="+0" type="text" />
                                                        <input name="Sleight of Hand-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Stealth">Stealth
                                                            <span class="skill">(Dex)</span>
                                                        </label>
                                                        <input name="Stealth" placeholder="+0" type="text" />
                                                        <input name="Stealth-prof" type="checkbox" />
                                                    </li>
                                                    <li>
                                                        <label for="Survival">Survival
                                                            <span class="skill">(Wis)</span>
                                                        </label>
                                                        <input name="Survival" placeholder="+0" type="text" />
                                                        <input name="Survival-prof" type="checkbox" />
                                                    </li>
                                                </ul>
                                                <div class="label">
                                                    Skills
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <div class="passive-perception box">
                                        <div class="label-container">
                                            <label for="passiveperception">Passive Wisdom (Perception)</label>
                                        </div>
                                        <input name="passiveperception" placeholder="10" />
                                    </div>
                                    <div class="otherprofs box textblock">
                                        <label for="otherprofs">Other Proficiencies and Languages</label>
                                        <textarea name="otherprofs"></textarea>
                                    </div>
                                </section>
                                <section>
                                    <section class="combat">
                                        <div class="armorclass">
                                            <div>
                                                <label for="ac">Armor Class</label>
                                                <input name="ac" placeholder="10" type="text" />
                                            </div>
                                        </div>
                                        <div class="initiative">
                                            <div>
                                                <label for="initiative">Initiative</label>
                                                <input name="initiative" placeholder="+0" type="text" />
                                            </div>
                                        </div>
                                        <div class="speed">
                                            <div>
                                                <label for="speed">Speed</label>
                                                <input name="speed" placeholder="30" type="text" />
                                            </div>
                                        </div>
                                        <div class="hp">
                                            <div class="regular">
                                                <div class="max">
                                                    <label for="maxhp">Hit Point Maximum</label>
                                                    <input name="maxhp" placeholder="10" type="text" />
                                                </div>
                                                <div class="current">
                                                    <label for="currenthp">Current Hit Points</label>
                                                    <input name="currenthp" type="text" />
                                                </div>
                                            </div>
                                            <div class="temporary">
                                                <label for="temphp">Temporary Hit Points</label>
                                                <input name="temphp" type="text" />
                                            </div>
                                        </div>
                                        <div class="hitdice">
                                            <div>
                                                <div class="total">
                                                    <label for="totalhd">Total</label>
                                                    <input name="totalhd" placeholder="2d10" type="text" />
                                                </div>
                                                <div class="remaining">
                                                    <label for="remaininghd">Hit Dice</label>
                                                    <input name="remaininghd" type="text" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="deathsaves">
                                            <div>
                                                <div class="label">
                                                    <label>Death Saves</label>
                                                </div>
                                                <div class="marks">
                                                    <div class="deathsuccesses">
                                                        <label>Successes</label>
                                                        <div class="bubbles">
                                                            <input name="deathsuccess1" type="checkbox" />
                                                            <input name="deathsuccess2" type="checkbox" />
                                                            <input name="deathsuccess3" type="checkbox" />
                                                        </div>
                                                    </div>
                                                    <div class="deathfails">
                                                        <label>Failures</label>
                                                        <div class="bubbles">
                                                            <input name="deathfail1" type="checkbox" />
                                                            <input name="deathfail2" type="checkbox" />
                                                            <input name="deathfail3" type="checkbox" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section class="attacksandspellcasting">
                                        <div>
                                            <label>Attacks &amp; Spellcasting</label>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            Name
                                                        </th>
                                                        <th>
                                                            Atk Bonus
                                                        </th>
                                                        <th>
                                                            Damage/Type
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <input name="atkname1" type="text" />
                                                        </td>
                                                        <td>
                                                            <input name="atkbonus1" type="text" />
                                                        </td>
                                                        <td>
                                                            <input name="atkdamage1" type="text" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input name="atkname2" type="text" />
                                                        </td>
                                                        <td>
                                                            <input name="atkbonus2" type="text" />
                                                        </td>
                                                        <td>
                                                            <input name="atkdamage2" type="text" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input name="atkname3" type="text" />
                                                        </td>
                                                        <td>
                                                            <input name="atkbonus3" type="text" />
                                                        </td>
                                                        <td>
                                                            <input name="atkdamage3" type="text" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <textarea></textarea>
                                        </div>
                                    </section>
                                    <section class="equipment">
                                        <div>
                                            <label>Equipment</label>
                                            <div class="money">
                                                <ul>
                                                    <li>
                                                        <label for="cp">cp</label>
                                                        <input name="cp" />
                                                    </li>
                                                    <li>
                                                        <label for="sp">sp</label>
                                                        <input name="sp" />
                                                    </li>
                                                    <li>
                                                        <label for="ep">ep</label>
                                                        <input name="ep" />
                                                    </li>
                                                    <li>
                                                        <label for="gp">gp</label>
                                                        <input name="gp" />
                                                    </li>
                                                    <li>
                                                        <label for="pp">pp</label>
                                                        <input name="pp" />
                                                    </li>
                                                </ul>
                                            </div>
                                            <textarea placeholder="Equipment list here"></textarea>
                                        </div>
                                    </section>
                                </section>
                                <section>
                                    <section class="flavor">
                                        <div class="personality">
                                            <label for="personality">Personality</label>
                                            <textarea name="personality"></textarea>
                                        </div>
                                        <div class="ideals">
                                            <label for="ideals">Ideals</label>
                                            <textarea name="ideals"></textarea>
                                        </div>
                                        <div class="bonds">
                                            <label for="bonds">Bonds</label>
                                            <textarea name="bonds"></textarea>
                                        </div>
                                        <div class="flaws">
                                            <label for="flaws">Flaws</label>
                                            <textarea name="flaws"></textarea>
                                        </div>
                                    </section>
                                    <section class="features">
                                        <div>
                                            <label for="features">Features &amp; Traits</label>
                                            <textarea name="features"></textarea>
                                        </div>
                                    </section>
                                </section>
                            </main>
                        </form>
                    </div>
                    <!-- End Character Sheet -->
                </div>
                <div class="tab-pane fade" id="nav-char-2" role="tabpanel" aria-labelledby="nav-char-2-tab">
                    TODO adding and removing chars
                </div>
                <div class="tab-pane fade" id="nav-char-3" role="tabpanel" aria-labelledby="nav-char-3-tab">
                    TODO Handle multiple chars
                </div>
            </div>
        </div>
    </section>
</template> */
}
