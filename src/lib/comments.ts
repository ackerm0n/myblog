'use client'

import { supabase } from './supabase'

interface CommentData {
  postId: string
  nickname: string
  email: string
  content: string
}

export async function submitComment(data: CommentData) {
  // 1. 插入评论到数据库
  const { error: insertError } = await supabase
    .from('comments')
    .insert({
      post_id: data.postId,
      nickname: data.nickname,
      email: data.email,
      content: data.content,
      status: 'pending',
    })

  if (insertError) {
    throw new Error('评论提交失败')
  }

  // 2. 发送邮件通知（通过 Resend）
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'TSY Blog <onboarding@resend.dev>',
        to: 'ackerm0n@users.noreply.github.com', // 你的邮箱
        subject: `[新评论] ${data.nickname} 评论了你的文章`,
        html: `
          <h2>新评论通知</h2>
          <p><strong>昵称：</strong>${data.nickname}</p>
          <p><strong>邮箱：</strong>${data.email}</p>
          <p><strong>内容：</strong></p>
          <blockquote>${data.content}</blockquote>
          <p><a href="https://myblog-apv.pages.dev/admin/comments">前往审核</a></p>
        `,
      }),
    })

    if (!response.ok) {
      console.error('邮件发送失败')
    }
  } catch (error) {
    console.error('邮件发送失败:', error)
  }
}

export async function getApprovedComments(postId: string) {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .eq('status', 'approved')
    .order('created_at', { ascending: true })

  if (error) {
    throw new Error('获取评论失败')
  }

  return data
}

export async function getAllComments() {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error('获取评论失败')
  }

  return data
}

export async function updateCommentStatus(id: string, status: 'approved' | 'rejected') {
  const { error } = await supabase
    .from('comments')
    .update({ status })
    .eq('id', id)

  if (error) {
    throw new Error('更新评论状态失败')
  }
}

export async function deleteComment(id: string) {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error('删除评论失败')
  }
}
