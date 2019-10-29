// Type definitions for openrpg-libs
// Project: OpenRPG <https://openrpg.io>
// Definitions by: incomingstick <https://github.com/incomingstick>
declare module 'openrpg-libs' {
    class Die {}

    class ExpressionTree {
        constructor();

        set_expression(exp: string): void;
        parse_expression(): number;
    }
}
