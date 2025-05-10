import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

const avatars = [
    "/avatars/avatar1.jpg",
    "/avatars/avatar2.jpg",
    "/avatars/avatar3.jpg",
    "/avatars/avatar4.jpg",
];

const interestsOptions = ["arte", "ciencia", "juegos", "tecnología"];

const CompleteProfile = () => {
    const navigate = useNavigate();

    const uid = useSelector((state) => state.auth.uid);
    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
    const [description, setDescription] = useState("");
    const [interests, setInterests] = useState([]);

    const handleCheckboxChange = (interest) => {
        if (interests.includes(interest)) {
            setInterests(interests.filter((i) => i !== interest));
        } else {
            setInterests([...interests, interest]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, "users", uid), {
                avatar: selectedAvatar,
                description,
                interests,
                profileComplete: true,
            });
            alert("Perfil completado exitosamente");
            navigate("/home");
        } catch (error) {
            console.error("Error al completar el perfil:", error.message);
        }
    };

    return (
        <div>
            <h1>Complete Your Profile</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Avatar:</label>
                    <div style={{ display: "flex", gap: "10px" }}>
                        {avatars.map((avatar) => (
                            <img
                                key={avatar}
                                src={avatar}
                                alt="Avatar"
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    border: selectedAvatar === avatar ? "2px solid blue" : "1px solid gray",
                                    cursor: "pointer",
                                }}
                                onClick={() => setSelectedAvatar(avatar)}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Interests:</label>
                    <div>
                        {interestsOptions.map((option) => (
                            <label key={option} style={{ display: "block", marginBottom: "5px" }}>
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={interests.includes(option)}
                                    onChange={() => handleCheckboxChange(option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>
                <button type="submit">Push</button>
            </form>
        </div>
    );
};

export default CompleteProfile;