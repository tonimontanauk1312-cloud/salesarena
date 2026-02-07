import React from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  Trophy,
  Users,
  MessageSquare,
  Store,
  BarChart3,
  LogOut,
  Gem,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface AppNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AppNavigation = ({
  activeTab,
  onTabChange,
}: AppNavigationProps) => {
  const { signOut } = useAuth();

  const navigationItems = [
    {
      id: "profile",
      label: "ПРОФИЛЬ",
      icon: User,
      description: "Личная информация",
    },
    {
      id: "ranking",
      label: "РЕЙТИНГ",
      icon: Trophy,
      description: "Таблица лидеров",
    },
    {
      id: "teams",
      label: "КОМАНДЫ",
      icon: Users,
      description: "Управление командами",
    },
    {
      id: "chat",
      label: "ЧАТ",
      icon: MessageSquare,
      description: "Общение с коллегами",
    },
    {
      id: "shop",
      label: "МАГАЗИН",
      icon: Store,
      description: "Потратить баллы",
    },
    {
      id: "group_shop",
      label: "МАГАЗИН КОМАНДЫ",
      icon: Store,
      description: "Потратить казну",
    },
    {
      id: 'gem_shop',
      label: 'SECRET SHOP 💎',
      icon: Gem,
      description: 'Потратить кристаллы'
    }
    // {
    //   id: 'stats',
    //   label: 'СТАТИСТИКА',
    //   icon: BarChart3,
    //   description: 'Общие показатели'
    // }
  ];

  return (
    <div className="w-80 vice-card h-full flex flex-col relative border-r-0 rounded-r-none">
      {/* Header */}
      <div className="p-8 border-b border-pink-500/20 relative">
        <div className="relative text-center">
          <h1 className="vice-title text-2xl lg:text-3xl text-transparent bg-clip-text vice-gradient animate-pulse-neon mb-3">
            SALES ARENA
          </h1>
          <p className="vice-subtitle text-sm vice-text-accent">
            МЕНЕДЖЕРЫ ПО ПРОДАЖАМ
          </p>
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6">
        <div className="space-y-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-4 p-4 rounded-xl text-left vice-interactive group relative overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-pink-500/50 shadow-lg"
                    : "border border-slate-500/30 hover:border-cyan-400/50 bg-slate-800/20 hover:bg-gradient-to-r hover:from-slate-600/20 hover:to-slate-500/20"
                }`}
              >
                {/* Neon glow effect */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 rounded-xl blur-sm"></div>
                )}

                <div
                  className={`p-3 rounded-lg relative z-10 ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500/30 to-cyan-500/30 border border-pink-400/50"
                      : "bg-slate-600/40 group-hover:bg-slate-500/60 border border-slate-500/50"
                  }`}
                >
                  <Icon
                    size={20}
                    className={
                      isActive
                        ? "text-white drop-shadow-lg"
                        : "text-cyan-400 group-hover:text-white"
                    }
                  />
                </div>

                <div className="flex-1 relative z-10">
                  <div
                    className={`vice-nav-text text-sm ${
                      isActive
                        ? "text-white neon-text"
                        : "text-slate-100 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </div>
                  <div
                    className={`vice-text-secondary text-xs ${
                      isActive
                        ? "text-cyan-200"
                        : "text-slate-400 group-hover:text-cyan-300"
                    }`}
                  >
                    {item.description}
                  </div>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="w-2 h-8 bg-gradient-to-b from-pink-500 to-cyan-500 rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-6 border-t border-pink-500/20">
        <Button
          onClick={signOut}
          className="w-full vice-button h-12 flex items-center justify-center space-x-3 text-sm font-semibold"
        >
          <LogOut size={18} />
          <span>ВЫЙТИ</span>
        </Button>
      </div>
    </div>
  );
};
