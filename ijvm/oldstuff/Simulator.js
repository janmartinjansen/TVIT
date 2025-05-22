/* Generated from Java with JSweet 2.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 *
 * @author Jan Martin Jansen
 * @enum
 * @property {InstructionType} BIPUSH
 * @property {InstructionType} DUP
 * @property {InstructionType} GOTO
 * @property {InstructionType} IADD
 * @property {InstructionType} IMULT
 * @property {InstructionType} IDIV
 * @property {InstructionType} IAND
 * @property {InstructionType} IFEQ
 * @property {InstructionType} IFLT
 * @property {InstructionType} IF_ICMPEQ
 * @property {InstructionType} IINC
 * @property {InstructionType} ILOAD
 * @property {InstructionType} INVOKEVIRTUAL
 * @property {InstructionType} IOR
 * @property {InstructionType} IRETURN
 * @property {InstructionType} ISTORE
 * @property {InstructionType} ISUB
 * @property {InstructionType} LDC_W
 * @property {InstructionType} NOP
 * @property {InstructionType} POP
 * @property {InstructionType} SWAP
 * @property {InstructionType} WIDE
 * @property {InstructionType} PRINT
 * @property {InstructionType} PRINTSTACK
 * @property {InstructionType} PRINTMEM
 * @property {InstructionType} NEW
 * @property {InstructionType} FREE
 * @property {InstructionType} IASTORE
 * @property {InstructionType} IALOAD
 * @property {InstructionType} MEMDUMP
 * @property {InstructionType} STOP
 * @class
 */
