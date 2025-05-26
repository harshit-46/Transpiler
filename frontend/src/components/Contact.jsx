import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact({ darkMode }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.message) {
            toast.error("Please fill out all fields.");
            return;
        }

        try {
            const res = await fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Message sent!");
                setForm({ name: "", email: "", message: "" });
            } else {
                toast.error(data.error || "Something went wrong.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Server error. Try again later.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-2 md:pt-12">
            <ToastContainer position="top-right" autoClose={3000} />

            <h1 className="text-Black text-4xl font-bold mb-12 text-center">
                Let's Work Together
            </h1>

            <div className={`p-10 rounded-2xl shadow-lg w-full max-w-lg ${darkMode ? "bg-gray-800" : "bg-[EEEEFE]"} border border-gray-400`}>
                <h2 className="text-white text-3xl font-bold text-center mb-8">
                    Get in Touch
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-white text-lg mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter Your Name"
                            className="w-full p-3 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-white text-lg mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter Your Email"
                            className="w-full p-3 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-white text-lg mb-1">
                            Message
                        </label>
                        <textarea
                            id="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Enter Your Message"
                            rows="4"
                            className="w-full p-3 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-red-500 text-white py-3 px-6 rounded-md w-full hover:bg-red-600 transition cursor-pointer"
                    >
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
};