import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();

const LoginForm = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Buscar el email asociado al username en Firestore
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", username));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert("Usuario no encontrado");
                return;
            }

            const userDoc = querySnapshot.docs[0];
            const email = userDoc.data().email;

            // Iniciar sesión con el email encontrado
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            alert("Inicio de sesión exitoso");
            navigate("/home");
        } catch (error) {
            if (error.code === "auth/wrong-password") {
                alert("Contraseña incorrecta");
            } else if (error.code === "auth/user-not-found") {
                alert("Usuario no encontrado");
            } else {
                alert("Error al iniciar sesión: " + error.message);
            }
            console.error("Error al iniciar sesión:", error.message);
        }
    };

    return (
        <div>
            <h1>Login Screen</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                <p>Crea una cuenta:</p>
                <button type="button" onClick={() => navigate("/register")}>
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default LoginForm;