var InstructionType;
(function (InstructionType) {
    InstructionType[InstructionType["BIPUSH"] = 0] = "BIPUSH";
    InstructionType[InstructionType["DUP"] = 1] = "DUP";
    InstructionType[InstructionType["GOTO"] = 2] = "GOTO";
    InstructionType[InstructionType["IADD"] = 3] = "IADD";
    InstructionType[InstructionType["IMULT"] = 4] = "IMULT";
    InstructionType[InstructionType["IDIV"] = 5] = "IDIV";
    InstructionType[InstructionType["IAND"] = 6] = "IAND";
    InstructionType[InstructionType["IFEQ"] = 7] = "IFEQ";
    InstructionType[InstructionType["IFLT"] = 8] = "IFLT";
    InstructionType[InstructionType["IF_ICMPEQ"] = 9] = "IF_ICMPEQ";
    InstructionType[InstructionType["IINC"] = 10] = "IINC";
    InstructionType[InstructionType["ILOAD"] = 11] = "ILOAD";
    InstructionType[InstructionType["INVOKEVIRTUAL"] = 12] = "INVOKEVIRTUAL";
    InstructionType[InstructionType["IOR"] = 13] = "IOR";
    InstructionType[InstructionType["IRETURN"] = 14] = "IRETURN";
    InstructionType[InstructionType["ISTORE"] = 15] = "ISTORE";
    InstructionType[InstructionType["ISUB"] = 16] = "ISUB";
    InstructionType[InstructionType["LDC_W"] = 17] = "LDC_W";
    InstructionType[InstructionType["NOP"] = 18] = "NOP";
    InstructionType[InstructionType["POP"] = 19] = "POP";
    InstructionType[InstructionType["SWAP"] = 20] = "SWAP";
    InstructionType[InstructionType["WIDE"] = 21] = "WIDE";
    InstructionType[InstructionType["PRINT"] = 22] = "PRINT";
    InstructionType[InstructionType["PRINTSTACK"] = 23] = "PRINTSTACK";
    InstructionType[InstructionType["PRINTMEM"] = 24] = "PRINTMEM";
    InstructionType[InstructionType["NEW"] = 25] = "NEW";
    InstructionType[InstructionType["FREE"] = 26] = "FREE";
    InstructionType[InstructionType["IASTORE"] = 27] = "IASTORE";
    InstructionType[InstructionType["IALOAD"] = 28] = "IALOAD";
    InstructionType[InstructionType["MEMDUMP"] = 29] = "MEMDUMP";
    InstructionType[InstructionType["STOP"] = 30] = "STOP";
})(InstructionType || (InstructionType = {}));
var Instruction = (function () {
    function Instruction(oc, a0, a1, a2) {
        var _this = this;
        if (((typeof oc === 'number') || oc === null) && ((typeof a0 === 'number') || a0 === null) && ((typeof a1 === 'number') || a1 === null) && ((typeof a2 === 'number') || a2 === null)) {
            var __args = arguments;
            if (this.opcode === undefined)
                this.opcode = null;
            if (this.arg0 === undefined)
                this.arg0 = 0;
            if (this.arg1 === undefined)
                this.arg1 = 0;
            if (this.arg2 === undefined)
                this.arg2 = 0;
            if (this.position === undefined)
                this.position = 0;
            if (this.opcode === undefined)
                this.opcode = null;
            if (this.arg0 === undefined)
                this.arg0 = 0;
            if (this.arg1 === undefined)
                this.arg1 = 0;
            if (this.arg2 === undefined)
                this.arg2 = 0;
            if (this.position === undefined)
                this.position = 0;
            (function () {
                _this.opcode = oc;
                _this.arg0 = a0;
                _this.arg1 = a1;
                _this.arg2 = a2;
            })();
        }
        else if (((typeof oc === 'number') || oc === null) && ((typeof a0 === 'number') || a0 === null) && ((typeof a1 === 'number') || a1 === null) && a2 === undefined) {
            var __args = arguments;
            if (this.opcode === undefined)
                this.opcode = null;
            if (this.arg0 === undefined)
                this.arg0 = 0;
            if (this.arg1 === undefined)
                this.arg1 = 0;
            if (this.arg2 === undefined)
                this.arg2 = 0;
            if (this.position === undefined)
                this.position = 0;
            if (this.opcode === undefined)
                this.opcode = null;
            if (this.arg0 === undefined)
                this.arg0 = 0;
            if (this.arg1 === undefined)
                this.arg1 = 0;
            if (this.arg2 === undefined)
                this.arg2 = 0;
            if (this.position === undefined)
                this.position = 0;
            (function () {
                _this.opcode = oc;
                _this.arg0 = a0;
                _this.arg1 = a1;
            })();
        }
        else if (((typeof oc === 'number') || oc === null) && ((typeof a0 === 'number') || a0 === null) && a1 === undefined && a2 === undefined) {
            var __args = arguments;
            if (this.opcode === undefined)
                this.opcode = null;
            if (this.arg0 === undefined)
                this.arg0 = 0;
            if (this.arg1 === undefined)
                this.arg1 = 0;
            if (this.arg2 === undefined)
                this.arg2 = 0;
            if (this.position === undefined)
                this.position = 0;
            if (this.opcode === undefined)
                this.opcode = null;
            if (this.arg0 === undefined)
                this.arg0 = 0;
            if (this.arg1 === undefined)
                this.arg1 = 0;
            if (this.arg2 === undefined)
                this.arg2 = 0;
            if (this.position === undefined)
                this.position = 0;
            (function () {
                _this.opcode = oc;
                _this.arg0 = a0;
            })();
        }
        else if (((typeof oc === 'number') || oc === null) && a0 === undefined && a1 === undefined && a2 === undefined) {
            var __args = arguments;
            if (this.opcode === undefined)
                this.opcode = null;
            if (this.arg0 === undefined)
                this.arg0 = 0;
            if (this.arg1 === undefined)
                this.arg1 = 0;
            if (this.arg2 === undefined)
                this.arg2 = 0;
            if (this.position === undefined)
                this.position = 0;
            if (this.opcode === undefined)
                this.opcode = null;
            if (this.arg0 === undefined)
                this.arg0 = 0;
            if (this.arg1 === undefined)
                this.arg1 = 0;
            if (this.arg2 === undefined)
                this.arg2 = 0;
            if (this.position === undefined)
                this.position = 0;
            (function () {
                _this.opcode = oc;
            })();
        }
        else
            throw new Error('invalid overload');
    }
    Instruction.prototype.setPosition = function (pos) {
        this.position = pos;
    };
    Instruction.initMap = function () {
        Instruction.instructions = ({});
        {
            var array7919 = function () { var result = []; for (var val in InstructionType) {
                if (!isNaN(val)) {
                    result.push(parseInt(val, 10));
                }
            } return result; }();
            for (var index7918 = 0; index7918 < array7919.length; index7918++) {
                var ins = array7919[index7918];
                {
                    /* put */ (Instruction.instructions[InstructionType[ins]] = ins);
                }
            }
        }
    };
    Instruction.prototype.print = function () {
       switch ((this.opcode)) {
           case InstructionType.DUP:
           case InstructionType.IADD:
           case InstructionType.IMULT:
           case InstructionType.IDIV:
           case InstructionType.IAND:
           case InstructionType.IOR:
           case InstructionType.IRETURN:
           case InstructionType.ISUB:
           case InstructionType.NOP:
           case InstructionType.POP:
           case InstructionType.SWAP:
           case InstructionType.WIDE:
           case InstructionType.PRINT:
           case InstructionType.PRINTSTACK:
           case InstructionType.PRINTMEM:
           case InstructionType.NEW:
           case InstructionType.FREE:
           case InstructionType.IASTORE:
           case InstructionType.IALOAD:
           case InstructionType.STOP:
               return InstructionType[this.opcode];
           case InstructionType.BIPUSH:
           case InstructionType.GOTO:
           case InstructionType.IFEQ:
           case InstructionType.IFLT:
           case InstructionType.IF_ICMPEQ:
           case InstructionType.ILOAD:
           case InstructionType.ISTORE:
           case InstructionType.LDC_W:
               return InstructionType[this.opcode] + ' '+ this.arg0;
           case InstructionType.IINC:
           case InstructionType.MEMDUMP:
               return InstructionType[this.opcode] + ' '+ this.arg0 + ' ' + this.arg1;
           case InstructionType.INVOKEVIRTUAL:
               return InstructionType[this.opcode] + ' ' + this.arg0 + ' ' + this.arg1 + ' ' + this.arg2;
           default:
               return InstructionType[this.opcode];
       }
   };

    return Instruction;
}());
Instruction.instructions = null;
Instruction["__class"] = "Instruction";
var MemRec = (function () {
    function MemRec(start, end, free) {
        var _this = this;
        if (((typeof start === 'number') || start === null) && ((typeof end === 'number') || end === null) && ((typeof free === 'boolean') || free === null)) {
            var __args = arguments;
            if (this.start === undefined)
                this.start = 0;
            if (this.end === undefined)
                this.end = 0;
            if (this.free === undefined)
                this.free = false;
            if (this.start === undefined)
                this.start = 0;
            if (this.end === undefined)
                this.end = 0;
            if (this.free === undefined)
                this.free = false;
            (function () {
                _this.start = start;
                _this.end = end;
                _this.free = free;
            })();
        }
        else if (((typeof start === 'number') || start === null) && ((typeof end === 'number') || end === null) && free === undefined) {
            var __args = arguments;
            if (this.start === undefined)
                this.start = 0;
            if (this.end === undefined)
                this.end = 0;
            if (this.free === undefined)
                this.free = false;
            if (this.start === undefined)
                this.start = 0;
            if (this.end === undefined)
                this.end = 0;
            if (this.free === undefined)
                this.free = false;
            (function () {
                _this.start = start;
                _this.end = end;
                _this.free = false;
            })();
        }
        else
            throw new Error('invalid overload');
    }
    return MemRec;
}());
MemRec["__class"] = "MemRec";
var Simulator = (function () {
    function Simulator(mem_size, stack_size, prog_size) {
        if (this.program === undefined)
            this.program = null;
        if (this.stack === undefined)
            this.stack = null;
        if (this.mem === undefined)
            this.mem = null;
        if (this.constant_pool === undefined)
            this.constant_pool = null;
        if (this.labels === undefined)
            this.labels = null;
        if (this.pc === undefined)
            this.pc = 0;
        if (this.sp === undefined)
            this.sp = 0;
        if (this.lv === undefined)
            this.lv = 0;
        if (this.aux === undefined)
            this.aux = 0;
        if (this.mem_size === undefined)
            this.mem_size = 0;
        if (this.mem_admin === undefined)
            this.mem_admin = null;
        this.program = (function (s) { var a = []; while (s-- > 0)
            a.push(null); return a; })(prog_size);
        this.stack = (function (s) { var a = []; while (s-- > 0)
            a.push(0); return a; })(stack_size);
        this.mem_size = mem_size;
        this.mem = (function (s) { var a = []; while (s-- > 0)
            a.push(0); return a; })(mem_size);
        this.labels = (function (s) { var a = []; while (s-- > 0)
            a.push(0); return a; })(100);
        for (var k = 0; k < this.labels.length; k++) {
            this.labels[k] = -1;
        }
        Instruction.initMap();
        this.mem_admin = ([]);
        /* add */ (this.mem_admin.push(new MemRec(0, mem_size, true)) > 0);
    }
    Simulator.prototype.newMem = function (size) {
        var iter = (function (a) { var i = 0; return { next: function () { return i < a.length ? a[i++] : null; }, hasNext: function () { return i < a.length; } }; })(this.mem_admin);
        while ((iter.hasNext())) {
            {
                var cur = iter.next();
                if (cur.free && (cur.end - cur.start >= size-1)) {
                        var res = cur.start + 1;
                        this.mem[cur.start] = size;
                        console.log('new mem at ' + cur.start+1);
                        cur.start = cur.start + size+1;
                        return res;
                }
            }
        }
        ;
        throw Object.defineProperty(new Error("out of memory!"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.Exception'] });
    };
    Simulator.prototype.cleanUpMem = function (iter, mr) {
        var next_not_removed = false;
        if (iter.hasNext()) {
            var next = iter.next();
            if (next.free) {
                mr.end = next.end;
                iter.remove();
            }
            else
                next_not_removed = true;
        }
        iter.previous();
        if (next_not_removed)
            iter.previous();
        if (iter.hasPrevious()) {
            var prev = iter.previous();
            if (prev.free) {
                mr.start = prev.start;
                iter.remove();
            }
        }
    };
    Simulator.prototype.freeMem = function (location) {
        var iter = (function (a) { var i = 0; return { next: function () { return i < a.length ? a[i++] : null; }, hasNext: function () { return i < a.length; } }; })(this.mem_admin);
        while ((iter.hasNext())) {
            {
                var cur = iter.next();
                if (cur.start === location && !cur.free) {
                    cur.free = true;
                    this.cleanUpMem(iter, cur);
                    return;
                }
            }
        }
        ;
        throw Object.defineProperty(new Error("invalid memory location!"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.Exception'] });
    };
    Simulator.prototype.printStack = function () {
        Printer.print("[");
        for (var i = 0; i <= this.sp; i++) {
            Printer.print(this.stack[i] + " ");
        }
        Printer.println("]");
    };
    Simulator.prototype.getStack = function () {
        var res = "[";
        for (var i = 0; i <= this.sp; i++) {
            res += this.stack[i] + " ";
        }
        res += "]";
        return res;
    };
    Simulator.prototype.memDump = function (low, up) {
        res = "mem[";
        for (var i = low; i < up; i++) {
            res += this.mem[i] + " ";
        }
        Printer.println(res + "]");
    };
    Simulator.prototype.printMemAdmin = function () {
        Printer.print("[");
        for (var index7920 = 0; index7920 < this.mem_admin.length; index7920++) {
            var mr = this.mem_admin[index7920];
            {
                Printer.print("from " + mr.start + " to " + mr.end + " is " + mr.free + " | ");
            }
        }
        Printer.println("]");
    };
    Simulator.prototype.getPC = function () {
        return this.pc;
    };
    Simulator.prototype.run = function () {
        this.pc = 0;
        this.sp = -1;
        this.lv = 0;
        var stop = false;
        var current;
        while ((!stop)) {
            {
                current = this.program[this.pc++];
                switch ((current.opcode)) {
                    case InstructionType.BIPUSH:
                        this.stack[++this.sp] = current.arg0;
                        break;
                    case InstructionType.DUP:
                        this.stack[this.sp + 1] = this.stack[this.sp];
                        this.sp++;
                        break;
                    case InstructionType.GOTO:
                        this.pc = this.pc + current.arg0 - 1;
                        break;
                    case InstructionType.IADD:
                        this.stack[this.sp - 1] = this.stack[this.sp - 1] + this.stack[this.sp];
                        this.sp--;
                        break;
                    case InstructionType.IMULT:
                        this.stack[this.sp - 1] = this.stack[this.sp - 1] * this.stack[this.sp];
                        this.sp--;
                        break;
                    case InstructionType.IDIV:
                        this.stack[this.sp - 1] = (this.stack[this.sp - 1] / this.stack[this.sp] | 0);
                        this.sp--;
                        break;
                    case InstructionType.IAND:
                        this.stack[this.sp - 1] = this.stack[this.sp - 1] & this.stack[this.sp];
                        this.sp--;
                        break;
                    case InstructionType.IFEQ:
                        if (this.stack[this.sp--] === 0) {
                            this.pc = this.pc + current.arg0 - 1;
                        }
                        break;
                    case InstructionType.IFLT:
                        if (this.stack[this.sp--] < 0) {
                            this.pc = this.pc + current.arg0 - 1;
                        }
                        break;
                    case InstructionType.IF_ICMPEQ:
                        if (this.stack[this.sp - 1] === this.stack[this.sp]) {
                            this.pc = this.pc + current.arg0 - 1;
                        }
                        this.sp -= 2;
                        break;
                    case InstructionType.IINC:
                        this.stack[this.lv + current.arg0] += current.arg1;
                        break;
                    case InstructionType.MEMDUMP:
                        this.memDump(current.arg0, current.arg1);
                        break;
                    case InstructionType.ILOAD:
                        this.stack[++this.sp] = this.stack[this.lv + current.arg0];
                        break;
                    case InstructionType.INVOKEVIRTUAL:
                        this.aux = this.lv;
                        this.lv = this.sp - current.arg0 + 1;
                        this.sp = this.sp + current.arg1;
                        this.stack[++this.sp] = this.pc;
                        this.stack[++this.sp] = this.aux;
                        this.pc = current.arg2;
                        break;
                    case InstructionType.IOR:
                        this.stack[this.sp - 1] = this.stack[this.sp - 1] | this.stack[this.sp];
                        this.sp--;
                        break;
                    case InstructionType.IRETURN:
                        this.aux = this.lv;
                        this.lv = this.stack[this.sp - 1];
                        this.pc = this.stack[this.sp - 2];
                        this.stack[this.aux] = this.stack[this.sp];
                        this.sp = this.aux;
                        break;
                    case InstructionType.ISTORE:
                        this.stack[this.lv + current.arg0] = this.stack[this.sp--];
                        break;
                    case InstructionType.ISUB:
                        this.stack[this.sp - 1] = this.stack[this.sp - 1] - this.stack[this.sp];
                        this.sp--;
                        break;
                    case InstructionType.LDC_W:
                        this.stack[++this.sp] = this.constant_pool[current.arg0];
                        break;
                    case InstructionType.NOP:
                        break;
                    case InstructionType.POP:
                        --this.sp;
                        break;
                    case InstructionType.SWAP:
                        this.aux = this.stack[this.sp];
                        this.stack[this.sp] = this.stack[this.sp - 1];
                        this.stack[this.sp - 1] = this.aux;
                        break;
                    case InstructionType.WIDE:
                        break;
                    case InstructionType.PRINT:
                        Printer.println("Top of stack: " + this.stack[this.sp--]);
                        break;
                    case InstructionType.PRINTSTACK:
                        Printer.print("Stack: " + this.getStack());
                        //this.printStack();
                        break;
                    case InstructionType.PRINTMEM:
                        //this.printMemAdmin();
                        var st = this.stack[this.sp--];
                        var end = st + this.mem[st-1];
                        this.memDump(st,end);
                        break;
                    case InstructionType.NEW:
                        this.stack[this.sp] = this.newMem(this.stack[this.sp]);
                        break;
                    case InstructionType.FREE:
                        this.freeMem(this.stack[this.sp--]);
                        break;
                    case InstructionType.IALOAD:
                        this.stack[this.sp - 1] = this.mem[this.stack[this.sp - 1] + this.stack[this.sp]];
                        this.sp--;
                        break;
                    case InstructionType.IASTORE:
                        this.mem[this.stack[this.sp] + this.stack[this.sp - 1]] = this.stack[this.sp - 2];
                        this.sp -= 3;
                        break;
                    case InstructionType.STOP:
                        stop = true;
                        break;
                }
            }
        }
        ;
    };
    Simulator.prototype.step = function () {
        var current;
        current = this.program[this.pc++];
        //console.log('current: ' + current.print());
        switch ((current.opcode)) {
            case InstructionType.BIPUSH:
                this.stack[++this.sp] = current.arg0;
                break;
            case InstructionType.DUP:
                this.stack[this.sp + 1] = this.stack[this.sp];
                this.sp++;
                break;
            case InstructionType.GOTO:
                this.pc = this.pc + current.arg0 - 1;
                break;
            case InstructionType.IADD:
                this.stack[this.sp - 1] = this.stack[this.sp - 1] + this.stack[this.sp];
                this.sp--;
                break;
            case InstructionType.IMULT:
                this.stack[this.sp - 1] = this.stack[this.sp - 1] * this.stack[this.sp];
                this.sp--;
                break;
            case InstructionType.IDIV:
                this.stack[this.sp - 1] = (this.stack[this.sp - 1] / this.stack[this.sp] | 0);
                this.sp--;
                break;
            case InstructionType.IAND:
                this.stack[this.sp - 1] = this.stack[this.sp - 1] & this.stack[this.sp];
                this.sp--;
                break;
            case InstructionType.IFEQ:
                if (this.stack[this.sp--] === 0) {
                    this.pc = this.pc + current.arg0 - 1;
                }
                break;
            case InstructionType.IFLT:
                if (this.stack[this.sp--] < 0) {
                    this.pc = this.pc + current.arg0 - 1;
                }
                break;
            case InstructionType.IF_ICMPEQ:
                if (this.stack[this.sp - 1] === this.stack[this.sp]) {
                    this.pc = this.pc + current.arg0 - 1;
                }
                this.sp -= 2;
                break;
            case InstructionType.IINC:
                this.stack[this.lv + current.arg0] += current.arg1;
                break;
            case InstructionType.MEMDUMP:
                this.memDump(current.arg0, current.arg1);
                break;
            case InstructionType.ILOAD:
                this.stack[++this.sp] = this.stack[this.lv + current.arg0];
                break;
            case InstructionType.INVOKEVIRTUAL: //console.log('do call ' + current.arg0 + ' ' +  + current.arg1 + ' ' + current.arg2 + ' ')
                this.aux = this.lv;
                this.lv = this.sp - current.arg0 + 1;
                this.sp = this.sp + current.arg1;
                this.stack[++this.sp] = this.pc;
                this.stack[++this.sp] = this.aux;
                this.pc = current.arg2;
            //    console.log("call to " + this.pc)
                break;
            case InstructionType.IOR:
                this.stack[this.sp - 1] = this.stack[this.sp - 1] | this.stack[this.sp];
                this.sp--;
                break;
            case InstructionType.IRETURN:
                this.aux = this.lv;
                this.lv = this.stack[this.sp - 1];
                this.pc = this.stack[this.sp - 2];
                this.stack[this.aux] = this.stack[this.sp];
                this.sp = this.aux;
                break;
            case InstructionType.ISTORE:
                this.stack[this.lv + current.arg0] = this.stack[this.sp--];
                break;
            case InstructionType.ISUB:
                this.stack[this.sp - 1] = this.stack[this.sp - 1] - this.stack[this.sp];
                this.sp--;
                break;
            case InstructionType.LDC_W:
                this.stack[++this.sp] = this.constant_pool[current.arg0];
                break;
            case InstructionType.NOP:
                break;
            case InstructionType.POP:
                --this.sp;
                break;
            case InstructionType.SWAP:
                this.aux = this.stack[this.sp];
                this.stack[this.sp] = this.stack[this.sp - 1];
                this.stack[this.sp - 1] = this.aux;
                break;
            case InstructionType.WIDE:
                break;
            case InstructionType.PRINT:
                Printer.println("Top of stack: " + this.stack[this.sp--]);
                break;
            case InstructionType.PRINTSTACK:
                 Printer.print("Stack: " + this.getStack());
                //this.printStack();
                break;
            case InstructionType.PRINTMEM:
            //this.printMemAdmin();
                var st = this.stack[this.sp--];
                var end = st + this.mem[st-1];
                this.memDump(st,end);
                break;
            case InstructionType.NEW:
                this.stack[this.sp] = this.newMem(this.stack[this.sp]);
                break;
            case InstructionType.FREE:
                this.freeMem(this.stack[this.sp--]);
                break;
            case InstructionType.IALOAD:
                this.stack[this.sp - 1] = this.mem[this.stack[this.sp - 1] + this.stack[this.sp]];
                this.sp--;
                break;
            case InstructionType.IASTORE:
                this.mem[this.stack[this.sp] + this.stack[this.sp - 1]] = this.stack[this.sp - 2];
                this.sp -= 3;
                break;
            case InstructionType.STOP:
                return true;
        }
        return false;
    };
    Simulator.prototype.init = function () {
        this.pc = 0;
        this.sp = -1;
        this.lv = 0;
    };
    Simulator.prototype.readProgram = function (prog) {
        var k = 0;
        try {
            var tkn = new Tokenizer(prog);
            while ((tkn.gettoken())) {
                {
                    switch ((tkn.tokentype)) {
                        case Tokenizer.Iden:
                            var instr = tkn.tokenstring.toUpperCase();
                            var type = (function (m, k) { return m[k] === undefined ? null : m[k]; })(Instruction.instructions, instr);
                            if (type == null)
                                throw Object.defineProperty(new Error("unknown instruction: " + instr), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.Exception'] });
                            this.program[k++] = this.makeInstruction(type, tkn);
                            break;
                        default:
                            throw Object.defineProperty(new Error("unexpected value:" + tkn.tokenval), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.Exception'] });
                    }
                }
            }
            ;
            this.program[k++] = new Instruction(InstructionType.STOP);
            Printer.println("number of instruction read: " + k);
        }
        catch (ex) {
            Main.print("error: " + ex);
        }
        ;
    };
    Simulator.prototype.readProgramLabels = function (prog) {
        var k = 0;
        try {
            var tkn = new Tokenizer(prog);
            while ((tkn.gettoken())) {
                {
                    switch ((tkn.tokentype)) {
                        case Tokenizer.Iden:
                            var instr = tkn.tokenstring.toUpperCase();
                            var type = void 0;
                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(instr, "CALL"))
                                instr = "INVOKEVIRTUAL";
                            type = (function (m, k) { return m[k] === undefined ? null : m[k]; })(Instruction.instructions, instr);
                            if (type == null)
                                throw Object.defineProperty(new Error("unknown instruction: " + instr), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.Exception'] });
                            this.program[k++] = this.makeInstruction(type, tkn);
                            break;
                        case Tokenizer.Num:
                            this.labels[tkn.tokenval] = k;
                            //console.log('set label ' + tkn.tokenval + ' val ' + k);
                            break;
                        default: console.log('unexpected!!!!')
                            //throw Object.defineProperty(new Error("unexpected value:" + tkn.tokenval), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.Exception'] });
                    }
                }
            }
            ;
            this.program[k++] = new Instruction(InstructionType.STOP);
            for (var i = 0; i < k; i++) {
                {
                    var instr = this.program[i];
                  //  console.log(instr.print());
                    switch ((instr.opcode)) {
                        case InstructionType.GOTO:
                        case InstructionType.IFEQ:
                        case InstructionType.IFLT:
                        case InstructionType.IF_ICMPEQ:
                            if (this.labels[instr.arg0] < 0)
                                throw Object.defineProperty(new Error("unknown label: " + instr.arg0), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.Exception'] });
                            instr.arg0 = this.labels[instr.arg0] - i;
                            break;
                        case InstructionType.INVOKEVIRTUAL:
                            if (this.labels[instr.arg2] < 0)
                                throw Object.defineProperty(new Error("unknown label: " + instr.arg2), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.Exception'] });
                            instr.arg2 = this.labels[instr.arg2];
                            break;
                    }
            //        console.log(instr.print());
                }
                ;
            }
        }
        catch (ex) {
            Main.print("error: " + ex);
        }
        ;
    };
    /*private*/ Simulator.prototype.makeInstruction = function (type, tkn) {
        var arg0;
        var arg1;
        var arg2;
        switch ((type)) {
            case InstructionType.DUP:
            case InstructionType.IADD:
            case InstructionType.IMULT:
            case InstructionType.IDIV:
            case InstructionType.IAND:
            case InstructionType.IOR:
            case InstructionType.IRETURN:
            case InstructionType.ISUB:
            case InstructionType.NOP:
            case InstructionType.POP:
            case InstructionType.SWAP:
            case InstructionType.WIDE:
            case InstructionType.PRINT:
            case InstructionType.PRINTSTACK:
            case InstructionType.PRINTMEM:
            case InstructionType.NEW:
            case InstructionType.FREE:
            case InstructionType.IASTORE:
            case InstructionType.IALOAD:
            case InstructionType.STOP:
                return new Instruction(type);
            case InstructionType.BIPUSH:
            case InstructionType.GOTO:
            case InstructionType.IFEQ:
            case InstructionType.IFLT:
            case InstructionType.IF_ICMPEQ:
            case InstructionType.ILOAD:
            case InstructionType.ISTORE:
            case InstructionType.LDC_W:
                tkn.gettoken();
                if (tkn.tokentype !== Tokenizer.Num)
                    throw Object.defineProperty(new Error("int expected "), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.Exception'] });
                arg0 = tkn.tokenval;
                return new Instruction(type, arg0);
            case InstructionType.IINC:
            case InstructionType.MEMDUMP:
                tkn.gettoken();
                if (tkn.tokentype !== Tokenizer.Num)
                    throw Object.defineProperty(new Error("int expected"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.Exception'] });
                arg0 = tkn.tokenval;
                tkn.gettoken();
                if (tkn.tokentype !== Tokenizer.Num)
                    throw Object.defineProperty(new Error("int expected"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.Exception'] });
                arg1 = tkn.tokenval;
                return new Instruction(type, arg0, arg1);
            case InstructionType.INVOKEVIRTUAL:
                tkn.gettoken();
                if (tkn.tokentype !== Tokenizer.Num)
                    throw Object.defineProperty(new Error("int expected"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.Exception'] });
                arg0 = tkn.tokenval;
                tkn.gettoken();
                if (tkn.tokentype !== Tokenizer.Num)
                    throw Object.defineProperty(new Error("int expected"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.Exception'] });
                arg1 = tkn.tokenval;
                tkn.gettoken();
                if (tkn.tokentype !== Tokenizer.Num)
                    throw Object.defineProperty(new Error("int expected"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.Exception'] });
                arg2 = tkn.tokenval;
              //  console.log('call ' + arg0 + ' ' + arg1 + ' ' + arg2 )
                return new Instruction(type, arg0, arg1, arg2);
            default:
                return new Instruction(InstructionType.NOP);
        }
    };
    return Simulator;
}());
Simulator["__class"] = "Simulator";
var Tokenizer = (function () {
    function Tokenizer(input) {
        var _this = this;
        this.stop = -1;
        this.current_string = 0;
        this.nlkar = ('\n').charCodeAt(0);
        this.tokname = ["RightArrow", "IdNum", "Lpar", "Rpar", "LSpar", "NewLine", "SString", "Char", "Iden", "Num", "Eq", "Dot", "BackSlash", "Minus", "Eof"];
        if (((typeof input === 'string') || input === null)) {
            var __args = arguments;
            if (this.tokentype === undefined)
                this.tokentype = 0;
            if (this.tokenchar === undefined)
                this.tokenchar = 0;
            if (this.tokenbuf === undefined)
                this.tokenbuf = null;
            if (this.tokenval === undefined)
                this.tokenval = 0;
            if (this.tokenstring === undefined)
                this.tokenstring = null;
            if (this["in"] === undefined)
                this["in"] = null;
            if (this.curpos === undefined)
                this.curpos = 0;
            if (this.mark === undefined)
                this.mark = 0;
            if (this.len === undefined)
                this.len = 0;
            if (this.indent === undefined)
                this.indent = 0;
            if (this.previndent === undefined)
                this.previndent = 0;
            if (this.line === undefined)
                this.line = 0;
            this.stop = -1;
            this.current_string = 0;
            this.nlkar = ('\n').charCodeAt(0);
            this.tokname = ["RightArrow", "IdNum", "Lpar", "Rpar", "LSpar", "NewLine", "SString", "Char", "Iden", "Num", "Eq", "Dot", "BackSlash", "Minus", "Eof"];
            if (this.tokentype === undefined)
                this.tokentype = 0;
            if (this.tokenchar === undefined)
                this.tokenchar = 0;
            if (this.tokenbuf === undefined)
                this.tokenbuf = null;
            if (this.tokenval === undefined)
                this.tokenval = 0;
            if (this.tokenstring === undefined)
                this.tokenstring = null;
            if (this["in"] === undefined)
                this["in"] = null;
            if (this.curpos === undefined)
                this.curpos = 0;
            if (this.mark === undefined)
                this.mark = 0;
            if (this.len === undefined)
                this.len = 0;
            if (this.indent === undefined)
                this.indent = 0;
            if (this.previndent === undefined)
                this.previndent = 0;
            if (this.line === undefined)
                this.line = 0;
            (function () {
                _this.tokenbuf = { str: "", toString: function () { return this.str; } };
                _this.readString(input);
            })();
        }
        else if (input === undefined) {
            var __args = arguments;
            if (this.tokentype === undefined)
                this.tokentype = 0;
            if (this.tokenchar === undefined)
                this.tokenchar = 0;
            if (this.tokenbuf === undefined)
                this.tokenbuf = null;
            if (this.tokenval === undefined)
                this.tokenval = 0;
            if (this.tokenstring === undefined)
                this.tokenstring = null;
            if (this["in"] === undefined)
                this["in"] = null;
            if (this.curpos === undefined)
                this.curpos = 0;
            if (this.mark === undefined)
                this.mark = 0;
            if (this.len === undefined)
                this.len = 0;
            if (this.indent === undefined)
                this.indent = 0;
            if (this.previndent === undefined)
                this.previndent = 0;
            if (this.line === undefined)
                this.line = 0;
            this.stop = -1;
            this.current_string = 0;
            this.nlkar = ('\n').charCodeAt(0);
            this.tokname = ["RightArrow", "IdNum", "Lpar", "Rpar", "LSpar", "NewLine", "SString", "Char", "Iden", "Num", "Eq", "Dot", "BackSlash", "Minus", "Eof"];
            if (this.tokentype === undefined)
                this.tokentype = 0;
            if (this.tokenchar === undefined)
                this.tokenchar = 0;
            if (this.tokenbuf === undefined)
                this.tokenbuf = null;
            if (this.tokenval === undefined)
                this.tokenval = 0;
            if (this.tokenstring === undefined)
                this.tokenstring = null;
            if (this["in"] === undefined)
                this["in"] = null;
            if (this.curpos === undefined)
                this.curpos = 0;
            if (this.mark === undefined)
                this.mark = 0;
            if (this.len === undefined)
                this.len = 0;
            if (this.indent === undefined)
                this.indent = 0;
            if (this.previndent === undefined)
                this.previndent = 0;
            if (this.line === undefined)
                this.line = 0;
            (function () {
                _this.tokenbuf = { str: "", toString: function () { return this.str; } };
            })();
        }
        else
            throw new Error('invalid overload');
    }
    Tokenizer.prototype.readString = function (input) {
        this.line = 0;
        this.indent = 0;
        this["in"] = input;
        this.curpos = 0;
        this.mark = 0;
        this.len = this["in"].length;
        this.nlkar = ('\n').charCodeAt(0);
    };
    Tokenizer.prototype.skipspace = function (__in) {
        var ch;
        var isblank = false;
        this.mark = this.curpos;
        while ((this.curpos < this.len && ((ch = (__in.charAt(this.curpos++)).charCodeAt(0)) == ' '.charCodeAt(0) || ch == '\n'.charCodeAt(0) || ch == '\t'.charCodeAt(0)))) {
            {
                isblank = true;
            }
        }
        ;
        if (this.curpos < this.len)
            this.curpos--;
        return isblank;
    };
    Tokenizer.prototype.getkar = function (__in) {
        this.mark = this.curpos;
        if (this.curpos === this.len)
            return -1;
        var c = (__in.charAt(this.curpos++)).charCodeAt(0);
        if (c === this.nlkar) {
            this.line++;
            this.previndent = this.indent;
            this.indent = 0;
        }
        else
            this.indent++;
        return c;
    };
    Tokenizer.prototype.ungetkar = function (__in, c) {
        if (c === this.nlkar) {
            this.line--;
            this.indent = this.previndent;
        }
        else
            this.indent--;
        this.curpos = this.mark;
    };
    Tokenizer.prototype.readChar = function (__in) {
        var c;
        this.getkar(__in);
        if ((c = this.getkar(__in)) == '\\'.charCodeAt(0)) {
            switch ((c = this.getkar(__in))) {
                case 110 /* 'n' */:
                    c = ('\n').charCodeAt(0);
                    break;
                case 116 /* 't' */:
                    c = ('\t').charCodeAt(0);
                    break;
                case 92 /* '\\' */:
                    c = ('\\').charCodeAt(0);
                    break;
                case 34 /* '\"' */:
                    c = ('\"').charCodeAt(0);
                    break;
                case 39 /* '\'' */:
                    c = ('\'').charCodeAt(0);
                    break;
            }
        }
        this.tokenchar = c;
        this.tokentype = Tokenizer.Char;
        c = this.getkar(__in);
        if (c != '\''.charCodeAt(0)) {
            this.perror("\' expected");
        }
    };
    Tokenizer.prototype.readStringS = function (__in) {
        var c;
        this.getkar(__in);
        while (((c = this.getkar(__in)) != '\"'.charCodeAt(0))) {
            {
                if (c == '\n'.charCodeAt(0)) {
                    Printer.print("\" expected\n");
                }
                else if (c == '\\'.charCodeAt(0))
                    switch ((c = this.getkar(__in))) {
                        case 110 /* 'n' */:
                            /* append */ (function (sb) { sb.str = sb.str.concat('\n'); return sb; })(this.tokenbuf);
                            break;
                        case 116 /* 't' */:
                            /* append */ (function (sb) { sb.str = sb.str.concat('\t'); return sb; })(this.tokenbuf);
                            break;
                        case 92 /* '\\' */:
                            /* append */ (function (sb) { sb.str = sb.str.concat('\\'); return sb; })(this.tokenbuf);
                            break;
                        case 34 /* '\"' */:
                            /* append */ (function (sb) { sb.str = sb.str.concat('\"'); return sb; })(this.tokenbuf);
                            break;
                        case 39 /* '\'' */:
                            /* append */ (function (sb) { sb.str = sb.str.concat('\''); return sb; })(this.tokenbuf);
                            break;
                    }
                else
                    (function (sb) { sb.str = sb.str.concat(String.fromCharCode(c)); return sb; })(this.tokenbuf);
            }
        }
        ;
        this.tokentype = Tokenizer.SString;
        this.tokenstring = this.tokenbuf.str;
        this.tokenbuf = { str: "", toString: function () { return this.str; } };
    };
    Tokenizer.prototype.isCharNum = function (i) {
        return (((i >= 48) && (i <= 57)) || ((i >= 65) && (i <= 90)) || ((i >= 97) && (i <= 122)) || (i == '_'.charCodeAt(0)));
    };
    Tokenizer.prototype.isChar = function (i) {
        return (((i >= 65) && (i <= 90)) || ((i >= 97) && (i <= 122)));
    };
    Tokenizer.prototype.isNum = function (i) {
        return ((i >= 48) && (i <= 57));
    };
    Tokenizer.prototype.readIden = function (__in) {
        var c;
        var t;
        for (t = 0; this.isCharNum(c = this.getkar(__in)); t++) {
            (function (sb) { sb.str = sb.str.concat(String.fromCharCode(c)); return sb; })(this.tokenbuf);
        }
        this.ungetkar(__in, c);
        this.tokentype = Tokenizer.Iden;
        this.tokenstring = this.tokenbuf.str;
    //    console.log('Iden ' +  this.tokenstring)
        this.tokenbuf = { str: "", toString: function () { return this.str; } };
    };
    Tokenizer.prototype.readNum = function (__in) {
        var res = 0;
        var c;
        while ((this.isNum(c = this.getkar(__in)))) {
            res = 10 * res + c - 48;
        }
        ;
        this.ungetkar(__in, c);
        this.tokenval = res;
    //    console.log('Num ' +  res)
        this.tokentype = Tokenizer.Num;
    };
    Tokenizer.prototype.gettoken = function () {
        var ch;
        this.skipspace(this["in"]);
        ch = this.getkar(this["in"]);
        while ((ch == '|'.charCodeAt(0))) {
            {
                if ((ch = this.getkar(this["in"])) == '|'.charCodeAt(0)) {
                    while (((ch = this.getkar(this["in"])) !== this.nlkar)) { }
                    ;
                    this.ungetkar(this["in"], ch);
                    this.gettoken();
                }
                else
                    this.ungetkar(this["in"], ch);
            }
        }
        ;
        if (ch === this.stop) {
            this.tokentype = Tokenizer.Eof;
            return false;
        }
        else if (ch == '('.charCodeAt(0)) {
            this.tokentype = Tokenizer.Lpar;
        }
        else if (ch == ')'.charCodeAt(0)) {
            this.tokentype = Tokenizer.Rpar;
        }
        else if (ch == '\\'.charCodeAt(0)) {
            this.tokentype = Tokenizer.BackSlash;
        }
        else if (ch == '='.charCodeAt(0)) {
            this.tokentype = Tokenizer.Eq;
        }
        else if (ch == '.'.charCodeAt(0)) {
            this.tokentype = Tokenizer.RightArrow;
        }
        else if (ch == '-'.charCodeAt(0)) {
            if ((ch = this.getkar(this["in"])) == '>'.charCodeAt(0))
                this.tokentype = Tokenizer.RightArrow;
            else {
                this.ungetkar(this["in"], ch);
                this.tokentype = Tokenizer.Minus;
            }
        }
        else if (this.isNum(ch)) {
            this.ungetkar(this["in"], ch);
            this.readNum(this["in"]);
        }
        else if (this.isChar(ch) || ch == '_'.charCodeAt(0) || this.isNum(ch)) {
            this.ungetkar(this["in"], ch);
            this.readIden(this["in"]);
        }
        else if (ch == '\''.charCodeAt(0)) {
            this.ungetkar(this["in"], ch);
            this.readChar(this["in"]);
        }
        else if (ch == '\"'.charCodeAt(0)) {
            this.ungetkar(this["in"], ch);
            this.readStringS(this["in"]);
        }
        else if (ch === this.nlkar) {
            if (this.skipspace(this["in"])) {
                this.gettoken();
            }
            else
                this.tokentype = Tokenizer.NewLine;
        }
        else if (ch === 13){
          this.gettoken();
        }
        else {
          console.log('unknown tok ' + ch);
          this.gettoken();
        }

        return true;
    };
    Tokenizer.prototype.perror = function (string) {
        throw Object.defineProperty(new Error("parse error: " + string + " at line : " + (this.line + 1) + " column:" + (this.indent + 1)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.Exception'] });
    };
    return Tokenizer;
}());
Tokenizer.RightArrow = 0;
Tokenizer.IdNum = 1;
Tokenizer.Lpar = 2;
Tokenizer.Rpar = 3;
Tokenizer.LSpar = 4;
Tokenizer.NewLine = 5;
Tokenizer.SString = 6;
Tokenizer.Char = 7;
Tokenizer.Iden = 8;
Tokenizer.Num = 9;
Tokenizer.Eq = 10;
Tokenizer.Dot = 11;
Tokenizer.BackSlash = 12;
Tokenizer.Minus = 13;
Tokenizer.Eof = 14;
Tokenizer["__class"] = "Tokenizer";
var Main = (function () {
    function Main() {
    }
    Main.main = function (args) {
        try {
            Main.doAction$java_lang_String$java_lang_String("Rundebug", Main.prog);
        }
        catch (ex) {
            Main.print("error: " + ex);
        }
        ;
    };
    Main.run$java_lang_String = function (prog) {
        try {
            Main.init(prog);
            while ((!Main.sim.step())) { }
            ;
            Main.stopped = true;
        }
        catch (ex) {
            Main.print("error: " + ex);
        }
        ;
    };
    Main.run = function (prog) {
        if (((typeof prog === 'string') || prog === null)) {
            return Main.run$java_lang_String(prog);
        }
        else if (prog === undefined) {
            return Main.run$();
        }
        else
            throw new Error('invalid overload');
    };
    Main.rundebug = function (prog) {
        try {
            Main.init(prog);
            while ((!Main.sim.step())) {
                {
                    Main.print("pc: " + Main.sim.getPC());
                    Main.print(Main.getStack() + "\n");
                }
            }
            ;
            Main.stopped = true;
        }
        catch (ex) {
            Main.print("error: " + ex);
        }
        ;
    };
    Main.init = function (prog) {
        try {
            if (!Main.initialized) {
                Main.sim = new Simulator(1000, 1000, 100);
                Main.initialized = true;
            }
            Main.sim.readProgramLabels(prog);
            Main.sim.init();
            Main.stopped = false;
        }
        catch (ex) {
            Main.print("error: " + ex);
        }
        ;
    };
    Main.run$ = function () {
        try {
            if (Main.initialized) {
                Main.sim.init();
                Main.sim.run();
                Main.stopped = true;
            }
        }
        catch (ex) {
            Main.print("error: " + ex);
        }
        ;
    };
    Main.step = function () {
        try {
            if (Main.initialized && !Main.stopped) {
                Main.stopped = Main.sim.step();
                //Main.print((Main.sim.getPC()+1) + ': ' + Main.getStack());
                Main.print(Main.getStack());
            }
        }
        catch (ex) {
            Main.print("error: " + ex);
        }
        ;
    };
    Main.reset = function () {
        if (Main.initialized) {
            Main.sim.init();
            Main.stopped = false;
        }
    };
    Main.printstack = function () {
        if (Main.initialized) {
            Main.sim.printStack();
        }
    };
    Main.getStack = function () {
        if (Main.initialized) {
            return Main.sim.getStack();
        }
        return "";
    };
    Main.print = function (s) {
        Printer.print(s);
    };
    Main.doAction$java_lang_String = function (action) {
        if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(action, "Reset"))
            Main.reset();
        else if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(action, "PrintStack"))
            Main.printstack();
        else if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(action, "Step"))
            Main.step();
        else if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(action, "Run"))
            Main.run();
        else if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(action, "step"))
            Main.step();
    };
    Main.doActionS = function (action) {
        if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(action, "GetStack"))
            return Main.getStack();
        return "";
    };
    Main.doAction$java_lang_String$java_lang_String = function (action, arg) {
        if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(action, "Run"))
            Main.run();
        else if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(action, "Init"))
            Main.init(arg);
        else if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(action, "Rundebug"))
            Main.rundebug(arg);
    };
    Main.doAction = function (action, arg) {
        if (((typeof action === 'string') || action === null) && ((typeof arg === 'string') || arg === null)) {
            return Main.doAction$java_lang_String$java_lang_String(action, arg);
        }
        else if (((typeof action === 'string') || action === null) && arg === undefined) {
            return Main.doAction$java_lang_String(action);
        }
        else
            throw new Error('invalid overload');
    };
    return Main;
}());
//Main.prog = "    bipush 6\n    call 1 0 33\n    print\n    stop\n 33 iload 0\n    dup\n    imult\n    ireturn\n";
/**
 * @param args the command line arguments
 */
Main.sim = null;
Main.initialized = false;
Main.stopped = false;
Main["__class"] = "Main";
var Printer = (function () {
    function Printer() {
    }
    Printer.print = function (s) {
        addOutput(s);
    };
    Printer.println = function (s) {
        addOutput(s);
    };
    return Printer;
}());
Printer["__class"] = "Printer";
//Main.main(null);

onmessage = function(e) {
  console.log('Worker: Message received from main script: ' + e.data);
  doAction(e.data);
}

function addOutput(res) {
  console.log('sending back to main: ' + res);
  postMessage(["append",res]);
}

function doAction(action) {
  if (action[0] == 'run') {
    console.log('doing run');
    Main.run(action[1]);
  }
  else if (action[0] == 'load') {
    Main.init(action[1]);
  }
  else if (action[0] == 'step') {
    Main.step();
    let pcval = Main.sim.getPC() + 1;
    postMessage(['pc',pcval])
  }
  else if (action[0] == 'reset') {
    Main.reset();
  }
}
