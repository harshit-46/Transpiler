export default function ActionButtons({ handleReset, handleConvert }) {
    return (
        <div className="mt-6 flex justify-center gap-6">
            <button
                onClick={handleReset}
                className="bg-gray-700 px-6 py-2 rounded hover:bg-gray-600"
            >
                Reset
            </button>
            <button
                onClick={handleConvert}
                className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200"
            >
                Convert
            </button>
        </div>
    );
}
