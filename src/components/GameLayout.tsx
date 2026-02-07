import React, { useState } from "react";
import { AppNavigation } from "./AppNavigation";
import { ProfileSection } from "./ProfileSection";
import { RankingSection } from "./RankingSection";
import { ShopSection } from "./ShopSection";
import { TeamsSection } from "./TeamsSection";
import { ChatSection } from "./ChatSection";
import { GameStats } from "./GameStats";

export const GameLayout = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "ranking":
        return <RankingSection />;
      case "teams":
        return <TeamsSection />;
      case "chat":
        return <ChatSection />;
      case "shop":
        return <ShopSection />;
      case "group_shop":
        return <ShopSection group />;
      case "gem_shop":
        return <ShopSection gem />;
      // case 'stats':
      //   return <GameStats />;
      default:
        return <ProfileSection />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "profile":
        return "МОЙ ПРОФИЛЬ";
      case "ranking":
        return "РЕЙТИНГ СОТРУДНИКОВ";
      case "teams":
        return "УПРАВЛЕНИЕ КОМАНДАМИ";
      case "chat":
        return "ОБЩИЙ ЧАТ";
      case "shop":
        return "МАГАЗИН НАГРАД";

      case "group_shop":
        return "МАГАЗИН НАГРАД";
      case "gem_shop":
        return "SECRET SHOP 💎";
      // case "stats":
      //   return "СТАТИСТИКА ИГРЫ";
      default:
        return "ПРОФИЛЬ";
    }
  };

  const getPageDescription = () => {
    switch (activeTab) {
      case "profile":
        return "ВАША ЛИЧНАЯ ИНФОРМАЦИЯ, ПРОГРЕСС И ДОСТИЖЕНИЯ";
      case "ranking":
        return "ТАБЛИЦА ЛИДЕРОВ И РЕЙТИНГ ВСЕХ УЧАСТНИКОВ";
      case "teams":
        return "СОЗДАНИЕ КОМАНД, ПРИГЛАШЕНИЕ УЧАСТНИКОВ И УПРАВЛЕНИЕ";
      case "chat":
        return "ОБЩЕНИЕ СО ВСЕМИ УЧАСТНИКАМИ ПЛАТФОРМЫ";
      case "shop":
        return "ПОТРАТЬТЕ ЗАРАБОТАННЫЕ БАЛЛЫ НА ПРИЯТНЫЕ БОНУСЫ";
      case "stats":
        return "ОБЩИЕ ПОКАЗАТЕЛИ И СТАТИСТИКА ОТДЕЛА";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex bg-transparent">
      {/* Sidebar Navigation */}
      <AppNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Page Header */}
        <div className="vice-card border-b-0 rounded-b-none p-8 mb-6 m-6 mt-6 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-cyan-500 to-purple-500"></div>
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full opacity-60 animate-float"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full opacity-40 animate-pulse"></div>

          <div className="relative text-center z-10">
            <h1 className="vice-title text-3xl lg:text-4xl text-transparent bg-clip-text vice-gradient mb-4 animate-pulse-neon">
              {getPageTitle()}
            </h1>
            <p className="vice-subtitle text-base lg:text-lg vice-text-accent">
              {getPageDescription()}
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-6 pb-6 overflow-auto">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};
