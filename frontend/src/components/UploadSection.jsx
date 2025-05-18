export default function UploadSection() {
    return (
        <div className="flex flex-col md:flex-row gap-4 bg-[#f3ece6] p-4">
            {/* Left Box: File Upload */}
            <div className="flex-1 border-2 border-dashed border-gray-400 rounded-md p-4 text-center cursor-pointer hover:border-gray-600 transition">
                <p className="text-gray-700">
                    <span className="font-semibold"> Click to select</span> or drop your input code file here.
                </p>
                <p className="text-gray-600 mt-1">You can also type the input code below.</p>
            </div>

            {/* Right Box: Optional Instructions */}
            <textarea
                className="flex-1 border border-gray-400 rounded-md p-4 resize-y text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={`Additional instructions (optional).\nExample - "Use async await instead of promises"`}
            />
        </div>
    );
}
