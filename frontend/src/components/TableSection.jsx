import convert from "../assets/icons/convert.png";

export default function TableSection({ darkMode }) {
    return (
        <div className={`max-w-7xl mx-auto p-6 md:px-10 md:pb-10 rounded-2xl shadow-md space-y-10 ${darkMode ? "text-white bg-gray-800 border border-white" : "text-black bg-white border border-black"}`}>

            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
                <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">How to use this tool?</h2>
                    <p className={`text-base md:text-lg mb-3`}>
                        This free online converter lets you convert code from Python to C++ in a click of a button. To use this converter, take the following steps –
                    </p>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Type or paste your Python code in the input box.</li>
                        <li>Click the convert button.</li>
                        <li>The resulting C++ code from the conversion will be displayed in the output box.</li>
                    </ol>
                </div>
                <img
                    src={convert}
                    alt="Python to C++"
                    className="w-40 md:w-52"
                />
            </div>

            <div className="overflow-x-auto">
                <h2 className="text-2xl font-bold mb-4">Key differences between Python and C++</h2>
                <table className={`min-w-full text-left text-sm ${darkMode ? "border border-white" : "border border-gray-300"}`}>
                    <thead className={`${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}`}>
                        <tr>
                            <th className={`px-4 py-2 font-semibold ${darkMode ? "border border-white" : "border border-gray-300"}`}>Characteristic</th>
                            <th className={`px-4 py-2 font-semibold ${darkMode ? "border border-white" : "border border-gray-300"}`}>Python</th>
                            <th className={`px-4 py-2 font-semibold ${darkMode ? "border border-white" : "border border-gray-300"}`}>C++</th>
                        </tr>
                    </thead>
                    <tbody className={darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}>
                        {[
                            {
                                title: "Syntax",
                                python: "Python has a simple and easy-to-learn syntax that emphasizes readability and reduces the cost of program maintenance. It uses indentation to create blocks and does not require semicolons to end statements.",
                                cpp: "C++ has a complex syntax that can be difficult to learn and understand. It uses curly braces to create blocks and requires semicolons to end statements.",
                            },
                            {
                                title: "Paradigm",
                                python: "Python is a multi-paradigm language that supports procedural, object-oriented, and functional programming.",
                                cpp: "C++ is a multi-paradigm language that supports procedural, object-oriented, and generic programming.",
                            },
                            {
                                title: "Typing",
                                python: "Python is dynamically typed, which means that variable types are determined at runtime.",
                                cpp: "C++ is statically typed, which means that variable types are determined at compile time.",
                            },
                            {
                                title: "Performance",
                                python: "Python is an interpreted language and is generally slower than compiled languages like C++. However, it has a number of libraries and frameworks that can be used to optimize performance.",
                                cpp: "C++ is a compiled language and is generally faster than interpreted languages like Python. It also allows for low-level memory manipulation, which can further optimize performance.",
                            },
                            {
                                title: "Libraries and frameworks",
                                python: "Python has a large number of libraries and frameworks for a wide range of applications, including web development, scientific computing, and machine learning.",
                                cpp: "C++ has a smaller number of libraries and frameworks compared to Python, but it has a strong focus on performance and low-level system programming.",
                            },
                            {
                                title: "Community and support",
                                python: "Python has a large and active community of developers and users, which means that there is a lot of support available online and in person.",
                                cpp: "C++ also has a large community of developers and users, but it is generally more focused on specific industries and applications.",
                            },
                            {
                                title: "Learning curve",
                                python: "Python has a relatively low learning curve and is often recommended as a first programming language for beginners.",
                                cpp: "C++ has a steep learning curve and is generally not recommended as a first programming language for beginners.",
                            }
                        ].map((row, index) => (
                            <tr key={index}>
                                <td className={`px-4 py-3 font-medium leading-relaxed ${darkMode ? "border border-white" : "border border-gray-300"}`}>{row.title}</td>
                                <td className={`px-4 py-3 leading-relaxed ${darkMode ? "border border-white" : "border border-gray-300"}`}>{row.python}</td>
                                <td className={`px-4 py-3 leading-relaxed ${darkMode ? "border border-white" : "border border-gray-300"}`}>{row.cpp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}