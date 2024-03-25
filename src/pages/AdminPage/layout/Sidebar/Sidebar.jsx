import { useEffect, useState } from "react";
import { personsImgs } from "../../utils/images";
import { navigationLinks } from "../../data/data";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";

const Sidebar = () => {
  const [activeLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass("sidebar-change");
    } else {
      setSidebarClass("");
    }
  }, [isSidebarOpen]);

  return (
    <>
      <style>
        {`
.sidebar {
    background-color: var(--clr-primary);
    width: 260px;
    padding: 36px 20px;
    transition: var(--transition-default);
  }
  .user-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 16px;
  }
  .info-name {
    font-weight: 500;
  }
  .info-img {
    width: 48px;
    height: 48px;
    overflow: hidden;
    overflow: hidden;
    border-radius: 100%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .info-name {
    font-size: 20px;
    color: var(--clr-white);
    text-transform: uppercase;
  }
  .navigation {
    margin-top: 28px;
    height: 600px;
    overflow-y: scroll;
  
    &::-webkit-scrollbar {
      width: 4px;
    }
  
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 18px;
    }
  
    &::-webkit-scrollbar-thumb {
      background-color: var(--clr-pumpkin);
      border-radius: 18px;
    }
  }
  .sidebar-change {
    margin-left: -260px;
  }
  
  .nav-item {
    margin-bottom: 10px;
    margin-right: 4px;
  }
  .nav-link {
    display: block;
    height: 44px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: flex;
    padding: 6px 14px;
    column-gap: 12px;
    letter-spacing: 0.03em;
    border: 1px solid transparent;
    transition: var(--transition-default);
  }
  .nav-link:hover {
    border: 1px solid var(--clr-primar-light);
    background: var(--clr-pumpkin);
  }
  .nav-link.active {
    background-color: var(--clr-pumpkin);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
  .nav-link-icon {
    width: 22px;
  }
  .nav-link-text {
    text-transform: capitalize;
  }


  @media screen and (max-width: 1400px) {
    .sidebar {
      padding: 24px 16px;
    }
  }
  
  @media screen and (max-width: 1200px) {
    .sidebar {
      width: 72px;
      padding-left: 12px;
      padding-right: 12px;
    }
    .sidebar-change {
      margin-left: -72px;
    }
    .info-name {
      display: none;
    }
    .nav-item {
      display: flex;
      justify-content: center;
      margin-bottom: 18px;
    }
    .nav-link {
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
    }
    .nav-link.active {
      border-radius: 100%;
    }
    .nav-link:hover {
      border-radius: 100%;
    }
    .nav-link-text {
      display: none;
    }
  }

  @media screen and (max-width: 420px) {
    .sidebar {
      margin-left: -72px;
    }
    .sidebar-change {
      margin-left: 0px;
    }
  }`}
      </style>
      <div className={`sidebar ${sidebarClass}`}>
        <div className="user-info">
          <div className="info-img img-fit-cover">
            <img src={personsImgs.person_two} alt="profile image" />
          </div>
          <span className="info-name">alice-doe</span>
        </div>

        <nav className="navigation">
          <ul className="nav-list">
            {navigationLinks.map((navigationLink) => (
              <li className="nav-item" key={navigationLink.id}>
                <a
                  href="#"
                  className={`nav-link ${
                    navigationLink.id === activeLinkIdx ? "active" : null
                  }`}
                >
                  <img
                    src={navigationLink.image}
                    className="nav-link-icon"
                    alt={navigationLink.title}
                  />
                  <span className="nav-link-text">{navigationLink.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
