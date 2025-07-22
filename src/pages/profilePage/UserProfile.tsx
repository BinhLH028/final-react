import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Hash, Calendar, ArrowLeft } from 'lucide-react';
import styles from './UserProfile.module.css';

interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    gender: string;
    image?: string;
    accessToken: string;
    refreshToken: string;
}

const UserProfile: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [cartCount, setCartCount] = useState<number>(0);

    useEffect(() => {
        const storedCart = localStorage.getItem("checkoutCart");
        if (storedCart) {
            try {
                const cartItems = JSON.parse(storedCart);
                setCartCount(cartItems.length);
            } catch (err) {
                console.error("Invalid cart data:", err);
                setCartCount(0);
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            // If no user data, redirect to login
            navigate('/login');
        }
        setLoading(false);
    }, [navigate]);

    const handleBackClick = () => {
        navigate(-1); // Go back to previous page
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading profile...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className={styles.error}>
                <p>User not found. Please log in again.</p>
            </div>
        );
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
                <button className={styles.backButton} onClick={handleBackClick}>
                    <ArrowLeft size={20} />
                    Back
                </button>
                <h1>User Profile</h1>
            </div>

            <div className={styles.profileCard}>
                <div className={styles.profileImageSection}>
                    {user.image ? (
                        <img
                            src={user.image}
                            alt={`${user.firstName} ${user.lastName}`}
                            className={styles.profileImage}
                        />
                    ) : (
                        <div className={styles.defaultAvatar}>
                            <User size={60} />
                        </div>
                    )}
                    <h2 className={styles.fullName}>
                        {user.firstName} {user.lastName}
                    </h2>
                    <p className={styles.username}>@{user.username}</p>
                </div>

                <div className={styles.profileDetails}>
                    <h3>Personal Information</h3>

                    <div className={styles.detailItem}>
                        <div className={styles.detailLabel}>
                            <Hash size={16} />
                            User ID
                        </div>
                        <div className={styles.detailValue}>{user.id}</div>
                    </div>

                    <div className={styles.detailItem}>
                        <div className={styles.detailLabel}>
                            <User size={16} />
                            First Name
                        </div>
                        <div className={styles.detailValue}>{user.firstName}</div>
                    </div>

                    <div className={styles.detailItem}>
                        <div className={styles.detailLabel}>
                            <User size={16} />
                            Last Name
                        </div>
                        <div className={styles.detailValue}>{user.lastName}</div>
                    </div>

                    <div className={styles.detailItem}>
                        <div className={styles.detailLabel}>
                            <Mail size={16} />
                            Email
                        </div>
                        <div className={styles.detailValue}>{user.email}</div>
                    </div>

                    <div className={styles.detailItem}>
                        <div className={styles.detailLabel}>
                            <User size={16} />
                            Gender
                        </div>
                        <div className={styles.detailValue}>
                            {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                        </div>
                    </div>

                    <div className={styles.detailItem}>
                        <div className={styles.detailLabel}>
                            <User size={16} />
                            Username
                        </div>
                        <div className={styles.detailValue}>{user.username}</div>
                    </div>
                </div>

            </div>
            <div>
                🛒 Receipt: <strong>{cartCount}</strong>
            </div>
        </div>
    );
};

export default UserProfile;