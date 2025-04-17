"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
var Todo = /** @class */ (function () {
    function Todo(_a) {
        var text = _a.text, complete = _a.complete;
        this.id = this.uuidv4();
        this.text = text;
        this.complete = complete || false;
    }
    Todo.prototype.uuidv4 = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return Todo;
}());
exports.Todo = Todo;
