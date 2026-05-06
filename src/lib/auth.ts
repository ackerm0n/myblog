'use client'

import { supabase } from './supabase'
import { useEffect, useState } from 'react'

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 获取当前用户
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }
    getUser()

    // 监听登录状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/admin`
      }
    })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const isAdmin = user?.user_metadata?.user_name === process.env.NEXT_PUBLIC_ADMIN_GITHUB_USERNAME ||
                  user?.user_metadata?.preferred_username === process.env.NEXT_PUBLIC_ADMIN_GITHUB_USERNAME

  return { user, loading, isAdmin, signInWithGitHub, signOut }
}
