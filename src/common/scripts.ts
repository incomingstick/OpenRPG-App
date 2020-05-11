/**
 * Global script defintions for the OpenRPG App
 *
 * Project: OpenRPG <https://openrpg.io>
 * Definitions by: incomingstick <https://github.com/incomingstick>
 */
import { ExpressionTree } from 'openrpg-libs';

// Evaluate a die roll
export const die_eval = (exp: string) => {
    const parser = new ExpressionTree();

    if (parser.set_expression(exp)) {
        return parser.parse_expression();
    }

    return -1;
};

// Allow drag
export const start_drag = (event: any) => {
    if (event == null) return;
    event.dataTransfer.setData('src', event.target.id);

    return event;
};

// Allow drop
export const allow_drop = (event: any) => {
    if (event == null) return;

    event.preventDefault();
};

// Swap two items when dragged on top of
export const swap_drop = (event: any) => {
    if (event == null) return;

    event.preventDefault();
    const src = <HTMLElement>document.getElementById(event.dataTransfer.getData('src'));
    const srcParent = <Node & ParentNode>src.parentNode;
    const target = event.currentTarget.firstElementChild;

    event.currentTarget.replaceChild(src, target);
    srcParent.appendChild(target);
};
