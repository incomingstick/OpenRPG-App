import * as React from 'react';
import { Grid, Header } from 'semantic-ui-react';

export default class WelcomeScreen extends React.Component<any, any> {
  public render() {
    return (
      <Grid verticalAlign='middle' columns='2' centered container stretched>
        <Grid.Row stretched>
          <Grid.Column stretched textAlign='center'>
            <Header inverted>
              You should be here! Welcome to OpenRPG. We aren't quite working yet. Check back soon for more!
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

{
  /* <template class="section-template">
    <section id="welcome-section" class="section js-section">
        <div class="welcome-header">
            <h1>OpenRPG</h1>
            <h2>Your tabletop RPG workbench</h2>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="getting-started">
                        <h3>Start</h3>
                        <ul>
                            <li>
                                <a href="#">New Character</a>
                            </li>
                            <li>
                                <a href="#">Open Something...</a>
                            </li>
                            <li>
                                <a href="#">Import Something...</a>
                            </li>
                        </ul>
                    </div>
                    <div class="getting-started">
                        <h3>Recent</h3>
                        <ul>
                            <li>No recent stuff</li>
                        </ul>
                    </div>
                    <div class="getting-started">
                        <h3>Help</h3>
                        <ul>
                            <li>
                                <a href="#" target="_blank" id="docs">Documentation</a>
                            </li>
                            <li>
                                <a href="#" target="_blank" id="repo">Github Repository</a>
                            </li>
                            <li>
                                <a href="#" target="_blank" id="blog">Blog</a>
                            </li>

                            <script type="text/javascript">
                                document.getElementById("docs").href = pkginfo.website.docs;
                                document.getElementById("repo").href = pkginfo.repository.url;
                                document.getElementById("blog").href = pkginfo.website.blog;
                            </script>
                        </ul>
                    </div>
                </div>

                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <div class="homepage-utils">
                        <h3>Utilities</h3>
                        <ul>
                            <!-- TODO All of these should be collapsed when program starts -->
                            <li class="utils-panel">
                                <a href="#die-calculator" data-toggle="collapse" class="utility">
                                    <span class="fa fa-fw fa-plus"></span>
                                    Die Calculator
                                </a>
                                <div id="die-calculator" class="collapse">
                                    <form Name="calc" onsubmit="return false">
                                        <table id="calc" border=0>
                                            <tr>
                                                <td colspan=3>
                                                    <input id="calc-display" class="btn btn-rect" name="display" type="text">
                                                </td>
                                                <td>
                                                    <input class="btn btn-fill btn-rect" type=button value="C" onclick="calc.display.value=''" title="Clear">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input class="btn btn-fill btn-rect" type=button value="1" onclick="calc.display.value+='1'">
                                                </td>
                                                <td>
                                                    <input class="btn btn-fill btn-rect" type=button value="2" onclick="calc.display.value+='2'">
                                                </td>
                                                <td>
                                                    <input class="btn btn-fill btn-rect" type=button value="3" onclick="calc.display.value+='3'">
                                                </td>
                                                <td>
                                                    <input class="btn btn-fill btn-rect" type=button value="+" onclick="calc.display.value+='+'">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input class="btn btn-fill btn-rect" type=button value="4" onclick="calc.display.value+='4'">
                                                </td>
                                                <td>
                                                    <input class="btn btn-fill btn-rect" type=button value="5" onclick="calc.display.value+='5'">
                                                </td>
                                                <td>
                                                    <input class="btn btn-fill btn-rect" type=button value="6" onclick="calc.display.value+='6'">
                                                </td>
                                                <td>
                                                    <input class="btn btn-fill btn-rect" type=button value="-" onclick="calc.display.value+='-'">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input class="btn btn-fill btn-rect" type=button value="7" onclick="calc.display.value+='7'">
                                                </td>
                                                <td>
                                                    <input class="btn btn-fill btn-rect" type=button value="8" onclick="calc.display.value+='8'">
                                                </td>
                                                <td>
                                                    <input class="btn btn-fill btn-rect" type=button value="9" onclick="calc.display.value+='9'">
                                                </td>
                                                <td>
                                                    <input class="btn btn-fill btn-rect" type=button value="x" onclick="calc.display.value+='*'">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input class="btn btn-fill btn-rect" type=button value="d" onclick="calc.display.value+='d'" title="XdY">
                                                </td>
                                                <td>
                                                    <input class="btn btn-fill btn-rect" type=button value="0" onclick="calc.display.value+='0'">
                                                </td>
                                                <td>
                                                    <input id="calc-eval" class="btn btn-fill btn-rect" type=button value="=" onclick="calc.display.value=die_eval(calc.display.value)">
                                                </td>
                                                <td>
                                                    <input class="btn btn-fill btn-rect" type=button value="/" onclick="calc.display.value+='/'">
                                                </td>
                                            </tr>
                                        </table>
                                    </form>
                                </div>
                            </li>

                            <!-- TODO add name generator here -->
                            <li class="utils-panel">
                                <a href="#name-generator" data-toggle="collapse" class="utility">
                                    <span class="fa fa-fw fa-plus"></span>
                                    TODO Name Generator here
                                </a>
                                <div id="name-generator" class="collapse">
                                    <div class="inner-utility">
                                        Lorem ipsum dolor text....
                                    </div>
                                </div>
                            </li>

                            <!-- TODO Finish this
                                    - Ensure security of accepting label input
                                    - Allow adding more tags
                                    - Allow removing tags. Currently if a tag becomes empty it no longer allows  -->
                            <li class="utils-panel">
                                <a href="#initiative-helper" data-toggle="collapse" class="utility">
                                    <span class="fa fa-fw fa-plus"></span>
                                    TODO Initiative Helper here
                                </a>
                                <div id="initiative-helper" class="collapse">
                                    <ol class="inner-utility">
                                        <li id="li1" ondrop="swapDrop(event)" ondragover="allowDrop(event)">
                                            <div id="drag1" draggable="true" ondragstart="drag(event)" class="editable">Char 1</div>
                                        </li>
                                        <li id="li2" ondrop="swapDrop(event)" ondragover="allowDrop(event)">
                                            <div id="drag2" draggable="true" ondragstart="drag(event)" class="editable">Char 2</div>
                                        </li>
                                        <li id="li3" ondrop="swapDrop(event)" ondragover="allowDrop(event)">
                                            <div id="drag3" draggable="true" ondragstart="drag(event)" class="editable">Char 3</div>
                                        </li>
                                        <li id="li4" ondrop="swapDrop(event)" ondragover="allowDrop(event)">
                                            <div id="drag4" draggable="true" ondragstart="drag(event)" class="editable">Char 4</div>
                                        </li>
                                    </ol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template> */
}
