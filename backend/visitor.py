import ast

class TranspilerVisitor(ast.NodeVisitor):
    def __init__(self):
        self.transpiler_tree = []
        self.declared_vars = set()
        
    def _infer_type(self, node):
        if isinstance(node, ast.Constant):
            if isinstance(node.value, int):
                return "int"
            elif isinstance(node.value, float):
                return "double"
            elif isinstance(node.value, str):
                return "string"
            elif isinstance(node.value, bool):
                return "bool"
        elif isinstance(node, ast.BinOp):
            left_type = self._infer_type(node.left)
            right_type = self._infer_type(node.right)
            if "double" in (left_type, right_type):
                return "double"
            elif "int" in (left_type, right_type):
                return "int"
        elif isinstance(node, ast.Call):
            if isinstance(node.func, ast.Name) and node.func.id == "str":
                return "string"
            elif node.func.id in ["to_string"]:
                return "string"
        elif isinstance(node, ast.Compare) or isinstance(node, ast.BoolOp):
            return "bool"
        elif isinstance(node, ast.IfExp):
            then_type = self._infer_type(node.body)
            else_type = self._infer_type(node.orelse)
            return then_type if then_type == else_type else "auto"

        return "auto"

    def visit_Assign(self, node):
        value = self._get_value(node.value)
        dtype = self._infer_type(node.value)

        for target in node.targets:
            if isinstance(target, ast.Name):
                target_name = target.id
            else:
                target_name = self._get_value(target)

            is_new = target_name not in self.declared_vars
            if is_new:
                self.declared_vars.add(target_name)
                if dtype == "auto":
                    dtype = "int"
            else:
                dtype = "" 

            self.transpiler_tree.append({
                "type": "assign",
                "target": target_name,
                "value": value,
                "datatype": dtype
            })


    def _get_op(self, op):
        return {
            ast.Add: '+',
            ast.Sub: '-',
            ast.Mult: '*',
            ast.Div: '/',
            ast.Mod: '%',
            ast.Pow: '**',
            ast.FloorDiv: '//',
            ast.BitOr: '|',
            ast.BitAnd: '&',
            ast.BitXor: '^',
            ast.LShift: '<<',
            ast.RShift: '>>'

        }.get(type(op), '?')

    def _get_cmp_op(self, op):
        return {
            ast.Eq: '==',
            ast.NotEq: '!=',
            ast.Lt: '<',
            ast.LtE: '<=',
            ast.Gt: '>',
            ast.GtE: '>=',
            ast.Is: 'is',
            ast.IsNot: 'is not',
            ast.In: 'in',
            ast.NotIn: 'not in',
        }.get(type(op), '?')

    def _get_unary_op(self, op):
        return {
            ast.UAdd: '+',
            ast.USub: '-',
            ast.Not: '!',
            ast.Invert: '~'
        }.get(type(op), '?')

    
    def visit_ClassDef(self, node):
        class_data = {
            "type": "class_def",
            "name": node.name,
            "bases": [self._get_value(b) for b in node.bases],
            "body": []
        }
        for stmt in node.body:
            self.visit(stmt)
            class_data["body"].append(self.transpiler_tree.pop())

        self.transpiler_tree.append(class_data)

    def visit_Expr(self, node):
        if isinstance(node.value, ast.Call) and isinstance(node.value.func, ast.Name):
            if node.value.func.id == 'print':
                args = [self._get_value(arg) for arg in node.value.args]
                self.transpiler_tree.append({
                    "type": "print",
                    "args": args
                })

    def visit_FunctionDef(self, node):
        func = {
            "type": "function_def",
            "name": node.name,
            "args": [arg.arg for arg in node.args.args],
            "body": []
        }

        for stmt in node.body:
            self.visit(stmt)
            if self.transpiler_tree:
                func["body"].append(self.transpiler_tree.pop())


        self.transpiler_tree.append(func)
    
    def visit_If(self, node):
        condition = self._get_value(node.test)
        if_block = []
        elif_blocks = []
        else_block = []

        for stmt in node.body:
            self.visit(stmt)
            if_block.append(self.transpiler_tree.pop())

        orelse = node.orelse
        while orelse and isinstance(orelse[0], ast.If):
            current = orelse[0]
            elif_condition = self._get_value(current.test)
            elif_body = []

            for stmt in current.body:
                self.visit(stmt)
                elif_body.append(self.transpiler_tree.pop())

            elif_blocks.append({
                "condition": elif_condition,
                "body": elif_body
            })

            orelse = current.orelse

        if orelse:
            for stmt in orelse:
                self.visit(stmt)
                else_block.append(self.transpiler_tree.pop())

        self.transpiler_tree.append({
            "type": "if",
            "condition": condition,
            "body": if_block,
            "elif": elif_blocks,
            "else": else_block
        })

    def visit_For(self, node):
        target = self._get_value(node.target)
        iter_obj = self._get_value(node.iter)
        body = []

        for stmt in node.body:
            self.visit(stmt)
            body.append(self.transpiler_tree.pop())

        self.transpiler_tree.append({
            "type": "for",
            "target": target,
            "iter": iter_obj,
            "body": body
        })

    def visit_While(self, node):
        condition = self._get_value(node.test)
        body = []

        for stmt in node.body:
            self.visit(stmt)
            body.append(self.transpiler_tree.pop())

        self.transpiler_tree.append({
            "type": "while",
            "condition": condition,
            "body": body
        })
    
    def visit_Return(self, node):
        value = self._get_value(node.value)
        self.transpiler_tree.append({
        "type": "return",
        "value": value
        })

    def visit_Import(self, node):
        for alias in node.names:
            self.transpiler_tree.append({
                "type": "import",
                "module": alias.name,
                "as": alias.asname
            })

    def visit_ImportFrom(self, node):
        for alias in node.names:
            self.transpiler_tree.append({
                "type": "import_from",
                "module": node.module,
                "name": alias.name,
                "as": alias.asname
            })

    def visit_BoolOp(self, node):
        op = self.get_bool_op(node.op)
        values = [self._get_value(v) for v in node.values]
        return f"({f' {op} '.join(values)})"

    def visit_AugAssign(self, node):
        target = self._get_value(node.target)
        value = self._get_value(node.value)
        op = self._get_op(node.op)
        self.transpiler_tree.append({
            "type": "aug_assign",
            "target": target,
            "op": op,
            "value": value
        })


    def get_bool_op(self, op):
        if isinstance(op, ast.And):
            return "&&"
        elif isinstance(op, ast.Or):
            return "||"
        return "unknown"


    def visit_UnaryOp(self, node):
        if isinstance(node.op, ast.Not):
            return f"(not {self.visit(node.operand)})"
        else:
            return f"({self.get_operator(node.op)}{self.visit(node.operand)})"

    def visit_Pass(self, node):
        self.transpiler_tree.append({"type": "pass"})

    def visit_Break(self, node):
        self.transpiler_tree.append({"type": "break"})

    def visit_Continue(self, node):
        self.transpiler_tree.append({"type": "continue"})

    def _get_value(self, val):
        if isinstance(val, ast.Constant):
            return val.value
    
        elif isinstance(val, ast.Name):
            return val.id

        elif isinstance(val, ast.BinOp):
            left = self._get_value(val.left)
            right = self._get_value(val.right)
            op = self._get_op(val.op)
            return f"({left} {op} {right})"
    
        elif isinstance(val, ast.Call):
            func_name = self._get_value(val.func)
            args = [self._get_value(arg) for arg in val.args]
            return f"{func_name}({', '.join(map(str, args))})"
    
        elif isinstance(val, ast.Compare):
            left = self._get_value(val.left)
            op = self._get_cmp_op(val.ops[0])
            right = self._get_value(val.comparators[0])
            return f"({left} {op} {right})"

        elif isinstance(val, ast.UnaryOp):
            operand = self._get_value(val.operand)
            op = self._get_unary_op(val.op)
            return f"({op} {operand})"

        elif isinstance(val, ast.BoolOp):
            op = self.get_bool_op(val.op)
            values = [self._get_value(v) for v in val.values]
            return f"({' {} '.format(op).join(values)})"

        elif isinstance(val, ast.Attribute):
            value = self._get_value(val.value)
            return f"{value}.{val.attr}"

        elif isinstance(val, ast.Subscript):
            value = self._get_value(val.value)
            index = self._get_value(val.slice)
            return f"{value}[{index}]"
    
        elif isinstance(val, ast.Index):
            return self._get_value(val.value)

        elif isinstance(val, ast.List):
            elements = [self._get_value(e) for e in val.elts]
            return f"[{', '.join(map(str, elements))}]"

        elif isinstance(val, ast.Tuple):
            elements = [self._get_value(e) for e in val.elts]
            return f"({', '.join(map(str, elements))})"
        
        elif isinstance(val, ast.IfExp):
            test = self._get_value(val.test)
            body = self._get_value(val.body)
            orelse = self._get_value(val.orelse)
            return f"({test} ? to_string({body}) : \"undefined\")"

        elif isinstance(val, ast.JoinedStr):
            parts = []
            for part in val.values:
                if isinstance(part, ast.FormattedValue):
                    parts.append(self._get_value(part.value))
                elif isinstance(part, ast.Constant):
                    parts.append(f'"{part.value}"')
            return " << ".join(parts)

        elif isinstance(val, ast.Dict):
            keys = [self._get_value(k) for k in val.keys]
            values = [self._get_value(v) for v in val.values]
            return f"{{{', '.join(f'{k}: {v}' for k, v in zip(keys, values))}}}"

        return "unknown"
