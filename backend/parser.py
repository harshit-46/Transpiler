import ast
import astpretty
import tokenize
from io import StringIO

class PythonParser:
    def __init__(self, code: str):
        self.code = code
        self.tree = None
        self.comments = self.extract_comments()

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
    
    def extract_comments(self):
        comments = []
        tokens = tokenize.generate_tokens(StringIO(self.code).readline)
        for tok_type, tok_str, start, _, _ in tokens:
            if tok_type == tokenize.COMMENT:
                comments.append({
                    "text": tok_str.lstrip("# ").rstrip(),
                    "line": start[0]
                })
        return comments
