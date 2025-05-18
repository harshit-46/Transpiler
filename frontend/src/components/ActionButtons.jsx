export default function ActionButtons({ handleReset, handleConvert }) {
    return (
        <div className="mt-6 flex justify-center gap-6">
            <button
                onClick={handleReset}
                className="bg-blue-600 text-black px-6 py-2 rounded hover:bg-blue-400 cursor-pointer"
            >
                Reset
            </button>
            <button
                onClick={handleConvert}
                className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 cursor-pointer"
            >
                Convert
            </button>
        </div>
    );
}
