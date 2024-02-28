import React, { useState, useEffect } from "react";
import Header from "./Header";
import AdminNavbar from "./adminNavbar";
import WorkSpace from "./work-spaces/WorkSpace";
import InsituateLogo from "./InsituateLogo";
import EmployIdGenerator from "./employee-id-generator/EmployIdGenerator";
import OrganizationSettings from "./organization-settings/OrganizationSettings";
import AskSupport from "./ask-support/AskSupport";
import HandleUserQuery from "./handle-user-query/HandleUserQuery";
import LLM_studio from './llm-studio/LLM_studio';
import ReleaseNotes from './ReleaseNotes/ReleaseNotes';

const Admin = () => {
  const [activeTab, setActiveTab] = useState("work-spaces");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const offset = 200;
      if (scrollPosition > offset) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full relative">
      <div className="w-full z-40 fixed">
        <Header isSticky={isSticky} />
      </div>
      <div className="pt-20">
        <InsituateLogo />
      </div>
      <div className="flex w-full">
        <div
          className={`w-1/5 pr-6 ${isSticky? "fixed top-20" : ""}`}
          id="adminNavbar"
        >
          <AdminNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="w-4/5 border-l ml-auto px-12 mt-8">
          {activeTab === "work-spaces" && <WorkSpace />}
          {activeTab === "employee-id-generator" && <EmployIdGenerator />}
          {activeTab === "organization-settings" && <OrganizationSettings />}
          {activeTab === "ask-support" && <AskSupport />}
          {activeTab === "handle-user-query" && <HandleUserQuery />}
          {activeTab === "llm-studio" && <LLM_studio />}
          {activeTab === "release-notes" && <ReleaseNotes />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
