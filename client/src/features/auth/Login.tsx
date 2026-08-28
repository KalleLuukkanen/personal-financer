import React, { useState } from "react";
import { authClient } from "../../utils/auth.ts";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await authClient.signIn.email(
            { email, password },
            {
                onError: (c) => {
                    alert(c.error.message);
                },
                onSuccess: () => {
                    window.location.reload();
                },
            }
        );
    }

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
                    <span className="text-lg">Enter password:</span>
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
                    Login
                </button>

            </div>
            <span className="border border-gray-500" />
            <p>Don't have an account yet? Register <a href="/register" className="underline text-blue-600">here</a></p>
        </form>
    )
}

export default Login;