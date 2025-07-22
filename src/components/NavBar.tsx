import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, LogOut, Menu, X, Settings } from 'lucide-react';
import styles from './NavBar.module.css';

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

const NavBar: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLogin(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    localStorage.removeItem('checkoutCart');
    setUser(null);
    setShowUserMenu(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    setShowUserMenu(false);
    navigate('/profile');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setShowUserMenu(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>MyShop</div>

        {/* Mobile menu button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ''}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? styles.active : ""}
              onClick={closeMenus}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) => isActive ? styles.active : ""}
              onClick={closeMenus}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) => isActive ? styles.active : ""}
              onClick={closeMenus}
            >
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) => isActive ? styles.active : ""}
              onClick={closeMenus}
            >
              Blog
            </NavLink>
          </li>
        </ul>

        <div className={styles.authSection}>
          {user ? (
            <div className={styles.userMenu}>
              <button
                className={styles.userButton}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {user.image ? (
                  <img 
                    src={user.image} 
                    alt={user.username}
                    className={styles.userAvatar}
                  />
                ) : (
                  <User size={20} />
                )}
                <span className={styles.userName}>
                  {user.firstName} {user.lastName}
                </span>
              </button>

              {showUserMenu && (
                <div className={styles.userDropdown}>
                  <div className={styles.userInfo}>
                    <p className={styles.userFullName}>
                      {user.firstName} {user.lastName}
                    </p>
                    <p className={styles.userUsername}>@{user.username}</p>
                  </div>
                  
                  <button className={styles.profileButton} onClick={handleProfileClick}>
                    <Settings size={16} />
                    Profile
                  </button>
                  
                  <button className={styles.logoutButton} onClick={handleLogout}>
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authButtons}>
              <NavLink
                to="/login"
                className={styles.loginButton}
                onClick={closeMenus}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={styles.registerButton}
                onClick={closeMenus}
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;