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

"""

import os
import ast
import json
import argparse
import traceback

from parser_1 import PythonParser
from visitor import TranspilerVisitor
from generator import CppCodeGenerator

def write_to_file(path, content):
    with open(path, "w") as f:
        f.write(content)

def main():
    parser = argparse.ArgumentParser(description="Convert Python code to C++")
    parser.add_argument("input_file", nargs="?", default="input.py", help="Python input file")
    args = parser.parse_args()

    base_dir = os.path.dirname(os.path.abspath(__file__)) if "__file__" in globals() else os.getcwd()
    input_path = os.path.join(base_dir, args.input_file)

    try:
        with open(input_path, "r") as f:
            code = f.read()
    except Exception as e:
        print(f"[ERROR]: Failed to read input file: {e}")
        return

    try:
        parser = PythonParser(code)
        ast_tree = parser.get_ast()
        ast_text = ast.dump(ast_tree, indent=4)
        write_to_file(os.path.join(base_dir, "ast.txt"), ast_text)
        print("[OK]: AST written")
    except Exception as e:
        print(f"[ERROR]: Error during AST generation: {e}")
        traceback.print_exc()
        return

    try:
        visitor = TranspilerVisitor()
        visitor.visit(ast_tree)
        ir = visitor.transpiler_tree
        ir_output_path = os.path.join(base_dir, "ir.txt")
        with open(ir_output_path, "w") as ir_file:
            for i, stmt in enumerate(ir):
                ir_file.write(f"Statement {i + 1}:\n")
                ir_file.write(json.dumps(stmt, indent=4))
                ir_file.write("\n\n" + "=" * 40 + "\n\n")
        print("[OK]: IR written")
    except Exception as e:
        print(f"[ERROR]: Error during IR generation: {e}")
        traceback.print_exc()
        return

    try:
        generator = CppCodeGenerator(ir)
        output_code = generator.generate()
        write_to_file(os.path.join(base_dir, "output.cpp"), output_code)
        print("[OK]: C++ code written")
    except Exception as e:
        print(f"[ERROR]: Error during C++ code generation: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    main()
