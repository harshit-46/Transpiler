import ast

class PythonToCppTranspiler(ast.NodeVisitor):
    def __init__(self):
        self.cpp_lines = []
        self.indent_level = 0

    def indent(self):
        return "    " * self.indent_level

    def transpile(self, code):
        tree = ast.parse(code)
        self.visit(tree)
        return '\n'.join(self.cpp_lines)

    def visit_Module(self, node):
        self.cpp_lines.append('#include <iostream>')
        self.cpp_lines.append('using namespace std;')
        self.cpp_lines.append('')
        self.visit_all(node.body)

    def visit_FunctionDef(self, node):
        if node.name == "main":
            self.cpp_lines.append(f'{self.indent()}int main() {{')
        else:
            self.cpp_lines.append(f'{self.indent()}void {node.name}() {{')

        self.indent_level += 1
        self.visit_all(node.body)
        self.indent_level -= 1
        
        # For non-main functions, don't add "return 0;"
        if node.name == "main":
            self.cpp_lines.append(f'{self.indent()}return 0;')  # before the closing brace

        self.cpp_lines.append(f'{self.indent()}}}')
        self.cpp_lines.append('')

    def visit_Expr(self, node):
        # Handle print statements
        if isinstance(node.value, ast.Call) and getattr(node.value.func, 'id', '') == 'print':
            args = ' << '.join([self.expr_to_str(arg) for arg in node.value.args])
            self.cpp_lines.append(f'{self.indent()}cout << {args} << endl;')
        else:
            self.cpp_lines.append(f'{self.indent()}{self.expr_to_str(node.value)};')

    def visit_Assign(self, node):
        target = node.targets[0].id
        value = self.expr_to_str(node.value)
        self.cpp_lines.append(f'{self.indent()}int {target} = {value};')  # assuming int for now

    def visit_Return(self, node):
        value = self.expr_to_str(node.value)
        self.cpp_lines.append(f'{self.indent()}return {value};')

    def visit_all(self, nodes):
        for n in nodes:
            self.visit(n)

    def expr_to_str(self, node):
        if isinstance(node, ast.Constant):
            return str(node.value)
        elif isinstance(node, ast.Name):
            return node.id
        elif isinstance(node, ast.BinOp):
            left = self.expr_to_str(node.left)
            right = self.expr_to_str(node.right)
            op = self.op_to_str(node.op)
            return f'({left} {op} {right})'
        elif isinstance(node, ast.Call):
            return f'{node.func.id}()'  # assumes no args for now
        return '/* unsupported expr */'

    def op_to_str(self, op):
        return {
            ast.Add: '+',
            ast.Sub: '-',
            ast.Mult: '*',
            ast.Div: '/',
        }.get(type(op), '?')

# ----------- Usage ------------

# 🔄 Replace the `if __name__ == "__main__"` part with this:
import sys

if __name__ == "__main__":
    python_code = sys.stdin.read()

    transpiler = PythonToCppTranspiler()
    cpp_code = transpiler.transpile(python_code)

    print(cpp_code)

