import React, { useEffect, useState } from "react";
import { auth, db } from "../../services/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const CardUser = ({ username }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (!username) {
                console.error("Username no proporcionado");
                return;
            }

            try {
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("username", "==", username));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data(); 
                    setUser(userData);
                } else {
                    console.error("El usuario no existe en Firestore");
                }
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };

        fetchUser();
    }, [username]);

    return (
        <div className="card-user">
            {user ? (
                <>
                    <h2>{user.username}</h2>
                    <p>Email: {user.email}</p>
                    <p>Birthday: {user.birthdate}</p>
                </>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default CardUser;