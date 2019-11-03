import $ from 'jquery';
import * as libroll from 'openrpg-libs';

$(document).ready(() => {
    // change plus and minus for dropdown items
    $('a.utility').on('click', function(event) {
        const $me = $(this);
        const $childIcon = $me.find('.fa.fa-fw');

        $childIcon.toggleClass('fa-plus');
        $childIcon.toggleClass('fa-minus');

        return true;
    });

    // Allow use of enter/return key for calculator
    $('#calc-display').keypress((event) => {
        if (event.keyCode === 13) {
            $('#calc-eval').click();
        }
    });
});

// Evaluate a die roll
export function die_eval(exp: string) {
    const parser = new libroll.ExpressionTree();

    parser.set_expression(exp);

    return parser.parse_expression();
}

// Allow drag
export function start_drag(event: any) {
    if (event == null) return;
    event.dataTransfer.setData('src', event.target.id);

    return event;
}

// Allow drop
export function allow_drop(event: any) {
    if (event == null) return;

    event.preventDefault();
}

// Swap two items when dragged on top of
export function swap_drop(event: any) {
    if (event == null) return;

    event.preventDefault();
    const src = <HTMLElement>document.getElementById(event.dataTransfer.getData('src'));
    const srcParent = <Node & ParentNode>src.parentNode;
    const target = event.currentTarget.firstElementChild;

    event.currentTarget.replaceChild(src, target);
    srcParent.appendChild(target);
}

// Update the value of two swapped items
export function update_val(curr: Element, value: string) {
    curr.setAttribute('draggable', 'false');
    $(curr).html('<input class="editing" type="text" value="' + value + '" />');
    $('.editing').focus();
    $('.editing').keyup((event) => {
        if (event.keyCode === 13) {
            const editing = <String>$('.editing').val();
            $(curr).html(editing.trim());
            curr.setAttribute('draggable', 'true');
        }
    });

    $(document).click(() => {
        const toTrim = $('.editing');
        if (typeof toTrim.val() !== 'undefined') {
            const editing = <String>$('.editing').val();
            $(curr).html(editing.trim());
            curr.setAttribute('draggable', 'true');
            return;
        }
    });
}

// allow user to edit a div buy giving it the editable class
// TODO ensure you cannot inject malicious code here
$(document).ready(() => {
    $('div.editable').dblclick(function(event) {
        event.stopPropagation();
        const curr = this;
        const value = $(this).html();
        update_val(curr, value);
    });
});

// This code should open external links in the systems default browser
const shell = require('electron').shell;
// open links externally by default
$(document).on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    shell.openExternal(this.href);
});
