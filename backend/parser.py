import ast
import astpretty

class PythonParser:
    def __init__(self, code: str):
        self.code = code
        self.tree = None

    def parse_code(self):
        self.tree = ast.parse(self.code)
        return self.tree

    def print_ast(self):
        if self.tree is None:
            self.parse_code()
        astpretty.pprint(self.tree)

    def get_ast(self):
        if self.tree is None:
            self.parse_code()
        return self.tree
