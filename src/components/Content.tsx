import {
    Authenticated,
    Unauthenticated,
    useQuery,
  } from "convex/react";
  import { api } from "./../../convex/_generated/api";
  import { SignInForm } from "../SignInForm";
  import Dashboard from "../Dashboard";
  import Services from "../Services";
  import Orders from "../Orders";
  import Deliveries from "../Deliveries";
  import Settings from "../Settings";
  import Reports from "../Reports";
  import { useState, useEffect } from "react";
  import { useNavigate, useLocation } from "react-router-dom";
  
  export default function Content() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const loggedInUser = useQuery(api.auth.loggedInUser);
    const navigate = useNavigate();
    const location = useLocation();
  
    // Set active tab based on URL path
    useEffect(() => {
      const path = location.pathname.split("/")[2]; // Extract tab name from URL
      if (path && ["dashboard", "services", "orders", "deliveries", "settings", "reports"].includes(path)) {
        setActiveTab(path);
      }
    }, [location]);
  
    if (loggedInUser === undefined) {
      return (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>
      );
    }
  
    const handleTabClick = (tab: string) => {
      setActiveTab(tab);
      navigate(`/content/${tab}`); // Change URL when tab is clicked
    };
  
    return (
      <div className="flex flex-col gap-6">
        <Authenticated>
          <nav className="flex flex-wrap gap-2 sm:gap-4 border-b pb-4">
            {["dashboard", "services", "orders", "deliveries", "settings", "reports"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`px-4 py-2 rounded-lg capitalize text-sm sm:text-base ${
                  activeTab === tab
                    ? "bg-indigo-500 text-white"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
          <div className="py-4">
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "services" && <Services />}
            {activeTab === "orders" && <Orders />}
            {activeTab === "deliveries" && <Deliveries />}
            {activeTab === "settings" && <Settings />}
            {activeTab === "reports" && <Reports />}
          </div>
        </Authenticated>
  
        <Unauthenticated>
          <div className="text-center px-4">
            <h1 className="text-4xl sm:text-5xl font-bold accent-text mb-4">
              Xivha Laundry World
            </h1>
            <p className="text-lg sm:text-xl text-slate-600">
              Sign in to get started
            </p>
          </div>
          <div className="px-4">
            <SignInForm />
          </div>
        </Unauthenticated>
      </div>
    );
  }
  