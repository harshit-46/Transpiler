import os
import ast
import json
from parser import PythonParser
from visitor import TranspilerVisitor
from input import code
from generator import CppCodeGenerator

parser = PythonParser(code)
ast_tree = parser.get_ast()

ast_output_path = os.path.join(os.path.dirname(__file__), "ast.txt")
with open(ast_output_path, "w") as ast_file:
    ast_text = ast.dump(ast_tree, indent=4)
    ast_file.write(ast_text)
    print(f"AST written to: {ast_output_path}")

visitor = TranspilerVisitor()
visitor.visit(ast_tree)
ir = visitor.transpiler_tree

ir_output_path = os.path.join(os.path.dirname(__file__), "ir.txt")
with open(ir_output_path, "w") as ir_file:
    for stmt in ir:
        ir_file.write(json.dumps(stmt, indent=4))
        ir_file.write("\n\n")
    print(f"Intermediate Representation written to: {ir_output_path}")

generator = CppCodeGenerator(ir)
output_code = generator.generate()

cpp_output_path = os.path.join(os.path.dirname(__file__), "output.cpp")
with open(cpp_output_path, "w") as f:
    f.write(output_code)
    print(f"C++ Code written to: {cpp_output_path}")
