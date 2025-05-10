import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

const HomeScreen = () => {
    const uid = useSelector((state) => state.auth.uid);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (uid) {
            const userDocRef = doc(db, 'users', uid);

            const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    setUserData(docSnapshot.data());
                } else {
                    console.log('No such document!');
                }
            });

            return () => unsubscribe(); 
        }
    }, [uid]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("Sesión cerrada exitosamente");
            navigate("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error.message);
        }
    };

    return (
        <div>
            <h1>My dashboard</h1>
            {userData ? (
                <div>
                    <h2>Welcome, {userData.username}!</h2>
                    <p>Email: {userData.email}</p>
                    <p>Birthdate: {userData.birthdate}</p>
                    <div>
                        <img
                            src={userData.avatar || "/avatars/default.png"}
                            alt="Avatar"
                            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                        />
                    </div>
                    {userData.description && <p>Description: {userData.description}</p>}
                    {userData.interests && <p>Interests: {userData.interests.join(", ")}</p>}
                    {!userData.profileComplete && (
                        <button onClick={() => navigate("/complete-screen")}>
                            Complete Your Profile
                        </button>
                    )}
                    <button onClick={handleLogout} style={{ marginTop: "20px", backgroundColor: "red", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                        Logout
                    </button>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default HomeScreen;