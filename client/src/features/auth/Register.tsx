import React, { useState } from "react";
import { authClient } from "../../utils/auth.ts";

function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registered, setRegistered] = useState(false);

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await authClient.signUp.email(
            { email, password, name: email },
            {
                onError: (c) => {
                    alert(c.error.message);
                },
                onSuccess: () => {
                    setRegistered(true);
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 2000);
                }
            }
        );
    }

    if (!registered) {
        return (
            <form
                onSubmit={handleForm}
                className="flex flex-col space-y-8 mx-auto rounded border border-gray-300 p-4 w-128 shadow-xl"
            >
                <p className="text-3xl mx-auto">MyFinances</p>
                <span className="border border-gray-500" />
                <div className="flex flex-col space-y-8">
                    <label className="flex flex-col space-y-2">
                        <span className="text-lg">Enter email:</span>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2 rounded border border-b w-fit"
                            required
                        />
                    </label>
                    <label className="flex flex-col space-y-2">
                        <span className="text-lg">Enter a new password:</span>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-2 rounded border border-b w-fit"
                            required
                        />
                    </label>
                    <button
                        type="submit"
                        className="rounded p-2 bg-blue-300 cursor-pointer ml-6 mr-6 text-lg"
                    >
                        Register
                    </button>

                </div>
                <span className="border border-gray-500" />
                <div className="space-y-2">
                    <p>Already have an account? Login <a href="/login" className="underline text-blue-600">here</a></p>
                    <p>If you wish to read more about the page, you can do it <a href="/about" className="underline text-blue-600">here</a></p>
                </div>
            </form>
        )
    } else {
        return (
            <div className="flex items-center my-8">
                <p className="text-4xl">Registration successful! Redirecting...</p>
            </div>
        )
    }

}

export default Register;