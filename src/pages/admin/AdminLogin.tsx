import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../services/supabase';
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@markhor.pk');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error: authErr } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (authErr) {
          // If supabase credentials failed, also allow fallback demo login
          if (email === 'admin@markhor.pk' && password === 'admin123') {
            sessionStorage.setItem('markhor_admin_auth', 'true');
            onLoginSuccess();
            return;
          }
          throw authErr;
        }
        if (data.user) {
          sessionStorage.setItem('markhor_admin_auth', 'true');
          onLoginSuccess();
          return;
        }
      } else {
        // Fallback local admin authentication for demo and prototyping
        if ((email === 'admin@markhor.pk' || email.includes('admin')) && password.length >= 6) {
          sessionStorage.setItem('markhor_admin_auth', 'true');
          onLoginSuccess();
          return;
        } else {
          setError('Invalid credentials. Use demo: admin@markhor.pk / admin123');
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail('admin@markhor.pk');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center p-4">
      <div className="bg-[#17140F] border border-[#C9A66B]/30 rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#2A1B14] border border-[#C9A66B]/40 text-[#C9A66B] flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A66B] block">
            Executive Portal
          </span>
          <h2 className="font-playfair text-2xl font-bold text-[#F7F3EC]">
            Shoe Store Admin Access
          </h2>
          <p className="text-xs text-[#EDE6DA]/70">
            Sign in to manage inventory, customer orders, and shop settings.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-[#D1112B]/15 border border-[#D1112B]/40 rounded-xl text-xs text-[#D1112B] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#EDE6DA]">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@markhor.pk"
                className="w-full bg-[#0B0B0D] border border-[#C9A66B]/30 text-[#F7F3EC] rounded-xl px-4 py-3 pl-10 text-xs focus:outline-none focus:border-[#C9A66B]"
              />
              <Mail className="w-4 h-4 text-[#C9A66B] absolute left-3 top-3.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#EDE6DA]">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0B0B0D] border border-[#C9A66B]/30 text-[#F7F3EC] rounded-xl px-4 py-3 pl-10 text-xs focus:outline-none focus:border-[#C9A66B]"
              />
              <Lock className="w-4 h-4 text-[#C9A66B] absolute left-3 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#D1112B] hover:bg-[#A80D22] text-white py-3.5 px-4 rounded-xl font-bold text-xs tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <span>{isLoading ? 'Authenticating...' : 'Sign In to Admin Panel'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
          <div className="text-[11px] text-[#EDE6DA]/70 mb-1">
            Demo Credentials Pre-filled:
          </div>
          <button
            type="button"
            onClick={fillDemo}
            className="text-xs font-mono text-[#C9A66B] hover:underline"
          >
            admin@markhor.pk / admin123
          </button>
        </div>

      </div>
    </div>
  );
};
