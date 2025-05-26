export default function ActionButtons({ handleReset, handleConvert, loading }) {
    return (
        <div className="mt-6 flex justify-center gap-6 pb-20">
            <button
                onClick={handleReset}
                className="bg-blue-500 text-black border border-black px-6 py-2 rounded hover:bg-blue-600 cursor-pointer"
            >
                Reset
            </button>
            <button
                onClick={handleConvert}
                disabled={loading}
                className={`px-6 py-2 border border-black rounded transition 
                    ${loading ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-white text-black hover:bg-gray-200 cursor-pointer"}`}
            >
                {loading ? "Converting..." : "Convert"}
            </button>
        </div>
    );
}
