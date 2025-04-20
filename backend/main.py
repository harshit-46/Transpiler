from python_parser import PythonParser
from visitor import TranspilerVisitor
from input import code
from generator import CppCodeGenerator

parser = PythonParser(code)
ast_tree = parser.get_ast()

visitor = TranspilerVisitor()
visitor.visit(ast_tree)

generator = CppCodeGenerator(visitor.transpiler_tree)
output_code= generator.generate()

print("\n Generated C++ Code:\n")
print(output_code)
