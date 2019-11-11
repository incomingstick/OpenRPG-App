/**
 * Type definitions for the openrpg-libs modules
 * 
 * Project: OpenRPG <https://openrpg.io>
 * Definitions by: incomingstick <https://github.com/incomingstick>
 **/
declare module 'openrpg-libs' {
    class Die {
        constructor(max: number);

        roll(): number;
    }

    class ExpressionTree {
        constructor();

        /**
         * @desc sets the input string to be scanned and parsed equal to the string exp
         * @param const std::string exp - the string to become the input string
         */
        set_expression(exp: string): boolean;

        /**
         * @desc parses the parse_node tree and returns the end result of the expression
         * @return int - the end result of the expression
         */
        parse_expression(): number;

        checked_sum(op1: number, op2: number): number;
        checked_multiplication(op1: number, op2: number): number;

        /**
         * @desc returns a string of the tree starting with
         *     the top node node and taking precidence over the left node
         * @return string - a string representation of the current tree
         */
        to_string(): string;

        static is_expression_valid(exp: string): boolean;
    }
}
