"""


import os
import ast
import json
from parser_1 import PythonParser
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

    
"""

import os
import ast
import json
import sys

from parser_1 import PythonParser
from visitor import TranspilerVisitor
with open("input.py", "r") as f:
    code = f.read()
from generator import CppCodeGenerator


def write_to_file(path, content, binary=False):
    mode = "wb" if binary else "w"
    with open(path, mode) as f:
        f.write(content)


def main():
    # Use fallback for environments where __file__ is not defined
    base_dir = os.path.dirname(os.path.abspath(__file__)) if "__file__" in globals() else os.getcwd()

    try:
        # Parse Python code into AST
        parser = PythonParser(code)
        ast_tree = parser.get_ast()

        ast_text = ast.dump(ast_tree, indent=4)
        ast_output_path = os.path.join(base_dir, "ast.txt")
        write_to_file(ast_output_path, ast_text)
        print(f"[OK]: AST written to: {ast_output_path}")

    except Exception as e:
        print(f"[ERROR]: Error during AST generation: {e}")
        return

    try:
        # Visit AST and build intermediate representation (IR)
        visitor = TranspilerVisitor()
        visitor.visit(ast_tree)
        ir = visitor.transpiler_tree

        ir_output_path = os.path.join(base_dir, "ir.txt")
        with open(ir_output_path, "w") as ir_file:
            for i, stmt in enumerate(ir):
                ir_file.write(f"Statement {i + 1}:\n")
                ir_file.write(json.dumps(stmt, indent=4))
                ir_file.write("\n\n" + "=" * 40 + "\n\n")
        print(f"[OK]: Intermediate Representation written to: {ir_output_path}")

    except Exception as e:
        print(f"[ERROR]: Error during IR generation: {e}")
        return

    try:
        # Generate C++ code from IR
        generator = CppCodeGenerator(ir)
        output_code = generator.generate()

        cpp_output_path = os.path.join(base_dir, "output.cpp")
        write_to_file(cpp_output_path, output_code)
        print(f"[OK]: C++ code written to: {cpp_output_path}")

    except Exception as e:
        print(f"[ERROR]: Error during C++ code generation: {e}")


if __name__ == "__main__":
    main()
