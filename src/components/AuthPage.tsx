import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Users,
  Target,
  Crown,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedRole, setSelectedRole] = useState<
    "manager" | "closer" | "leader"
  >("manager");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log(selectedRole);
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: fullName,
              username: email.split("@")[0],
              role: selectedRole,
            },
          },
        });
        toast({
          variant: "default",
          title: "Письмо с подтверждением отправлено на почту",
        });
        console.log(data);
        if (error) throw error;
      }
    } catch (error: any) {
      setError(error.message || "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background with neon grid effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>

      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse"></div>
      <div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-lg animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Main auth card */}
      <div className="vice-card p-8 w-full max-w-md relative z-10 border-2 border-pink-500/30">
        {/* Decorative header line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-cyan-500 to-purple-500"></div>

        {/* Floating decorative elements */}
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full opacity-60 animate-float"></div>
        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full opacity-40 animate-pulse"></div>

        <div className="text-center mb-8 relative">
          {/* Icon with neon glow */}
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
            <div className="relative w-20 h-20 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full flex items-center justify-center border-2 border-cyan-400/50">
              <User className="text-white drop-shadow-lg" size={36} />
            </div>
          </div>

          {/* Title with neon effect */}
          <h1 className="vice-title text-3xl text-transparent bg-clip-text vice-gradient mb-3 animate-pulse-neon">
            🏆 SALES ARENA
          </h1>
          <h2 className="vice-subtitle text-xl text-transparent bg-clip-text vice-gradient-alt mb-4">
            ИГРА ОТДЕЛА ПРОДАЖ
          </h2>
          <p className="vice-text-accent text-lg">
            {isLogin ? "ВОЙДИТЕ В СВОЙ АККАУНТ" : "СОЗДАЙТЕ НОВЫЙ АККАУНТ"}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="vice-card border-red-500/50 bg-gradient-to-r from-red-900/20 to-red-800/20 p-4 mb-6 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-pink-500"></div>
            <p className="text-red-300 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-6">
          {/* Full name field for registration */}
          {!isLogin && (
            <div className="space-y-2">
              <label className="vice-subtitle text-sm text-cyan-300">
                ПОЛНОЕ ИМЯ
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border-2 border-slate-600/50 rounded-xl 
                           focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none
                           text-white placeholder-slate-400 vice-text backdrop-blur-sm
                           transition-all duration-300"
                  placeholder="Введите ваше имя"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          {/* Role selection for registration */}
          {!isLogin && (
            <div className="space-y-4">
              <label className="vice-subtitle text-sm text-cyan-300">
                ВЫБЕРИТЕ ВАШУ РОЛЬ
              </label>
              <div className="grid grid-cols-1 gap-3">
                {/* Manager option */}
                <div
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                    selectedRole === "manager"
                      ? "border-blue-500/70 bg-blue-500/10"
                      : "border-slate-600/50 hover:border-slate-500/70"
                  }`}
                  onClick={() => setSelectedRole("manager")}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedRole === "manager"
                          ? "bg-blue-500"
                          : "bg-slate-600"
                      }`}
                    >
                      <Users size={16} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">МЕНЕДЖЕР</h3>
                      <p className="text-slate-400 text-sm">
                        Работа с клиентами, залоги и сборы
                      </p>
                      <div className="flex gap-1 mt-1">
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                          Залог
                        </span>
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                          Почтовые сборы
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Closer option */}
                <div
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                    selectedRole === "closer"
                      ? "border-green-500/70 bg-green-500/10"
                      : "border-slate-600/50 hover:border-slate-500/70"
                  }`}
                  onClick={() => setSelectedRole("closer")}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedRole === "closer"
                          ? "bg-green-500"
                          : "bg-slate-600"
                      }`}
                    >
                      <Target size={16} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">ЗАКРЫВАЮЩИЙ</h3>
                      <p className="text-slate-400 text-sm">
                        Закрытие сделок и работа с командой
                      </p>
                      <div className="flex gap-1 mt-1">
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                          Залог
                        </span>
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                          Почта
                        </span>
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                          Этап
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                    selectedRole === "leader"
                      ? "border-yellow-500/70 bg-yellow-500/10"
                      : "border-slate-600/50 hover:border-slate-500/70"
                  }`}
                  onClick={() => setSelectedRole("leader")}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedRole === "leader"
                          ? "bg-yellow-500"
                          : "bg-slate-600"
                      }`}
                    >
                      <Crown size={16} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">ЛИДЕР</h3>
                      <p className="text-slate-400 text-sm">
                        Создание команд, верификация этапов
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Email field */}
          <div className="space-y-2">
            <label className="vice-subtitle text-sm text-cyan-300">EMAIL</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400">
                <Mail size={20} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border-2 border-slate-600/50 rounded-xl 
                         focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none
                         text-white placeholder-slate-400 vice-text backdrop-blur-sm
                         transition-all duration-300"
                placeholder="Введите ваш email"
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <label className="vice-subtitle text-sm text-cyan-300">
              ПАРОЛЬ
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-slate-800/50 border-2 border-slate-600/50 rounded-xl 
                         focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none
                         text-white placeholder-slate-400 vice-text backdrop-blur-sm
                         transition-all duration-300"
                placeholder="Введите пароль"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full vice-button h-14 text-lg font-bold relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10 flex items-center justify-center space-x-2">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>ЗАГРУЗКА...</span>
                </>
              ) : (
                <span>{isLogin ? "ВОЙТИ" : "ЗАРЕГИСТРИРОВАТЬСЯ"}</span>
              )}
            </span>
          </button>
        </form>

        {/* Toggle between login/register */}
        <div className="mt-8 text-center relative">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-6"></div>
          <p className="vice-text-secondary mb-3">
            {isLogin ? "НЕТ АККАУНТА?" : "УЖЕ ЕСТЬ АККАУНТ?"}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="vice-text-accent hover:text-white font-semibold text-lg uppercase tracking-wide
                     hover:drop-shadow-lg transition-all duration-300 relative group"
          >
            <span className="relative z-10">
              {isLogin ? "ЗАРЕГИСТРИРОВАТЬСЯ" : "ВОЙТИ"}
            </span>
            <div
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-cyan-500 
                          group-hover:w-full transition-all duration-300"
            ></div>
          </button>
        </div>
      </div>
    </div>
  );
};
