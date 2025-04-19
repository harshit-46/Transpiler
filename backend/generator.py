class CppCodeGenerator:
    def __init__(self, ir_tree):
        self.ir_tree = ir_tree
        self.lines = []
        self.indent_level = 0

    def generate(self):
        self.lines.append('#include <iostream>')
        self.lines.append('using namespace std;\n')
        for node in self.ir_tree:
            self.handle_node(node)
        return '\n'.join(self.lines)

    def emit(self, line):
        indent = '    ' * self.indent_level
        self.lines.append(f"{indent}{line}")

    def handle_node(self, node):
        node_type = node["type"]
        method = getattr(self, f"gen_{node_type}", None)
        if method:
            method(node)
        else:
            self.emit(f"// Unhandled node type: {node_type}")


    def gen_assign(self, node):
        self.emit(f"auto {node['target']} = {node['value']};")

    def gen_print(self, node):
        args = " << ".join(map(str, node['args']))
        self.emit(f"cout << {args} << endl;")

    def gen_function_def(self, node):
        args = ", ".join(f"auto {arg}" for arg in node["args"])
        self.emit(f"void {node['name']}({args}) {{")
        self.indent_level += 1
        for stmt in node["body"]:
            self.handle_node(stmt)
        self.indent_level -= 1
        self.emit("}")

    def gen_class_def(self, node):
        self.emit(f"class {node['name']} {{")
        self.emit("public:")
        self.indent_level += 1
        for stmt in node["body"]:
            self.handle_node(stmt)
        self.indent_level -= 1
        self.emit("};")

    def gen_if(self, node):
        self.emit(f"if ({node['condition']}) {{")
        self.indent_level += 1
        for stmt in node["body"]:
            self.handle_node(stmt)
        self.indent_level -= 1
        self.emit("}")

        for elif_block in node.get("elif", []):
            self.emit(f"else if ({elif_block['condition']}) {{")
            self.indent_level += 1
            for stmt in elif_block["body"]:
                self.handle_node(stmt)
            self.indent_level -= 1
            self.emit("}")

        if node["else"]:
            self.emit("else {")
            self.indent_level += 1
            for stmt in node["else"]:
                self.handle_node(stmt)
            self.indent_level -= 1
            self.emit("}")

    def gen_for(self, node):
        self.emit(f"for (auto {node['target']} : {node['iter']}) {{")
        self.indent_level += 1
        for stmt in node["body"]:
            self.handle_node(stmt)
        self.indent_level -= 1
        self.emit("}")

    def gen_while(self, node):
        self.emit(f"while ({node['condition']}) {{")
        self.indent_level += 1
        for stmt in node["body"]:
            self.handle_node(stmt)
        self.indent_level -= 1
        self.emit("}")

    def gen_return(self, node):
        self.emit(f"return {node['value']};")

    def gen_pass(self, node):
        self.emit("// pass")

    def gen_continue(self, node):
        self.emit("continue;")

    def gen_break(self, node):
        self.emit("break;")

    def gen_import(self, node):
        self.emit(f"// import {node['module']}")

    def gen_import_from(self, node):
        self.emit(f"// from {node['module']} import {node['name']}")

    def gen_aug_assign(self, node):
        self.emit(f"{node['target']} {node['op']}= {node['value']};")
