import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { UploadCloud } from "lucide-react";

export const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.error("Please select a file!");
            return;
        }

        const formData = new FormData();
        formData.append("myFile", file);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/upload",
                formData
            );

            toast.success(
                response.data.message || "File uploaded successfully!"
            );
            setFile(null);
        } catch (error) {
            console.log("File upload error:", error);
            toast.error(
                error.response?.data?.message || "Server error!"
            );
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">

            <div className="w-full max-w-xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10">

                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Upload File
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Securely upload your files with ease
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* File Input Box */}
                    <label
                        htmlFor="myFile"
                        className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-indigo-400 rounded-2xl cursor-pointer hover:bg-indigo-50 transition duration-300"
                    >
                        <UploadCloud className="w-12 h-12 text-indigo-600 mb-3" />
                        <span className="text-gray-600 font-medium">
                            Click to upload or drag & drop
                        </span>
                        <span className="text-sm text-gray-400 mt-1">
                            Supported formats: JPG, PNG, PDF, etc.
                        </span>

                        <input
                            type="file"
                            name="myFile"
                            id="myFile"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>

                    {/* Selected File Name */}
                    {file && (
                        <div className="text-center text-sm text-gray-700 bg-gray-100 py-2 px-4 rounded-lg">
                            Selected File: <span className="font-semibold">{file.name}</span>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300"
                    >
                        Upload Now
                    </button>

                </form>

            </div>
        </div>
    );
};
